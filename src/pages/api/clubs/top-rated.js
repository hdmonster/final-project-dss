import prisma from "src/lib/prisma";

export default async function handle(res, req) {
  const data = await getClubs();
  res.json({ data });
}

export async function getClubs() {
  const clubs = await prisma.club.findMany({
    select: {
      id: true,
      name: true,
      logoUrl: true,
      home: {
        select: {
          id: true,
          winnerId: true,
          goals: {
            select: {
              id: true,
              scorer: {
                select: {
                  clubId: true,
                },
              },
            },
          },
        },
      },
      away: {
        select: {
          id: true,
          winnerId: true,
          goals: {
            select: {
              id: true,
              scorer: {
                select: {
                  clubId: true,
                },
              },
            },
          },
        },
      },
      winner: {
        select: {
          id: true,
        },
      },
    },
  });

  const clubsWithMatchCount = clubs.map((club) => {
    const totalMatches = club.home.length + club.away.length;
    const matchesWon = club.winner.length;
    const matchesLost = totalMatches - matchesWon;

    const totalGoalsScored =
      club.home.reduce((acc, match) => {
        const goalsByClub = match.goals.filter((goal) => goal.scorer.clubId === club.id);
        return acc + goalsByClub.length;
      }, 0) +
      club.away.reduce((acc, match) => {
        const goalsByClub = match.goals.filter((goal) => goal.scorer.clubId === club.id);
        return acc + goalsByClub.length;
      }, 0);

    return {
      id: club.id,
      name: club.name,
      logoUrl: club.logoUrl,
      matchesWon,
      matchesLost,
      totalGoalsScored,
    };
  });

  const sortedClubs = clubsWithMatchCount.sort((a, b) => b.matchesWon - a.matchesWon);

  return sortedClubs.slice(0, 5);
}
