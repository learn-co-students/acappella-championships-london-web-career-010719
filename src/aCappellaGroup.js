class ACappellaGroup {
    constructor({id, name, membership, college}) {
        this.id = id
        this.name = name
        this.membership = membership
        this.college = college
    }

    element() {
        const tr = document.createElement("tr")
        tr.dataset.id = this.id
        
        const college = document.createElement("td")
        college.innerText = `${this.college.name}`
        const name = document.createElement("td")
        name.innerText = `${this.name}`
        const membership = document.createElement("td")
        membership.innerText = `${this.membership}`
        const division = document.createElement("td")
        division.innerText = `${this.college.division}`
        const trophy = document.createElement("td")
        const trophyImg = document.createElement("img")
        trophyImg.src = "./assets/trophy.png"
        trophyImg.dataset.id = this.id
        trophy.append(trophyImg)
        trophyImg.addEventListener("click", (event) => {
            GroupController.setTheWinner(event, this)
        })
        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"
        deleteBtn.addEventListener("click", (e) => {GroupController.deleteGroup(e)})
        tr.append(college, name, membership, division, trophy, deleteBtn)

        return tr
    }
}

class GroupController {

    static init() {
        const deleteHead = document.createElement("th")
        deleteHead.innerText = "Delete Group"
        deleteHead.className = "padding center"

        const tHead = document.querySelector("thead tr")
        tHead.appendChild(deleteHead)
        const tHeadRow = document.querySelector("thead tr")
        tHeadRow.addEventListener("click", (e) => {GroupController.sortColumn(e)})
        Adapter.getGroups()
        .then(groups => GroupController.renderGroups(groups))
    }

    static createGroup(group) {
        const tableBody = document.querySelector("#table-body")
        const newGroup = new ACappellaGroup(group)
        groupsList.push(newGroup)
        tableBody.appendChild(newGroup.element())
    }

    static renderGroups(groups) {
        const tableBody = document.querySelector("#table-body")
        tableBody.innerHTML = ""
        groups.forEach(group => {
            GroupController.createGroup(group)
        })
    }

    static renderGroupsWithList(list) {
        const tableBody = document.querySelector("#table-body")
        tableBody.innerHTML = ""
        list.forEach(group => tableBody.appendChild(group.element()))
    }

    static setTheWinner(event, group) {
        const tableBody = document.querySelector("#table-body")
        const winnerH2 = document.querySelector("#winner")
        const groupTr = event.target.parentNode.parentNode
        tableBody.childNodes.forEach(tr => tr.style.display = "")
        winner = group
        winnerH2.innerText = `Winner: ${winner.college.name} ${winner.name}`
        groupTr.style.display = "none"      
    }

    static sortColumn(e) {
        const key = GroupController.getSortKeys(e)
        console.log(key)
        let sortedList = groupsList.sort(function(a, b) {
            const keyA = `a.${key}`
            const keyB = `b.${key}`
            debugger;
            let A = eval(keyA).toUpperCase();
            let B = eval(keyB).toUpperCase();
            if (A < B) {
              return -1;
            }
            if (A > B) {
              return 1;
            }
            return 0;    
            })
        GroupController.renderGroupsWithList(sortedList)
    }
    
    static getSortKeys(e) {
        const headText = e.target.innerText
        switch (headText) {
            case "College":
            return "college.name"
            case "Group Name":
            return "name"
            case "Membership":
            return "membership"
            case "Division":
            return "college.division"
        }
    }

    static deleteGroup(e) {
        const deleteRow = e.target.parentNode
        deleteRow.remove()
    }
}

