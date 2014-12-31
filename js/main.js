/**
 * Title: To Do List With HTML5 and JS
 * Autor: Gilberto Prado
 */

// Variaveis para elementos DOM

var lista = document.getElementById("tasks");
var erro = document.getElementById("error");
var btnClean = document.getElementById("clean");

totalTasks();

function showList(taskToAdd) {

    erro.innerHTML = "";

    var newTask = document.createElement('li');
    newTask.className = 'pendente';

    newTask.innerHTML = "<input type='checkbox' id='check-task' onclick='checkTask(this)'>" + "<span ondblclick='edit(this)' >" + taskToAdd + "</span>" + "<a class='close' onclick='deleteTask(this)'> X </button>";
    lista.appendChild(newTask);

    document.getElementById("inp-desc").value = '';

    btnClean.style.display = "block";

}

function checkTask(item) {

    if (item.parentNode.className == "pendente") {
        item.parentNode.className = "concluido";
    } else {
        item.parentNode.className = "pendente";
    }

    totalTasks();
}

function deleteTask(item) {

    var x = item.parentNode.querySelector('span');

    if (item.parentNode.className == "concluido") {
        item.parentNode.remove();
        totalTasks();
        erro.innerHTML = "";
    } else {
        erro.innerHTML = "A tarefa" + " " + "<b>'" + x.innerHTML + "</b>'" + " " + "não foi conluida!";
    }
}

function clean() {
    var doneTasks = document.querySelectorAll('.concluido');
    for (var i = 0; i < doneTasks.length; i++) {
        var doneTask = doneTasks[i];
        doneTask.parentElement.removeChild(doneTask);
    }
    totalTasks();
}

btnClean.onclick = clean;

function totalTasks() {

    var info = document.getElementById("info");
    var totalPend = 0;
    var totalConc = 0;

    for (var i = 0; i < lista.childNodes.length; i++) {

        if (lista.childNodes[i].className == "pendente") {
            totalPend++;
        }

        if (lista.childNodes[i].className == "concluido") {
            totalConc++;
        }
    }

    if (totalPend == 0 && totalConc == 0) {
        btnClean.style.display = "none";
    }

    if (totalPend < 2 && totalConc < 2) {
        info.innerHTML = "<p>" + totalPend + " " + "pendente," + " " + totalConc + " " + "concluida" + "<p>";

    } else if (totalPend >= 2 && totalConc < 2) {
        info.innerHTML = "<p>" + totalPend + " " + "pendentes," + " " + totalConc + " " + "concluida" + "<p>";

    } else {
        info.innerHTML = "<p>" + totalPend + " " + "pendente," + " " + totalConc + " " + "concluidas" + "<p>";
    }

}

document.getElementById("task-button").onclick = function() {

    var desc = document.getElementById("inp-desc").value;

    if (desc != "") {
        showList(desc);
        totalTasks();
        erro.innerHTML = "";
    } else {
        erro.innerHTML = "Por favor, insira uma tarefa!";
    }
};
