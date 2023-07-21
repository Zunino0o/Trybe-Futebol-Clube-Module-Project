import MatchesModel from "../models/MatchesModel";

export default class MatchesService {
    constructor(private matchesModel: MatchesModel = new MatchesModel()) {}
}