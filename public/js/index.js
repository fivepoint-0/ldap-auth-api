// Tab show/hide setup
let tabList = document.getElementById('tabList').children

for (let tab of tabList) {
    let anchor = tab.children[0]
    anchor.addEventListener('click', function(e) {
        let tabs = document.getElementsByClassName('tab')
        for (let tab of tabs) {
            if (tab.id !== `${e.target.classList.toString()}-tab`) {
                tab.classList.add('hidden')
            } else {
                tab.classList.remove('hidden')
            }
        }
    })
}

// Refresh action
let refreshButton = document.getElementById('refreshData')
refreshButton.addEventListener('click', function() {
    dom.getServers()
    dom.getSessions()
})
refreshButton.click()