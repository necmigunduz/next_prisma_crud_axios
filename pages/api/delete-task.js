import prisma from "@/prisma/client";

export default async function handler(req, res) {
  const { taskId } = req.body;
  console.log(req.body)
  if (req.method === "DELETE") {
    await prisma.tasklist
      .delete({
        where: {
          id: taskId,
        },
      })
      .then((res) => {
        res.status(200).json({ message: "deleted" });
      })
      .catch((error) => res.status(500).json(error));
    res.status(200).json({ message: "deleted" });
  }
}
