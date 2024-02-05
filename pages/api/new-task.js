// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, description, username } =
      typeof req.body.data === "string"
        ? JSON.parse(req.body.data)
        : req.body.data;
    try {
      const task = await prisma.tasklist.create({
        data: { title: title, description: description, username: username },
      })
      console.log("Task is created successfully!", task);
      res.status(200).json({ task });
    } catch (error) {
      console.log("Task is not created!: ", error);
      res.status(500).json(error);
    }
  }
}
