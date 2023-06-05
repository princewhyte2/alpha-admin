

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { stringify } from "query-string"
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
          // shouldPaginate:'yes',
          ...req.query
        }
        const response = await axios.get(`${BASE_URL}/referrals/payments?${stringify(query)}`, { headers })
        console.log(' payments', response.data)
        const count =  response?.data?.result?.referral_payments.total
        res.setHeader('Content-Range',count)
        return res.status(200).json(response?.data?.result?.referral_payments?.data)
      } catch (err) {
        console.log(err)
        res.status(503).json({ message: 'Error' })
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
