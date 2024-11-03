import {useAuthGuard} from "../auth/AuthGuard.ts";
import {Button, Form} from "react-bootstrap";
import './Dashboard.css';
import {useSelector} from "react-redux";
import {useState} from "react";
import {generate} from "../../services/images/generateImages.service.ts";

export default function Dashboard() {
    const [imagePrompt, setImagePrompt] = useState('');
    const [descriptionPrompt, setDescriptionPrompt] = useState('');

    const isAuth = useSelector(
        (state) => state.authenticationReducer.isAuth
    );

    const userId = useSelector(
        (state) => state.authenticationReducer.userId
    )

    function submit() {
        if (!imagePrompt || !imagePrompt.trim()) {
            alert("You have to fill the mandatory inputs.");
            return;
        }

        if (!descriptionPrompt || !descriptionPrompt.trim()) {
            alert("You have to fill the mandatory inputs.");
            return;
        }

        generate(imagePrompt, descriptionPrompt, userId).then(r => console.log(r));
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