import { setAnalyticsData } from "@/lib/db-admin";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  setAnalyticsData(JSON.parse(data)).then(() => res.status(200).json({ message: 'OK' })).catch((error) => res.status(500).json({ error: error.message }));
}
