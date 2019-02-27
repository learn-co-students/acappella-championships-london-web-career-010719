class ACappellaGroup {
  constructor(group){
    this.id = group.id
    this.name = group.name
    this.membership = group.membership
    this.college = group.college
  }

  createGroupEl(){
    let groupEl = document.createElement('tr')
    groupEl.innerHTML = `
      <td class='padding center'>${this.college.name}</td>
      <td class='padding center'>${this.name}</td>
      <td class='padding center'>${this.membership}</td>
      <td class='padding center'>${this.college.division}</td>
      <td class='padding center'><img src='./assets/trophy.png' data-id=${this.id}></td>
      <td class='padding center'><img src='./assets/delete.png' style="width:20px;height:20px;" id='deleteBtn' data-id=${this.id}></td>
    `
    return groupEl
  }
}


class ACappellaList{
  constructor(){
    this.groups = []
    this.champion = undefined
    this.tableEl = document.querySelector('tbody#table-body')
    this.winnerEl = document.querySelector('h2#winner')
    this.columnEls = this.createColumnEls()
  }

  createColumnEls(){
    const columnEls = document.querySelector('tr#columns')
    columnEls.addEventListener('click', this.sortByColumns.bind(this))
    return columnEls
  }

  sortByColumns(event){
    const column = event.target.innerText
    const keycode = this.interpretColumn(column)
    if (keycode==="can't sort this"){
      window.alert(keycode)
    }
    else {
      this.groups.sort(sortLogic)

      function sortLogic(a,b){
        const keycodeA = 'a'+keycode
        const keycodeB = 'b'+keycode
        const itemA = eval(keycodeA).toUpperCase()
        const itemB = eval(keycodeB).toUpperCase()
        if (itemA<itemB){
          return -1
        }
        if (itemA>itemB){
          return 1
        }
        return 0
      }
      this.renderList()
    }
  }

  interpretColumn(column){
    let keycode
    switch (column) {
      case 'College':
          keycode = '.college.name'
        break;
      case 'Group Name':
            keycode = '.name'
        break;
      case 'Membership':
          keycode = '.membership'
        break;
      case 'Division':
          keycode = '.college.division'
        break;
      default:
          keycode = "can't sort this"
    }
    return keycode
  }

  createList(groups){
    groups.forEach(group=>{
      const groupInstance = new ACappellaGroup(group)
      this.groups.push(groupInstance)
    })
  }

  renderList(){
    this.tableEl.innerHTML = ''
    let nonChamps
    if (!!this.champion) {
      this.announceWinner()
      nonChamps = this.groups.filter((group) => group.id !== this.champion.id)
    }
    else {
      nonChamps = this.groups
    }

    nonChamps.forEach((groupInstance)=>{
      const groupEl = groupInstance.createGroupEl()
      const championBtn = groupEl.querySelector('img')
      const deleteBtn = groupEl.querySelector('img#deleteBtn')
      championBtn.addEventListener('click', this.makeChamp.bind(this))
      deleteBtn.addEventListener('click', this.deleteGroup.bind(this))
      this.tableEl.appendChild(groupEl)
    })
  }

  makeChamp(event){
    const groupId = event.target.dataset.id
    this.assignChamp(groupId)
  }

  assignChamp(groupId){
    this.groups.forEach((group)=>{
      if (group.id == groupId) {
        this.champion = group
      }
    })
    this.renderList()
  }

  deleteGroup(event){
    const groupId = event.target.dataset.id
    this.groups = this.groups.filter((group) => group.id !== parseInt(groupId))
    this.renderList()
  }

  announceWinner(){
    this.winnerEl.innerText = `Winner: ${this.champion.name} from ${this.champion.college.name}`
  }



}
