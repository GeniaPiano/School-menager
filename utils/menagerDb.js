const {readFile, writeFile} = require('fs').promises;
const {join} = require('path');
const {v4: uuid} = require('uuid');
const {StudentRecord, GroupRecord, TeacherRecord} = require("../record/records-templates");


class Db {
    constructor(dbFileGroups, dbFileTeachers, dbFileStudents) {
        this.dbFileGroups = join (__dirname, '../data', dbFileGroups);
        this.dbFileTeachers = join (__dirname, '../data', dbFileTeachers);
        this.dbFileStudents = join (__dirname, '../data', dbFileStudents)
        this._loadGroups();
        // this._loadTeachers();
        this._loadStudents();
    }

    async _loadGroups() {
        this._dataGroups = JSON.parse(await readFile(this.dbFileGroups, 'utf-8')).map(obj => new GroupRecord(obj));
    }
    // async _loadTeachers() {
    //     this._dataTeachers = JSON.parse(await readFile(this.dbFileTeachers, 'utf-8')).map(obj => new TeacherRecord(obj));
    // }
    async _loadStudents() {
        this._dataStudents = JSON.parse(await readFile(this.dbFileStudents, 'utf-8')).map(obj => new StudentRecord(obj));
    }

    _saveGroups() {
        writeFile(this.dbFileGroups, JSON.stringify(this._dataGroups), 'utf-8');
    }

    _saveStudents() {
        writeFile(this.dbFileStudents, JSON.stringify(this._dataStudents), 'utf-8');
    }




    createGroup(obj) {
        const id = uuid();
        this._dataGroups.unshift(new GroupRecord({
            id: id,
            ...obj,

        }));
        this._saveGroups();
        return id;
    }

    createStudent(obj, groupName, groupId) {
        const id = uuid();
        this._dataStudents.unshift(new StudentRecord({
            id: id,
            ...obj,
            groupName: groupName,
            groupId: groupId,
            }));
        this._saveStudents();
        return id;
    }

    getAllGroups() {
        return this._dataGroups;
    }

    getAllStudents() {
        return this._dataStudents;
    }

    getOneGroup(id) {
        return this._dataGroups.find(oneObj => oneObj.id === id);
    }

    getOneStudent(id) {
        return this._dataStudents.find(oneObj => oneObj.id === id);
    }

    getStudentsFromOneGroup(groupId) {
        return this._dataStudents.filter(oneObj => oneObj.groupId === groupId)
    }




    updateGroup(id, newObj) {
        this._dataGroups = this._dataGroups.map((oneObj) => {
            if (oneObj.id === id) {
                return new GroupRecord({
                    ...oneObj,
                    ...newObj,

                })
            } else {
                return oneObj
            }
        });
        this._saveGroups();
    }

    updateStudent(id, newObj) {
        this._dataStudents = this._dataStudents.map((oneObj) => {
            if (oneObj.id === id) {
                return new StudentRecord({
                    ...oneObj,
                    ...newObj,
                })
            } else {
                return oneObj
            }
        });
        this._saveStudents();

    }

    deleteGroup (id) {
        this._dataGroups = this._dataGroups.filter(oneObj => oneObj.id !== id);
        this._saveGroups();
    }

    deleteStudent (id) {
        this._dataStudents = this._dataStudents.filter(oneObj => oneObj.id !== id);
        this._saveStudents();
    }

}

const db = new Db('groups-data.json', 'teachers-data.json', 'students-data.json');
module.exports = {
    db,
}