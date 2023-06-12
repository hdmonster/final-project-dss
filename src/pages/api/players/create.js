import prisma from "src/lib/prisma";

export default async function handle(req, res) {
  const { clubId, name, position, jerseyNumber } = req.body;

  const result = await prisma.player.create({
    data: {
      clubId,
      name,
      position,
      jerseyNumber,
    },
  });

  res.json({ message: `${name} saved`, data: result });
}
