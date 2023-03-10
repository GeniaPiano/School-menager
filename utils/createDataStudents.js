
const {db} = require("./menagerDb");

const createStudentWithGroup = ( req, res, groupId) => {

    const groupName = db.getOneGroup(groupId).groupName;
    const objStudent = {
        ...req.body,
        groupId,
    }
    const studentId = db.createStudent(objStudent, groupName, groupId);
    res.render('students/student-added.hbs', {
        studentOne: db.getOneStudent(studentId),
        level: db.getOneGroup(groupId).level,
    })


}

module.exports = {
    createStudentWithGroup,
}