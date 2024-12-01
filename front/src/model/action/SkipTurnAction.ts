import PlayerAction from "./PlayerAction";
import PlayerActionType from "./PlayerActionType";

const TYPE : PlayerActionType = PlayerActionType.SKIP_TURN;

export class SkipTurnAction extends PlayerAction{
    constructor(gameId: string, userId: number) {
        super(TYPE, gameId, userId);
    }
}