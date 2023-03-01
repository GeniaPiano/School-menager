const express = require('express');
const {db} = require('../utils/menagerDb');
const schoolRouter = express.Router();

schoolRouter
    .get('/', (req, res) => {


        res.render('groups/groupsAll', {
                groups : db.getAllGroups(),
            })
    })

    .get('/add-new-group', (req, res) => {
            res.render('groups/form/add-new-group');
    })


    .post('/group-added', (req, res) => {
        const id = db.createGroup(req.body);
        res.redirect('/')
    })

    .get('/group/edit-group/:id', (req, res) => {
        res.render('groups/edit-group', {
            oneGroup: db.getOneGroup(req.params.id),
        })
    })

    .put('/group/group-edited/:id', (req, res) => {
        db.updateGroup(req.params.id, req.body);
        res.redirect(`/school/group/${req.params.id}`);
    })


    .delete('/:id', (req, res) => {
        db.deleteGroup(req.params.id);
        res.send('ok')
    })


    .get('/group/:id/add-student/', (req, res) => {
        res.render('groups/form/add-student-to-group', {
            oneGroup: db.getOneGroup(req.params.id),
        })
    })

    .post('/group/:id', (req, res) => {
        const {id, groupName} = db.getOneGroup(req.params.id);
        db.createStudent(req.body, groupName, id);
        res.redirect(`/school/group/${id}`);
    })

    .get('/group/:id', (req, res) => {
        const groupId = req.params.id;
        const students = db.getStudentsFromOneGroup(groupId);

        res.render('groups/groupOne', {
            oneGroup: db.getOneGroup(groupId),
            students,
                   })
    });




module.exports = {
        schoolRouter,
}

