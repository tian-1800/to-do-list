import * as editText from './edit-text-module.js';
import * as editDate from './edit-date-module.js';
import * as projectList from './left-pane.js';
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
    }
    return {
        taskList,
        button,
    }
})();

const display = (() => {
    let index;
    const initButton = () => {
        let button = document.getElementById('add-task-button');
        let doneButton = document.getElementById('new-task-submit');
        let cancelButton = document.getElementById('new-task-cancel');
        addDOM.button.submit(doneButton);
        addDOM.button.cancel(cancelButton);
        addDOM.button.plus(button);
    }
    const button = (project, i) => {
        index = i;
        let button = document.getElementById('add-task-button');
        button.style.display = 'block';
        document.getElementById('task-button-description').style.display = 'block';
        button.project = project;
        console.log(project);
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
        projectList.save();
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
        let headerText = document.getElementById('task-header-text');
        let description = document.getElementById('project-description');
        let descEdit = document.getElementById('project-desc-edit');
        let timetable = document.getElementById('project-timetable');
        if (description.textContent == "") description.textContent = "Click to enter description";
        editText.makeTextEditable(descEdit,description,project,"description",true);
        editDate.makeDateEditable(timetable, "project", project);
        if (project.startDate == "") {
            timetable.textContent = "click to edit timetable";
        }
        else timetable.textContent = `${project.startDate} until ${project.dueDate}`;
        header.style.display = 'block';
        description.style.display = 'block';
        headerText.textContent = project.title;
        description.textContent = project.description;
    }
    return {
        index,button,initButton,newForm,taskWindow,newTask,taskHeader
    }
})();


const displayThisProject = (project, i) => {
    display.taskHeader(project);
    display.taskWindow(project);
    display.button(project,i);
}
const init = display.initButton;

export {
    displayThisProject, init
}