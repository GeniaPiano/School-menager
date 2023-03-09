const {db} = require("./menagerDb");


const updateDataStudents = (req, res) => {


        const {studentId} = req.params;
        const {groupId} = req.body
        const {groupName} = db.getOneGroup(groupId);
        const newObj = {
            ...req.body,
            groupId,
            groupName,
        }
        db.updateStudent(studentId, newObj)
        res.render('students/student-edited', {
            studentOne: db.getOneStudent(studentId)
        })



}


module.exports = {
    updateDataStudents,
}