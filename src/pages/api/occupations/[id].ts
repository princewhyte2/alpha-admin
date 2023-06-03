

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

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
         const { id } = req.query
        const response = await axios.get(`${BASE_URL}/occupations/${id}`, { headers })
        console.log('occupation', response.data)
       
        return res.status(200).json(response.data.result.occupation)
      } catch (err) {
        console.log(err)
        res.status(503).json({ message: 'Error' })
      }

    case 'PUT':
      // Handle PUT request
      // ...
        try {
         const { id } = req.query
         console.log("here is req body",req.body)
        const response = await axios.patch(`${BASE_URL}/occupations/${id}`, {industry_id:req.body.industry_id,name:req.body.name },{ headers })
        console.log('occupation', response.data)
       
        return res.status(200).json(response.data.result.occupation)
      } catch (err) {
        console.log(err)
        res.status(503).json({ message: 'Error' })
      }
      break
    case 'POST':
      // Handle POST request
      // ...
      
      break
    case 'DELETE':
      // Handle POST request
      // ...
      const { id } = req.query
        const response = await axios.delete(`${BASE_URL}/occupations/${id}`, { headers })
        console.log('occupation', response.data)
       
        return res.status(200).json('resource deleted')
      break
    default:
      res.status(405).json({ message: 'Method Not Allowed' })
  }
}
