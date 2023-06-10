

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

  // console.log('token',token)

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
        const response = await axios.get(`${BASE_URL}/referrals?${stringify(query)}`, { headers })
        console.log('referrals', response.data.result)
        res.setHeader('Content-Range', response.data?.result?.referrers.total)
        return res.status(200).json(response.data.result?.referrers.data)
      } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error' })
      }

    case 'PUT':
      // Handle PUT request
      // ...
      break
    case 'DELETE':
      // Handle POST request
      try {
        const parseFilter = JSON.parse( req.query.filter as string)
      // console.log('request',parseFilter.id)
      // return res.status(405).json({ message: 'Method Not Allowed' })
      const response = await axios.post(`${BASE_URL}/bulk/referrals/payments`, {
        referral_ids: parseFilter.id
      }, { headers })
        console.log('referrals', response.data.result)
        res.setHeader('Content-Range', response.data?.result?.referrers.total)
      } catch (error: any) {
        
        res.status(503).json({ message: 'Error occured' })
      }
      
      // ...
      break
    default:
      res.status(405).json({ message: 'Method Not Allowed' })
  }
}
