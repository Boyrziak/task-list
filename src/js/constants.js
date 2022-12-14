export const urlConstants = {
    HOME: '/my-tasks.html',
}

export const stringConstants = {
    localStorageKey: 'taskList',
    localStorageDoneKey: 'doneTasks',
}

export const getTaskTemplate = (value, id) => {
    return `<div class="task plainTask" id="${id}">
            <div class="taskName">
                <div class="radio leftElement"><img width="15" src="src/images/check.png"></div>
                <span class="taskTitle">${value}</span>
            </div>
        </div>`
}

export const storageTemplate = JSON.stringify({taskList: []});