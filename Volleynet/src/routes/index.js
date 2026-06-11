const URL = 'https://localhost:3000/'

async function login(user) {
    const response = await fetch(URL+'login', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
    });
   const data = response.json();

    if(data.ok){
        userSession.current = data.user;
        return true;
    }else{
        return false;
    }
}

async function registration(user) {
    const response = await fetch(URL+'registration', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
    });

    const data = response.json();

    if(data.ok){
        userSession.current = data.user;
        return true;
    }else{
        return false;
    }
}

async function editUser(user) {
    const response = await fetch(URL+'user', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)

    })
    const data = response.json();
    if(data.success){
        userSession.current = user;
        return true;
    }else{
        return false;
    }
}

async function buyLicence(licence) {
    const res = await fetch('/licence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user: { id: userSession.current.id },
            licence: { id: licence }
        })
    });

    if (!res.ok) {
        const { error } = await res.json();
        console.error('Fehler beim Kauf:', error);
        return;
    }

}

const User = () => {
    let user = null;
    return {
        get current() { return user; },
        set current(newUser) { user = newUser; }
    }
}

export const userSession = User();
