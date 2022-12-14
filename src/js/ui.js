import {getTaskTemplate, stringConstants} from "./constants.js";
import {addTaskToStorage, getTasksFromStorage, getTaskStorageLocation, removeTaskFromStorage} from "./localStorage.js";
import {generateID} from "./utils.js";

export const initialUISetup = () => {
    document.getElementById('search').addEventListener('mouseover', () => addClassWithTimeout('searchLabel', 'hovered', 500));
    document.getElementById('search').addEventListener('mouseout', () => removeClassWithTimeout('searchLabel', 'hovered', 500));
    document.getElementById('search').addEventListener('keyup', (event) => searchInputHandler(event));
    document.getElementById('addTaskInput').addEventListener('keyup', (event) => validateField(event));
    document.getElementById('addButton').addEventListener('click', addNewTask);
    restoreTasks('taskList', stringConstants.localStorageKey);
    restoreTasks('doneTaskList', stringConstants.localStorageDoneKey);
    radioHandlersSetup();
}

const addClassWithTimeout = (id, className, timeout) => {
    setTimeout(() => {
        document.getElementById(id).classList.add(className)
    }, timeout)
}

const removeClassWithTimeout = (id, className, timeout) => {
    setTimeout(() => {
        document.getElementById(id).classList.remove(className)
    }, timeout)
}

const addClassWithoutTimeout = (id, className) => {
    document.getElementById(id).classList.add(className)
}

const removeClassWithoutTimeout = (id, className) => {
    document.getElementById(id).classList.remove(className)
}

const validateField = (event) => {
    if (event.target.value.length > 0) {
        enableAddTaskButton();
    } else {
        disableAddTaskButton();
    }
    if (event.key === 'Enter' || event.keyCode === 13) {
        addNewTask();
    }
}

const disableAddTaskButton = () => {
    const button = document.getElementById('addButton')
    removeClassWithoutTimeout('addButton', 'valid');
    button.setAttribute('disabled', '');
}

const enableAddTaskButton = () => {
    const button = document.getElementById('addButton')
    addClassWithoutTimeout('addButton', 'valid');
    button.removeAttribute('disabled');
}

export const addNewTask = () => {
    const inputElement = document.getElementById('addTaskInput');
    const taskWrapper = document.createElement('div');
    const id = generateID(10);
    taskWrapper.innerHTML = getTaskTemplate(inputElement.value, id).trim();
    document.getElementById('taskList').append(taskWrapper.firstChild);
    addTaskToStorage({id: id, value: inputElement.value}, stringConstants.localStorageKey);
    inputElement.value = '';
    disableAddTaskButton();
    document.getElementById(id).addEventListener('click', (event) => onRadioClick(event));
}

export const changeTaskStatus = (id) => {
    const taskElement = document.getElementById(id);
    const storageKey = getTaskStorageLocation(id);
    console.log(id);
    taskElement.remove();
    if (storageKey === stringConstants.localStorageKey) {
        document.getElementById('doneTaskList').append(taskElement);
    } else {
        document.getElementById('taskList').append(taskElement);
    }
    removeTaskFromStorage(id, storageKey);
}

export const restoreTasks = (element, key) => {
    const taskList = getTasksFromStorage(key);
    const taskListTemplates = taskList.map((task) => getTaskTemplate(task.value, task.id).trim());
    const documentFragment = document.createDocumentFragment();
    const taskWrapper = document.createElement('div');
    for (const task of taskListTemplates) {
        taskWrapper.innerHTML = task;
        documentFragment.append(taskWrapper.firstChild);
    }
    document.getElementById(element).append(documentFragment);
}

const onRadioClick = (event) => {
    const taskElement = event.target.closest('.task.plainTask');
    if (taskElement) {
        changeTaskStatus(taskElement.getAttribute('id'));
    }
}

const radioHandlersSetup = () => {
    const radioButtons = document.getElementsByClassName('radio');
    for (const radio of radioButtons) {
        radio.removeEventListener('click', (event) => onRadioClick(event));
        radio.addEventListener('click', (event) => onRadioClick(event));
    }
}

const searchInputHandler = (event) => {
    if (event.target.value.length > 0) {
        filterTasks(event.target.value);
    } else {
        clearFiltration();
    }
}

const filterTasks = (text) => {
    const taskElementsList = document.getElementsByClassName('task');
    for (const taskElement of taskElementsList) {
        const taskTitle = taskElement.getElementsByClassName('taskTitle')[0];
        if (!taskTitle || !taskTitle.innerHTML.includes(text)) {
            taskElement.classList.add('hidden');
        }
    }
}

const clearFiltration = () => {
    const taskElementsList = document.getElementsByClassName('task');
    for (const taskElement of taskElementsList) {
        taskElement.classList.remove('hidden');
    }
}
