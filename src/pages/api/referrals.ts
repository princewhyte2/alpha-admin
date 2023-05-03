

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

  console.log('token',token)

  const headers = {
    Authorization: token
  }

  switch (req.method) {
    case 'GET':
      try {
        const response = await axios.get(`${BASE_URL}/referrals`, { headers })
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
    case 'POST':
      // Handle POST request
      // ...
      break
    default:
      res.status(405).json({ message: 'Method Not Allowed' })
  }
}
