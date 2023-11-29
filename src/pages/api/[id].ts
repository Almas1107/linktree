import { NextApiRequest, NextApiResponse } from "next";
import { datas } from "@/data/data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  const { id } = req.query;
  switch (method) {
    case "GET":
      return res.json(datas[Number(id)]);
    default:
      return res.status(405).send({ message: "Unsupported request" });
  }
}
