import prisma from "@/prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { username, taskId } = req.query;
    console.log("Q", taskId);
    if (taskId) {
      try {
        const task = await prisma.tasklist.findUnique({
          where: {
            id: parseInt(taskId),
          },
        });
        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ task });
      } catch (error) {
        res.status(500).json(error);
      }
    } else if (username) {
      try {
        const list = await prisma.tasklist.findMany({
          where: {
            username: username,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        console.log("LIST", list);
        res.status(200).json({ list });
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(400).json({ message: "Either username or taskId must be provided" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
