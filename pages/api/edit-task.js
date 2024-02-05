import prisma from "@/prisma/client";

export default async function handler(req, res) {
    if(req.method === "PUT") {
        const { taskId, title, description } = JSON.parse(req.body);
        try {
            const updatedTask = await prisma.tasklist.update({
                where: {
                    id: taskId,
                },
                data: {
                    title,
                    description,
                }
            })
            res.status(200).json({ updatedTask })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}