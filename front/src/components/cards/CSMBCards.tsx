import {Button, Card} from "react-bootstrap";
import {Card as CardType} from "../../types/interfaces/Card"

export default function CSMBCards(props: CardType) {
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.imageUrl} />
                <Card.Body>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <h3>Value: {props.price}$</h3>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </>
    )
}