class Adapter {
    static getGroups() {
        return fetch("http://localhost:3000/a_cappella_groups")
        .then(res => res.json())
    }
}