import {AuthProps} from "../../types/interfaces/AuthProps";
import {useAuthGuard} from "../auth/AuthGuard.ts";
import {useSelector} from "react-redux";
import {Card} from "../../types/interfaces/Card";
import CSMBCards from "../../components/cards/CSMBCards.tsx";

export default function Stock() {
    const test: Card[] = [
        {price: 5, description: "Ceci est un test", imageUrl: "https://www.shutterstock.com/image-vector/purwokerto-may-4th-2023-bob-260nw-2297673859.jpg"},
        {price: 15, description: "Ceci est un test 2", imageUrl: "https://media.licdn.com/dms/image/v2/D4E10AQFMr0_4c2z9GQ/image-shrink_1280/image-shrink_1280/0/1711566092611?e=2147483647&v=beta&t=yTQkLDYIwUERNRZ6qYNtlth70twjaEAPgNf6zMDjGOQ"}
    ]

    const isAuth = useSelector(
        (state) => state.authenticationReducer.isAuth
    );

    useAuthGuard(isAuth);

    return (
        <>
            {
                test.map(e => <CSMBCards description={e.description} imageUrl={e.imageUrl} price={e.price}/>)
            }
        </>
    )
}