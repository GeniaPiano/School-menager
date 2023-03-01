
const {db} = require("./menagerDb");




const createStudentWithoutGroup = (req, res) => {
    const objStudent =  {
        ...req.body,
        groupId: null,
        groupName: null,
    }
    const studentId = db.createStudent(objStudent, null, null);
    res.render('students/student-added-without-group', {
        studentId,
    })
}

const createStudentWithGroup = ( req, res, groupId) => {

    const groupName = db.getOneGroup(groupId).groupName;
    const objStudent = {
        ...req.body,
        groupId,
    }
    const studentId = db.createStudent(objStudent, groupName, groupId);
    res.render('students/student-added-with-group.hbs', {
        studentId,
    })

}

module.exports = {
    createStudentWithGroup, createStudentWithoutGroup,
}