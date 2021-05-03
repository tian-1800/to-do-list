import differenceInCalendarDays from 'date-fns/differenceInDays';
import parseISO from 'date-fns/parseISO';

class Task {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = false;
    }
}

const addDOM = (() => {
    const taskList = (project,list) => {
        for (let task of project.taskList) {
            let li = document.createElement('li');
            li.textContent = task.title;
            let text = document.createElement('p');
            text.classList.add('task-description');
            text.textContent = task.description;
            text.style.display = 'none';
            li.appendChild(text);
            li.addEventListener('click', () => {
                if (text.style.display == 'none') {
                    text.style.display = 'block';
                }
                else text.style.display = 'none';
            })
            list.appendChild(li);     
            let test = differenceInCalendarDays(parseISO(task.dueDate), new Date());  
            console.log(test);     
        }
    }
    const button = {
        plus: (obj) => {
            obj.addEventListener('click', () => {
                display.newForm();
                obj.style.display = 'none';
                document.getElementById('task-button-description').style.display = 'none';
            })
        },
        submit: (obj) => {
            obj.addEventListener('click', () => {
                //console.log("submit");
                display.newTask();
                document.getElementById('new-task-form').style.display = 'none';
                document.getElementById('add-task-button').style.display = 'block';
                document.getElementById('task-button-description').style.display = 'block';
            })
        },
        cancel: (obj) => {
            obj.addEventListener('click', () => {
                document.getElementById('new-task-form').style.display = 'none';
                document.getElementById('add-task-button').style.display = 'block';
                document.getElementById('task-button-description').style.display = 'block';
            })
        },
    };
    return {
        taskList,
        button,
    }
})();

let index;
const display = (() => {
    const initButton = () => {
        let button = document.getElementById('add-task-button');
        let doneButton = document.getElementById('new-task-submit');
        let cancelButton = document.getElementById('new-task-cancel');
        addDOM.button.submit(doneButton);
        addDOM.button.cancel(cancelButton);
        addDOM.button.plus(button);
    }
    const button = (project) => {
        let button = document.getElementById('add-task-button');
        button.style.display = 'block';
        document.getElementById('task-button-description').style.display = 'block';
        button.project = project;
        console.log(project);
    }
    const saveToStorage = (task) => {        
        let list = JSON.parse(sessionStorage.getItem('projects'));
        console.log("index is "+index);
        list[index].taskList.push(task);
        sessionStorage.setItem('projects',JSON.stringify(list));
    }
    const newTask = () => {
        let project = document.getElementById('add-task-button').project;   
        if (!project) return;    
        let title = document.getElementById('task-title').value;
        let description = document.getElementById('task-desc').value;
        let dueDate = document.getElementById('due-date').value;
        let priority = false;
        let task = new Task(title,description,dueDate,priority);
        project.taskList.push(task);
        saveToStorage(task);
        displayThisProject(project);
    }
    const newForm = () => {    
        let form = document.getElementById('new-task-form');
        form.style.display = 'block';
    }
    const taskWindow = (project) => {
        const window = document.getElementById('task-container');
        window.innerHTML = "";
        const taskList = document.createElement('ul');
        taskList.id = 'task-list';
        addDOM.taskList(project,taskList);
        window.appendChild(taskList);
    }
    const taskHeader = (project) => {
        let header = document.getElementById('task-header');
        header.style.display = 'block';
        header.textContent = project.title;
    }
    return {
        button,initButton,newForm,taskWindow,newTask,taskHeader,
    }
})();

const displayThisProject = (project, i) => {
    index = i;
    display.taskHeader(project);
    display.taskWindow(project);
    display.button(project);
}
const init = display.initButton;

export {
    displayThisProject, init
}