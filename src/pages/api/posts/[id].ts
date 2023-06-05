

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ;

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const headers = {
    Authorization: token
  }

  switch (req.method) {
    case 'GET':
      try {
        const { id } = req.query
        const response = await axios.get(`${BASE_URL}/posts/${id}`, { headers })
        const comments = await axios.get(`${BASE_URL}/posts/${id}/comments`)
        console.log('posts by id', response.data)
        // res.setHeader('Content-Range', response.data?.result?.meta.total)
        return res.status(200).json({id,post:response.data.result,comments:comments.data.result.data})
      } catch (err) {
        console.log(err)
        res.status(405).json({ message: 'Error' })
      }

    case 'PUT':
      // Handle PUT request
      // ...
      break
    case 'DELETE':
      const { id } = req.query
      const response = await axios.delete(`${BASE_URL}/posts/${id}`, { headers })
      return res.status(200).json('resource deleted successfully')
      
      
      // Handle POST request
      // ...
      break
    default:
      res.status(405).json({ message: 'Method Not Allowed' })
  }
}
