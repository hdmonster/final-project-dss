import prisma from "src/lib/prisma";

export default async function handle(req, res) {
  const { name, logoUrl } = req.body;

  const result = await prisma.club.create({
    data: {
      name,
      logoUrl,
    },
  });

  res.json({ message: `${name} saved`, data: result });
}
