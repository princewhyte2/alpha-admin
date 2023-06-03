

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { stringify } from "query-string"
const BASE_URL = `https://backend-staging.workfynder.com/api`

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

         const query = {
           ...req.query,
           user_type: "employer",
        }
        // console.log("artisan query", req.query)
        const response = await axios.get(`${BASE_URL}/users?${stringify(query)}`, { headers })
        
        res.setHeader('Content-Range', response.data?.result?.meta.total)
        return res.status(200).json(response.data?.result?.data)
      } catch (err) {
        console.log(err)
        res.status(403).json({ message: 'Error' })
      }

    case 'PUT':
      // Handle PUT request
      // ...
      break
    case 'POST':
      // Handle POST request
      // ...
      break
    default:
      res.status(405).json({ message: 'Method Not Allowed' })
  }
}
