import {Card} from "../Card";
import {CardTypeEnum} from "../../enums/CardTypeEnum.ts";

export interface CardsProps {
    card: Card;
    type: CardTypeEnum
}