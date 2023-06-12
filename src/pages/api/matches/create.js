import prisma from "src/lib/prisma";

export default async function handle(req, res) {
  const { home, away } = req.body;

  // Handle starting eleven
  const players = home.startingEleven.concat(away.startingEleven);
  const startingEleven = players.map((player) => ({
    playerId: player.id,
    inTime: 0,
    outTime: 90,
  }));

  // Handle goals
  const allGoals = home.goals.concat(away.goals);
  const goals = allGoals.map((goal) => ({
    scorerId: goal.scorer.id,
    assisterId: goal.assister.id,
    time: goal.time,
  }));

  // Handle cards
  const allCards = home.cards.concat(away.cards);
  const cards = allCards.map((card) => ({
    receiverId: card.receiver.id,
    time: card.time,
  }));

  // Handle winner
  let homeScore = home.score;
  let awayScore = away.score;

  const score = `${homeScore}-${awayScore}`;
  const winnerId = homeScore == awayScore ? null : homeScore > awayScore ? home.id : away.id;

  // Handle match
  const match = await prisma.match.create({
    data: {
      homeId: home.id,
      awayId: away.id,
      winnerId,
      score,
      matchDuration: 90,
      date: new Date(),
      startingElevenRecords: {
        create: startingEleven,
      },
      goals: {
        create: goals,
      },
      cards: {
        create: cards,
      },
    },
  });

  res.json({ message: "success", data: match.id });
}
