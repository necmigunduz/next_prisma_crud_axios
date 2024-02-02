// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/prisma/client";

export default function handler(req, res) {
  if(req.method === "POST") {
    const { title, description, username } = typeof req.body == "string" ? JSON.parse(req.body) : req.body;
    
    console.log(title, description, username)
  }
}
