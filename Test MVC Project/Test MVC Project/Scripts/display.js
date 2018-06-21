function objectToTableRow(student) {
    let pencil = $("<td></td>").append($("<span></span>").addClass("glyphicon glyphicon-pencil clickable").click(function () { editStudent(student); }));
    let name = $("<td></td>").html(student.Name);
    let number = $("<td></td>").html(student.Number);
    let trash = $("<td></td>").append($("<span></span>").addClass("glyphicon glyphicon-trash clickable").click(function () { editStudent(student); }));
    let id = $("<td></td>").html(student.Id).hide();

    return $("<tr></tr>").append(pencil).append(name).append(number).append(trash).append(id);
}

let currStudent;

function newStudent() {
    showCreate(true);
    showEdit(false);
}

function saveCreation() {
    let name;
    let number;

    if ($("#createName").val().length != 0) {
        name = $("#createName").val();
    } else {
        name = "";
    }

    if ($("#createNumber").val().length != 0) {
        number = $("#createNumber").val();
    } else {
        number = "";
    }

    $.ajax({
        type: 'POST',
        url: "/Student/Create",
        data: { name: name, number: number },
        success: function () {
            showCreate(false);
            getStudents();
        },
        error: function () {
            alert("Error, couldn't add new student.");
        }
    });
}

function editStudent(student) {
    currStudent = student;

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "/Student/Edit",
        data: { id: student.Id },
        success: function (result) {
            setEdit(result.student.Name, result.student.Number);

            showCreate(false);
            showEdit(true);

            getStudents();
        },
        error: function () {
            alert("Error, couldn't edit student.");
        }
    });
}

function getStudents() {
    $.ajax({
        type: "GET",
        url: "/Student/ListStudents",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#studentTable tr").remove();

            for (var i = 0; i < result.students.length; i++) {
                var row = objectToTableRow(result.students[i]);
                $("#studentTable").append(row);
            }
        },
        error: function (response) {
            alert("Couldn't get students.");
        }
    });
}

function deleteConfirmationStudent(student) {
    $.ajax({
        url: "/Student/Delete",
        type: 'POST',
        data: { id: student.Id },
        success: function () {
            showEdit(false);
            getStudents();
        },
        error: function () {
            alert("Error, couldn't delete students.");
        }
    });
}

function saveStudent(student) {
    let name;
    let number;

    if ($("#editName").val().length != 0) {
        name = $("#editName").val();
    } else {
        name = "";
    }

    if ($("#editNumber").val().length != 0) {
        number = $("#editNumber").val();
    } else {
        number = "";
    }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "/Student/Save",
        data: { id: student.Id, name: name, number: number },
        success: function () {
            showEdit(false);
            getStudents();
        },
        error: function () {
            alert("Error, couldn't save student.");
        }
    });
}

function showEdit(show) {
    if (show) {
        $("#editTable").show();
    } else {
        $("#editTable").hide();
        $("#deleteConfirmDiv").hide();
    }
}

function showCreate(show) {
    if (show) {
        $("#createTable").show();
        $("#deleteConfirmDiv").hide();
    } else {
        $("#createTable").hide();
    }
}

function setEdit(name, number) {
    $("#editName").val(name);
    $("#editNumber").val(number);
}

function setCreate(name, number) {
    $("#createName").val(name);
    $("#createNumber").val(number);
}

//Ready function.
$(function () {
    getStudents();

    $("#saveEdit").click(function () {
        saveStudent(currStudent);
    });

    $("#deleteEdit").click(function () {
        $("#deleteConfirmDiv").show();
    });

    $("#newStudentBtn").click(function () {
        newStudent();
    });

    $("#saveCreation").click(function () {
        saveCreation();
    });

    $("#deleteConfirmBtn").click(function () {
        deleteConfirmationStudent(currStudent);
    });
});