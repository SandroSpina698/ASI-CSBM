import {BASE_URL} from "../../types/CommonConstants.ts";

export const authenticate = (username: string, password: string) => {
    let body = {
        "username": username,
        "password": password
    };

    return fetch(`${BASE_URL}/auth`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

export const register = (username: string, password: string) => {
    let body = {
        "login": username,
        "pwd": password,
        "account": 0,
        "lastName": "Pulien",
        "surName": "Leplouc",
        "email": `${username}.lol@test.com`,
        "cardList": []
    }

    return fetch(`${BASE_URL}/user`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}