import { setAnalyticsData } from "@/lib/db-admin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  try {
    await setAnalyticsData(JSON.parse(data))
    return res.status(200).json({ message: 'OK' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
