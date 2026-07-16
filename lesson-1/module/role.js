
const employees = {
  "director": "Ivan",
  "manager": "Petro",
  "driver": "Oleh"
}
function showNames(role) {
    return `lol ${employees[role]}`
}

exports.showNames = showNames