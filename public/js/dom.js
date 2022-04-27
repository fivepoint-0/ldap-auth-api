function generateTableRowFromObject(obj) {
    let row = document.createElement('tr')
    for (let key of Object.keys(obj)) {
        let col = document.createElement('td')
        col.innerHTML = obj[key]
        row.append(col)
    }
    return row 
}

const dom = {
    getServers: async () => {
        let servers = await getServers()
        let serversTable = document.getElementById('serversTable').getElementsByTagName('tbody')[0]
        serversTable.innerHTML = ''
        servers.slice(-100).forEach(server => serversTable.append(generateTableRowFromObject(server)))
    },

    getSessions: async () => {
        let sessions = await getSessions()
        let sessionsTable = document.getElementById('sessionsTable').getElementsByTagName('tbody')[0]
        sessionsTable.innerHTML = ''
        sessions.slice(-100).forEach(session => sessionsTable.append(generateTableRowFromObject(session)))
        
    }
}