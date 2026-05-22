const URL = 'https://localhost:3000/'

async function login(user) {
    const response = await fetch(URL+'login', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: user
    });
    const bool = await response.json()
    return bool;
}

async function registration(user) {
    const response = await fetch(URL+'login', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: user
    });

    return OK;
}