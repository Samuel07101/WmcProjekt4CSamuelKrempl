const URL = 'https://localhost:3000/'

async function login(user) {
    const response = await fetch(URL+'login', {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
    body: user
    });
    const bool = await response.json()
    return bool;
}
async function registration(user) {

    const response = await fetch(URL + 'login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if(response.ok){
        return true;
    }else{
        return false;
    }
}