import prisma from "src/lib/prisma";
import * as nj from "jsnumpy";

const CRITERIONS = [
  {
    name: "goals",
    weight: 40,
    normalizedWeight: 0.25,
    attribute: "benefit",
  },
  {
    name: "assists",
    weight: 30,
    normalizedWeight: 0.1875,
    attribute: "benefit",
  },
  {
    name: "playtime",
    weight: 20,
    normalizedWeight: 0.125,
    attribute: "benefit",
  },
  {
    name: "matchesWon",
    weight: 35,
    normalizedWeight: 0.21875,
    attribute: "benefit",
  },
  {
    name: "clubMatchesWon",
    weight: 25,
    normalizedWeight: 0.15625,
    attribute: "benefit",
  },
  {
    name: "cards",
    weight: 10,
    normalizedWeight: 0.0625,
    attribute: "cost",
  },
];

export default async function handle(req, res) {
  const players = await getPlayers();
  const rankedPlayers = getRankedPlayers(players);

  res.json({ data: rankedPlayers });
}

export function getRankedPlayers(players) {
  const criterionValues = getCriterionValues(players);
  const utilsScore = getNormalizedUtilityValues(criterionValues);

  const playersData = players.map((player, i) => ({
    id: player.id,
    name: player.name,
    position: player.position,
    stats: `${player._count.goals}/${player._count.assists}/${player._count.cards}`,
    club: player.club.name,
    rating: (nj.sum(utilsScore[i]) * 2).toFixed(2),
  }));

  playersData.sort((a, b) => b.rating - a.rating);

  return playersData;
}

function getNormalizedUtilityValues(criterionValues) {
  let utilsScore = [];

  criterionValues.forEach((criterions, i) => {
    let score = [];
    criterions.forEach((criterion) => {
      let value;
      if (CRITERIONS[i].attribute == "benefit") {
        value =
          (criterion - nj.lowestElement(criterions)) /
          (nj.highestElement(criterions) - nj.lowestElement(criterions));
      } else {
        value =
          nj.lowestElement(criterions) /
          (nj.highestElement(criterions) - nj.lowestElement(criterions));
      }

      score.push(value * CRITERIONS[i].normalizedWeight);
    });

    utilsScore.push(score);
  });

  return nj.transpose(utilsScore);
}

function getCriterionValues(players) {
  let c1 = [];
  let c2 = [];
  let c3 = [];
  let c4 = [];
  let c5 = [];
  let c6 = [];

  players.forEach((player) => {
    c1.push(player._count.goals);
    c2.push(player._count.assists);
    c3.push(player.playtime);
    c4.push(player.matchesWon);
    c5.push(player.club._count.winner);
    c6.push(player._count.cards);
  });

  return [c1, c2, c3, c4, c5, c6];
}

export async function getPlayers() {
  const players = await prisma.player.findMany({
    include: {
      club: {
        select: {
          name: true,
          _count: {
            select: { winner: true },
          },
        },
      },
      _count: {
        select: {
          goals: true,
          cards: true,
          assists: true,
          startingElevenRecords: true,
        },
      },
      startingElevenRecords: {
        select: {
          match: {
            select: { winnerId: true },
          },
        },
      },
    },
  });

  players.forEach((player) => {
    const matchesWon = player.startingElevenRecords.filter(
      (record) => record.match.winnerId === player.clubId
    ).length;
    player.matchesWon = matchesWon;
  });

  players.forEach((player) => {
    const totalPlaytime = player._count.startingElevenRecords * 90;
    player.playtime = totalPlaytime;
  });

  const playersData = players.map((player) => {
    const { startingElevenRecords, ...rest } = player;
    return rest;
  });

  return playersData;
}
