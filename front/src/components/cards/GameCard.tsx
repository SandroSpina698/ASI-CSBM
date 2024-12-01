import {CardsProps} from "../../types/interfaces/props/CardsProps.ts";
import {Button, Card} from "react-bootstrap";
import {CardTypeEnum} from "../../types/enums/CardTypeEnum.ts";

interface GameCardProps extends CardsProps {
    onCardSelect: (cardId: number) => void;
}

export default function GameCard(props: GameCardProps) {
    const userId = sessionStorage.getItem("userId") ?sessionStorage.getItem("userId") : "None";

    function handleClick(){
        if (props.type === CardTypeEnum.GAME) {
            select()
        }
    }

    function select(){
        if(userId != null){
            props.onCardSelect(props.card.id);
        }
    }

    return (
        <>
            <Card id={props.card.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.card.imgUrl.replace("172.17.0.1","localhost")} />
                <Card.Body>
                    <Card.Text>
                        {props.card.description}
                    </Card.Text>
                    <Card.Text>
                        Attack: {props.card.attack} <br/>
                        Defense: {props.card.defence} <br/>
                        HP: {props.card.hp} <br/>
                        Energy: {props.card.energy}
                    </Card.Text>
                    <Button onClick={handleClick}>SELECT</Button>
                </Card.Body>
            </Card>
        </>
    )
}