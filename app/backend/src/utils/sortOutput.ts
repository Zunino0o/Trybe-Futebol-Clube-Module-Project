import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';

const sortOutput = (arr: ILeaderboard[]) => {
  const sortedArr = arr.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });
  return sortedArr;
};

export default sortOutput;
