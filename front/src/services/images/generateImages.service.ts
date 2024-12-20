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

export const generate = async (imagePrompt: string, descriptionPrompt: string, userId: string): Promise<number> => {
    let body = {
        user_id: userId,
        store_id: 1,
        promptImage: imagePrompt,
        promptDescription: descriptionPrompt
    };

// /api/job/{id}
    return fetch(`${BASE_URL}/card-generation/generate`, {
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