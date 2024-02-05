import prisma from "@/prisma/client";

export default async function handler(req, res) {
    if(req.method === "GET") {
        const { username } = req.query;

        try {
            const list = await prisma.tasklist.findMany({
                where: {
                    username: username,
                },
                orderBy: {
                    createdAt: "desc",
                }
            });
            res.status(200).json({ list });
        } catch (error) {
            res.status(500).json(error)
        }
    }
}