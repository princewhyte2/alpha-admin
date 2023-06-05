

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { stringify } from "query-string";

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
        const query = {
          shouldPaginate:'yes',          
     ...req.query,
    }
        const response = await axios.get(`${BASE_URL}/skills?${stringify(query)}`, { headers })
        console.log('response', response.data)
        res.setHeader('Content-Range', response.data?.result?.skills.total)
        return res.status(200).json(response.data?.result?.skills.data)
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
       try {
         
        const response = await axios.post(`${BASE_URL}/skills`,  { name:req.body.name,occupation_id:req.body.occupation_id },{ headers })
        console.log('skill', response.data)
       
        return res.status(200).json(response.data.result.skill)
      } catch (err) {
        console.log(err)
        res.status(503).json({ message: 'Error' })
      }
      break
    default:
      res.status(405).json({ message: 'Method Not Allowed' })
  }
}
