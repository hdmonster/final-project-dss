export const getWinner = (score) => {
  let homeScore = parseInt(score.substring(0, score.indexOf("-")));
  let awayScore = parseInt(score.substring(score.indexOf("-") + 1));
  if (homeScore == awayScore) return "DRAW";

  return homeScore > awayScore ? "HOME" : "AWAY";
};
