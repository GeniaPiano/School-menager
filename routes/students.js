const express = require ('express');
const {db} = require('../utils/menagerDb');
const {createStudentWithoutGroup, createStudentWithGroup} = require("../utils/createDataStudents");

const studentsRouter = express.Router();

studentsRouter
    .get('/', (req, res) => {
            res.render('students/studentsAll', {
                students: db.getAllStudents(),
            })
    })

    .get('/add-student', (req, res) => {
        res.render('students/add-student', {
            groups: db.getAllGroups(),
        })
    })

    .post('/added', (req, res)=> {
        const groupId = req.body.groupId;
        req.body.groupId === undefined ? createStudentWithoutGroup( req, res) : createStudentWithGroup( req, res, groupId);

    })

    .put('/edit/:groupId/:studentId', (req, res )=>{
        const {groupId, studentId} = req.params;
        const objUpdated = {
            ...db.getOneStudent(studentId),
            groupId: null,
            groupName: null,
        }

        db.updateStudent(studentId, objUpdated);
        const {studentName, studentSurname} = db.getOneStudent(studentId);

        res.render('students/student-removed-from-group', {
            groupId,
            groupName: db.getOneGroup(groupId).groupName,
            studentId,
            studentName,
            studentSurname,
        });

        console.log(db.getOneStudent(studentId));
        console.log(db.getOneGroup(groupId));

}    )







module.exports = {
    studentsRouter,
}