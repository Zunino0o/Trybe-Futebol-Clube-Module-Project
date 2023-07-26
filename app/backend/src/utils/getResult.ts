const getResult = (homeTeamGoals: number, awayTeamGoals: number): 'victory' | 'draw' | 'defeat' => {
  if (homeTeamGoals > awayTeamGoals) {
    return 'victory';
  }
  if (homeTeamGoals === awayTeamGoals) {
    return 'draw';
  }
  return 'defeat';
};
export default getResult;
