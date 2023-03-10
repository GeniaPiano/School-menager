const express = require ('express');
const {db} = require('../utils/menagerDb');
const {createStudentWithGroup} = require("../utils/createDataStudents");
const {updateDataStudents} = require("../utils/updateDataStudents");
const {removeStudentFromGroup} = require("../utils/removeStudentFromGroup");

const studentsRouter = express.Router();

studentsRouter
    .get('/', (req, res) => {
            res.render('students/studentsAll', {
                students: db.getAllStudents(),
            })
    })

    .get('/add-student', (req, res) => {
        res.render('students/form/add-student', {
            groups: db.getAllGroups(),
        })
    })

    .post('/added', (req, res)=> {
        const groupId = req.body.groupId;
        createStudentWithGroup(req, res, groupId);

    })

    .get('/edit/:studentId', (req, res) => {

        const {studentId} = req.params
        res.render('students/form/edit-student', {
            studentOne: db.getOneStudent(studentId),
            groups: db.getAllGroups(),
        })
    })

    .put('/remove-from-group/:groupId/:studentId', (req, res )=>{
        removeStudentFromGroup(req, res);
}    )

    .put ('/edited/:studentId', (req, res) => {
        updateDataStudents(req, res)
    })

    .get('/one/:studentId', (req, res) => {
        const {studentId} = req.params;
        const {groupId} = db.getOneStudent(studentId);
        const {level} = db.getOneGroup(groupId);
        console.log(groupId)
        res.render('students/student-one', {
            studentOne: db.getOneStudent(studentId),
            level,
                   })

    })

    .delete('/delete/:studentId', (req, res) => {
        db.deleteStudent(req.params.studentId)
        res.render('students/student-deleted')

    })






module.exports = {
    studentsRouter,
}