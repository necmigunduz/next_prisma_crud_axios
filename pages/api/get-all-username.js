import prisma from "@/prisma/client";

export default async function handler(req, res) {
    if(req.method === "GET") {
        try {
            const usernames = await prisma.tasklist.findMany({
                select: {
                    username: true
                },
                distinct: ["username"]
            });
            res.status(200).json({ usernames: usernames.map(item => item.username) });
        } catch (error) {
            res.status(500).json(error)
        }
    }
}