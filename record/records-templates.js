
class StudentRecord {
    constructor(obj) {
        const {id, name, surname, mail, groupName, groupId, level, notes} = obj;
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.mail = mail;
        this.groupName = groupName;
        this.groupId = groupId;
        this.level = level;
        this.notes = notes;

    }
}

class GroupRecord {
    constructor(obj) {
        const { id, groupName, level, teacherName} = obj;
        this.id = id;
        this.groupName = groupName;
        this.level = level;
        this.teacherName = teacherName;


    }
}

class TeacherRecord {
    constructor(obj) {
        const { name, surname, groupName} = obj;
        this.name = name;
        this.surname = surname;
        this.groupName = groupName;


    }
}

module.exports = {
    StudentRecord, GroupRecord, TeacherRecord,
}