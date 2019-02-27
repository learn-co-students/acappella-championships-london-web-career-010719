const URL = "http://localhost:3000/a_cappella_groups"
const acgList = new ACappellaList ()

fetch(URL)
  .then (res => res.json())
  .then (groups => acgList.createList(groups))
  .then (() => acgList.renderList())
