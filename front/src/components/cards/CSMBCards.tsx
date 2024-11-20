import {Button, Card} from "react-bootstrap";
import {CardsProps} from "../../types/interfaces/props/CardsProps.ts";
import {CardTypeEnum} from "../../types/enums/CardTypeEnum.ts";
import "./CSMBCards.css"
import {buyACard, sellACard} from "../../services/cards/market.ts";

export default function CSMBCards(props: CardsProps) {
    const userId = sessionStorage.getItem("userId") ?sessionStorage.getItem("userId") : "None";

    function handleClick() {
        if (props.type === CardTypeEnum.MARKET) {
            return buy();
        }

        return sell();
    }

    function sell() {
        sellACard(userId, props.card).then(response => {
            console.log(response);
        });
    }

    function buy() {
        buyACard(userId, props.card).then(response => {
            console.log(response);
        });
    }

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.card.imgUrl.replace("172.17.0.1","localhost")} />
                <Card.Body>
                    <Card.Text>
                        {props.card.description}
                    </Card.Text>
                    <h3>Value: {props.card.price}$</h3>
                    <Button onClick={handleClick} className={props.type === CardTypeEnum.SHOWROOM ? 'invisible' : ''} variant='primary'>{props.type === CardTypeEnum.STOCK ? "SELL" : "BUY"}</Button>
                </Card.Body>
            </Card>
        </>
    )
}