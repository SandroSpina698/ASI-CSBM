import {Button, Card} from "react-bootstrap";
import {CardsProps} from "../../types/interfaces/props/CardsProps.ts";
import {CardTypeEnum} from "../../types/enums/CardTypeEnum.ts";
import "./CSMBCards.css"

export default function CSMBCards(props: CardsProps) {
    function handleClick() {
        if (props.type === CardTypeEnum.MARKET) {
            return buy();
        }

        return sell();
    }

    function sell() {
        console.log("Sell");
    }

    function buy() {
        console.log("Buy");
    }

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.card.imgUrl} />
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