import prisma from "src/lib/prisma";

export default async function handle(req, res) {
  const clubs = await prisma.club.findMany({
    include: {
      players: true,
    },
  });

  res.status(200).json(clubs);
}
