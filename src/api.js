//==== API CAlls ====//
const BASEURL = 'http://localhost:3000'
const ACAPELLAURL = BASEURL + '/a_cappella_groups'

const getGroups = () => fetch(ACAPELLAURL).then(resp => resp.json())
const destroyGroup = group => fetch(`${ACAPELLAURL}/${group.id}`, {method: 'DELETE'}).then(resp => resp.json()) 