// in src/dataProvider.ts
import { fetchUtils } from "react-admin"
import { stringify } from "query-string"

// const apiUrl = "http://localhost:3000/api"
const apiUrl = "https://alpha-admin-kappa.vercel.app/api"

export const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" })
  }

  const token = localStorage.getItem("authToken")
  options.headers.set("Authorization", `Bearer ${token}`)
  return fetchUtils.fetchJson(url, options)
}

// TypeScript users must reference the type `DataProvider`
export const dataProvider = {
  getList: (resource: string, params: any) => {
    // const { page, perPage } = params.pagination
    // const { field, order } = params.sort
    // const query = {
    //   sort: JSON.stringify([field, order]),
    //   range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    //   filter: JSON.stringify(params.filter),
    // }
    const url = `${apiUrl}/${resource}`

    return httpClient(url)
      .then(({ headers, json }) =>
      {
        console.log('data',json)
        return {
          data: json,
        total: parseInt((headers.get("content-range") || "0").split("/").pop() || "0", 10),
      }}
      )
      // .catch((err) => console.log("fetch err", err))
  },

  getOne: (resource: string, params: any) => 
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
      
      return {
        data: json.result.data,
      }
    }),

  getMany: (resource: string, params: any) => {
   
    // const query = {
    //   filter: JSON.stringify({ id: params.ids }),
    // }
    const url = `${apiUrl}/${resource}`
    return httpClient(url).then(({ json }) => {
      console.log('2',json)
      return { data: json.result.data }
  })
  },

  getManyReference: (resource: string, params: any) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`

    return httpClient(url).then(({ headers, json }) =>
    {
      console.log('3',json)
        return{
      data: json.result.data,
      total: parseInt((headers.get("content-range") || "0").split("/").pop() || "0", 10),
    }
    }
  )
  },

  update: (resource: string, params: any) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: (resource: string, params: any) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }))
  },

  create: (resource: string, params: any) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource: string, params: any) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource: string, params: any) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json }))
  },
}
