import {useAuthGuard} from "../auth/AuthGuard.ts";
import {Button, Form} from "react-bootstrap";
import './Dashboard.css';
import {useDispatch} from "react-redux";
import {useState} from "react";
import {generate} from "../../services/images/generateImages.service.ts";
import {getAllCardsInTheStock} from "../../services/cards/stock.ts";
import {Card} from "../../types/interfaces/Card";
import {UserCardsStates} from "../../types/enums/UserCardsStates.ts";
import {subscribeSSE} from "./sseservice.ts";

export default function Dashboard() {
    const [imagePrompt, setImagePrompt] = useState('');
    const [descriptionPrompt, setDescriptionPrompt] = useState('');
    const dispatch = useDispatch();

    const isAuth: string = sessionStorage.getItem("isConnected") === "true" ? "true" : "false";

    const userId = sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : "";

    function fetchAllCurentUserCards() {
        if (!userId) {
            console.warn("User ID is null or undefined. Cannot fetch cards.");
            return;
        }
        getAllCardsInTheStock(userId).then(result => setCardsInStore(result)).catch(error => {
            console.error("Failed to fetch cards:", error);
        });
        
    }

    function setCardsInStore(cards: Card[]) {
        dispatch({
            type: UserCardsStates.UPDATE_USER_CARDS,
            payload: cards
        })
    }

    function submit() {
        if (!imagePrompt || !imagePrompt.trim()) {
            alert("You have to fill the mandatory inputs.");
            return;
        }

        if (!descriptionPrompt || !descriptionPrompt.trim()) {
            alert("You have to fill the mandatory inputs.");
            return;
        }
        subscribeSSE(fetchAllCurentUserCards);
        if (!userId) {
            console.warn("User ID is null or undefined. Cannot fetch cards.");
            return;
        }
        generate(imagePrompt, descriptionPrompt, userId).then(r => console.log(r)).catch(error => {
            console.error("Failed to generate image:", error);
        });
;
    }

    useAuthGuard(isAuth);

    return (
        <div className="dashboard-container">
            <h3 className="title"> Generate your image ! </h3>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Image</Form.Label>
                    <Form.Control onChange={(e) => setImagePrompt(e.target.value)} as="textarea" placeholder="Your image prompt here" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e) => setDescriptionPrompt(e.target.value)} as="textarea" placeholder="Your description prompt here" />
                </Form.Group>
                <Button onClick={submit}>Generate!</Button>
            </Form>
        </div>
    )
}