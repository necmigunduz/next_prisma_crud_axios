import prisma from "@/prisma/client";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        const { id } = req.query;
        const { title, description, username } = req.body;

        try {
            const updatedTask = await prisma.tasklist.update({
                where: {
                    id: Number(id),
                },
                data: {
                    title,
                    description,
                    username
                }
            });
            console.log("UPTASK", updatedTask);
            res.status(200).json({ updatedTask });
        } catch (error) {
            console.error("Error updating task:", error);
            res.status(500).json({ error: "Error updating task. Please try again later." });
        }
    }
}
