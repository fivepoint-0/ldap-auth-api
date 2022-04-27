async function login(username, password) {
    let loginResponse = await fetch('/sessions', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    }).catch(error => { throw new Error(error) })

    let json = await loginResponse.json().catch(error => { throw new Error(error) })

    return json
}

async function getServers() {
    let getServersResponse = await fetch('http://localhost:4001/servers').catch(error => { throw new Error(error) })

    let json = await getServersResponse.json().catch(error => { throw new Error(error) })

    return json
}

async function getSessions() {
    let getSessionsResponse = await fetch('http://localhost:4001/sessions').catch(error => { throw new Error(error) })

    let json = await getSessionsResponse.json().catch(error => { throw new Error(error) })

    return json
}