import { getAllAnalyticsData, getUsername } from "@/lib/db-admin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const from = req.body.from ?? 'all'
  const uid = req.query.uid as string
  const username = await getUsername(uid)

  if (!username) {
    return res.status(404).json({ error: 'User not found' })
  }
  console.log({ username })

  try {

    if (['all', 'last-week', 'last-month', 'last-year'].includes(from)) {
      const analyticsData = await getAllAnalyticsData(username, from)
      return res.status(200).json({ ...analyticsData })
    } else {
      res.status(400).json({ error: 'Invalid from parameter' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
