import PlayerActionType from "./PlayerActionType";

class PlayerAction {
    private readonly _type: PlayerActionType;
    private readonly _gameId: string;
    private readonly _userId: number;

    constructor(type: PlayerActionType, gameId: string, userId: number) {
        this._type = type;
        this._gameId = gameId;
        this._userId = userId;
    }

    get type(): PlayerActionType {
        return this._type;
    }

    get gameId(): string {
        return this._gameId;
    }

    get userId(): number {
        return this._userId;
    }
}

export default PlayerAction;