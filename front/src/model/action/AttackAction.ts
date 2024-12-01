import PlayerAction from "./PlayerAction";
import PlayerActionType from "./PlayerActionType";
import {CardChoiceAction} from "./CardChoiceAction";

const TYPE : PlayerActionType = PlayerActionType.ATTACK;

export class AttackAction extends PlayerAction{
    private readonly _cardFrom: number;
    private readonly _cardTo: number;


    constructor(gameId: string, userId: number, cardFrom: number, cardTo: number) {
        super(TYPE, gameId, userId);
        this._cardFrom = cardFrom;
        this._cardTo = cardTo;
    }


    get cardFrom(): number {
        return this._cardFrom;
    }

    get cardTo(): number {
        return this._cardTo;
    }
}

export default CardChoiceAction;