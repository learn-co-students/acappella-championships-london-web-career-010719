//---- Global Variables and State ----//
const tableBodyEl = document.querySelector('#table-body')
let STATE_groups = []
let STATE_winningGroup = undefined

//---- Initialize Application ----//
document.addEventListener('DOMContentLoaded', () => {
    initialize()
})
const initialize = () => {
    getGroups().then(groups => {
        STATE_groups = groups
        drawGroups(STATE_groups)
    })
}

//---- Draw Functions ----//
// draw a single group row to the table
const drawGroup = group => {
    const groupRowEl = document.createElement('tr')
    groupRowEl.dataset.groupId = group.id
    groupRowEl.innerHTML = groupRowHTML(group)
    groupRowEl.querySelector('img').addEventListener('click', crownWinner(group))
    groupRowEl.querySelector('a').addEventListener('click', deleteGroup(group))
    tableBodyEl.prepend(groupRowEl)
}

// draw a collection of groups to the table
const drawGroups = groups => groups.forEach(drawGroup)

// build a single group rows innerHTML
const groupRowHTML = group => 
    `<td>${group.college.name}</td> 
    <td>${group.name}</td>
    <td>${group.membership}</td> 
    <td>${group.college.division}</td>
    <td><img src='./assets/trophy.png' data-id='${group.id}'/></td>
    <td><a href="" class="del-btn"> Delete </a></td>`

// deletes group from the server, state and removes from table
const deleteGroup = group => event => {
    event.preventDefault()
    destroyGroup(group).then(removeGroup(group))
}

// removes row from the table
const removeGroup = group => document.querySelector(`tr[data-group-id="${group.id}"]`).remove()

// adds winner to winner section, if there is an exising winner they are added back to the table
const addWinner = group => {
    if (STATE_winningGroup !== undefined){
        drawGroup(STATE_winningGroup)
    }
    document.querySelector('#winner').innerText = `Winner: ${group.name} (${group.college.name})`
    STATE_winningGroup = group
}

//---- Helper Functions ----//
const crownWinner = group => () => {
    removeGroup(group)
    addWinner(group)
}