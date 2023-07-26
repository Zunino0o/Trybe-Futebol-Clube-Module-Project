import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';

export default class TeamScores {
  private _totalVictories = 0;
  private _totalDraws = 0;
  private _totalLosses = 0;
  private _totalGames = 0;
  private _totalPoints = 0;
  private _goalsFavor = 0;
  private _goalsOwn = 0;
  private _goalsBalance = 0;
  private _efficiency = (this._totalPoints / (this._totalGames * 3)) * 100;

  constructor(private _name: string) {}

  public get name(): string {
    return this._name;
  }

  public get totalPoints(): number {
    return this._totalPoints;
  }

  private setTotalPoints() {
    this._totalPoints = this._totalDraws + (this._totalVictories * 3);
  }

  public get totalGames(): number {
    return this._totalGames;
  }

  public setTotalGames() {
    this._totalGames = this._totalDraws + this._totalVictories + this._totalLosses;
  }

  public get totalVictories(): number {
    return this._totalVictories;
  }

  public get totalDraws(): number {
    return this._totalDraws;
  }

  public get totalLosses(): number {
    return this._totalLosses;
  }

  public get goalsFavor(): number {
    return this._goalsFavor;
  }

  public get goalsOwn(): number {
    return this._goalsOwn;
  }

  public get goalsBalance(): number {
    return this._goalsBalance;
  }

  private setGoalsBalance() {
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
  }

  public get efficiency(): number {
    return this._efficiency;
  }

  public setEfficiency() {
    this._efficiency = Number(((this._totalPoints / (this._totalGames * 3)) * 100).toFixed(2));
  }

  private updateData() {
    this.setTotalPoints();
    this.setGoalsBalance();
    this.setTotalGames();
    this.setEfficiency();
  }

  public setResult(
    result: 'victory' | 'draw' | 'defeat',
    gp: number,
    gc: number,
  ): void {
    switch (result) {
      case 'victory':
        this._totalVictories += 1;
        break;
      case 'draw':
        this._totalDraws += 1;
        break;
      default:
        this._totalLosses += 1;
        break;
    }
    this._goalsFavor += gp;
    this._goalsOwn += gc;
    this.updateData();
  }

  public getData(): ILeaderboard {
    return {
      name: this._name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };
  }
}
