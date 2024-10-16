import {AuthProps} from "../../types/interfaces/AuthProps";
import {useAuthGuard} from "../auth/AuthGuard.ts";
import {Form} from "react-bootstrap";
import './Dashboard.css';
import {useSelector} from "react-redux";

export default function Dashboard() {
    const isAuth = useSelector(
        (state) => state.authenticationReducer.isAuth
    );

    useAuthGuard(isAuth);

    return (
        <div className="dashboard-container">
            <h3 className="title"> Generate your image ! </h3>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Image</Form.Label>
                    <Form.Control as="textarea" placeholder="Your image prompt here" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Your description prompt here" />
                </Form.Group>
            </Form>
        </div>
    )
}