// Drag&Drop

const tasks = document.querySelectorAll(".task");
const toDoList = document.querySelector(".todo-list");

tasks.forEach(task => {
	task.draggable = true;
	task.addEventListener("dragstart", onDragStart);
});

toDoList.addEventListener("drop", onDrop);
toDoList.addEventListener("dragover", onDragOver);

function onDragStart(e) {
    e.stopPropagation();
    const taskName = e.target.children[0].innerText;
    const taskDeadline = e.target.children[2].innerText;
    e.dataTransfer.setData("taskName", taskName);
    e.dataTransfer.setData("taskDeadline", taskDeadline);
}

function onDrop(e) {
	e.stopPropagation();
	e.preventDefault();
    const taskName = e.dataTransfer.getData('taskName');
    const taskDeadline = e.dataTransfer.getData('taskDeadline');
    const newTask = document.createElement('div');
    newTask.className = 'todo-list__task';
    newTask.innerHTML = `<div class="checkbox-container">
                            <label class="checkbox-label">
                                <input type="checkbox">
                                <span class="checkbox-custom"></span>
                            </label>
                        </div>
                        <div class="content-container">
                            <span class="todo-list__task-name">${taskName}</span>
                            <span class="todo-list__deadline">${taskDeadline}</span>
                        </div>
                        <div class="delete-button">x</div>`;
    toDoList.append(newTask);

    addClickEventToDeleteButtons();
}

function onDragOver(e) {
	e.preventDefault();
	e.stopPropagation();
}

// Delete task

addClickEventToDeleteButtons();

function addClickEventToDeleteButtons() {
    const deleteTaskButtons = document.querySelectorAll('.delete-button');
    deleteTaskButtons.forEach(button => {
        button.addEventListener('click', onDeleteBtnClick);
    });
    resetIdsForToDoListTasks();
}

function resetIdsForToDoListTasks() {
    const toDoListTasks = document.querySelectorAll('.todo-list__task');
    toDoListTasks.forEach((task, id) => {
        task.id = id;
    })
}

function onDeleteBtnClick(e) {
    const elementId = e.path[1].id;
    const element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    resetIdsForToDoListTasks()
}