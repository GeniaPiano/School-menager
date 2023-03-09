const {db} = require("./menagerDb");



const removeStudentFromGroup = (req, res) => {
    const {groupId, studentId} = req.params;
    const objUpdated = {
        ...db.getOneStudent(studentId),
        groupId: null,
        groupName: null,
    }
    db.updateStudent(studentId, objUpdated);
    res.render('students/student-removed-from-group', {
        groupId,
        groupName: db.getOneGroup(groupId).groupName,
        studentOne: db.getOneStudent(studentId),
    });
}


module.exports = {
    removeStudentFromGroup,
}