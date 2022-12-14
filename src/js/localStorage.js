import {storageTemplate, stringConstants} from "./constants.js";

export const initialStorageSetup = () => {
    const initialStorage = getStorage(stringConstants.localStorageKey);
    if (!initialStorage) {
        localStorage.setItem(stringConstants.localStorageKey, storageTemplate);
        localStorage.setItem(stringConstants.localStorageDoneKey, storageTemplate);
    }
}

export const getTaskStorageLocation = (id) => {
    const activeStorage = getStorage(stringConstants.localStorageKey);

    if (JSON.parse(activeStorage).taskList.find((task) => task.id.localeCompare(id) === 0)) {
        return stringConstants.localStorageKey;
    } else {
        return stringConstants.localStorageDoneKey;
    }
}

export const getTasksFromStorage = (key) => {
    const taskListString = getStorage(key);
    if (!taskListString) {
        initialStorageSetup();
    }
    return JSON.parse(getStorage(key)).taskList;
}

export const addTaskToStorage = (task, key) => {
    const taskListString = getStorage(key);
    const taskList = JSON.parse(taskListString);
    taskList.taskList.push(task);
    localStorage.setItem(key, JSON.stringify(taskList));
}

export const removeTaskFromStorage = (id, key) => {
    const taskListString = getStorage(key);
    const taskList = JSON.parse(taskListString);
    const newList = taskList.taskList.filter((task) => {
        if (task.id.localeCompare(id) === 0) {
            addTaskToStorage(task, key.localeCompare(stringConstants.localStorageKey) === 0 ? stringConstants.localStorageDoneKey : stringConstants.localStorageKey);
        } else {
            return task;
        }
    });
    localStorage.setItem(key, JSON.stringify({taskList: newList}));
}

export const getStorage = (key) => {
    return localStorage.getItem(key);
}