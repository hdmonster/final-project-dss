import prisma from "src/lib/prisma";

export default async function handle(req, res) {
  const { id } = req.query;

  const data = await prisma.player.findMany({
    where: { clubId: id },
  });

  res.status(200).json(data);
}
