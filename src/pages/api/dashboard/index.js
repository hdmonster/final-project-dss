import { getClubs } from "../clubs/top-rated";
import { getPlayers, getRankedPlayers } from "../players/top-rated";

export default async function handle(req, res) {
  const topPerformingTeam = await getClubs();
  const players = await getPlayers();
  const topRatedPlayers = getRankedPlayers(players);

  const mostWin = {
    clubName: topPerformingTeam[0].name,
    matchesWon: topPerformingTeam[0].matchesWon,
  };

  const mostGoals = getTopPlayerByType(players, "goals");
  const mostAssists = getTopPlayerByType(players, "assists");
  const mostCards = getTopPlayerByType(players, "cards");

  const response = {
    cards: {
      mostWin,
      mostGoals,
      mostAssists,
      mostCards,
    },
    topPerformingTeam,
    topRatedPlayers,
  };

  res.json(response);
}

function getTopPlayerByType(players, type) {
  const player = players.sort((a, b) => b._count[type] - a._count[type])[0];
  return {
    name: player.name,
    total: player._count[type],
  };
}
