import PlayerAction from "./PlayerAction";
import PlayerActionType from "./PlayerActionType";

const TYPE : PlayerActionType = PlayerActionType.CARDS_CHOICE;

export class CardChoiceAction extends PlayerAction{
    private readonly _cardIds: number[];

    constructor(gameId: string, userId: number, cardIds: number[]) {
        super(TYPE, gameId, userId);
        this._cardIds = cardIds;
    }

    get cardIds(): number[] {
        return this._cardIds;
    }
}
