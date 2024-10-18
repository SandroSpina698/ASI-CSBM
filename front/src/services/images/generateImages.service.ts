// this is an example for now

// /card-generation/generate
/*
* {
*   "user_id": X,
*   "store_id": X,
*   "promptImage": "",
*   "promptDescription": ""
* }
* --> return numero de job
 */

import {BASE_URL} from "../../types/CommonConstants.ts";
import {useSelector} from "react-redux";

export const generate = async (imagePrompt: string, descriptionPrompt: string): Promise<number> => {
    const userId = useSelector(
        (state) => state.authenticationReducer.userId
    )

    let body = {
        user_id: userId,
        store_id: 1,
        promptImage: imagePrompt,
        promptDescription: descriptionPrompt
    };

    return fetch(`${BASE_URL}/store/cards_to_buy`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}