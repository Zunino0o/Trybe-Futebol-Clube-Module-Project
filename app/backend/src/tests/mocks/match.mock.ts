const allMatchesMock = [
  {
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 6,
    homeTeamId: 9,
    homeTeamGoals: 4,
    awayTeamId: 2,
    awayTeamGoals: 0,
    inProgress: true,
  },
];

const matchMock = {
  id: 1,
  homeTeamId: 1,
  homeTeamGoals: 1,
  awayTeamId: 2,
  awayTeamGoals: 1,
  inProgress: false,
};

const validCreateMatchMock = {
  homeTeamId: 1,
  awayTeamId: 2,
  homeTeamGoals: 1,
  awayTeamGoals: 2,
};

const invalidCreateMatchMock = {
    homeTeamId: 2,
    awayTeamId: 2,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
  };


const errorMessage = {
    message: 'It is not possible to create a match with two equal teams',
  };

export { allMatchesMock, matchMock, validCreateMatchMock, invalidCreateMatchMock, errorMessage };
