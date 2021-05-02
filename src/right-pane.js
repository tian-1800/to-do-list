//import differenceInDays from 'date-fns/differenceInDays';
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
    const newTask = () => {
        let project = document.getElementById('add-task-button').project;   
        if (!project) return;    
        let title = document.getElementById('task-title').value;
        let description = document.getElementById('task-desc').value;
        let dueDate = document.getElementById('due-date').value;
        let priority = false;
        project.addTask(new Task(title,description,dueDate,priority));
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
        addDOM.taskList(project,taskList);
        window.appendChild(taskList);
    }
    return {
        button,initButton,newForm,taskWindow,newTask,
    }
})();

const displayThisProject = (project) => {
    display.taskWindow(project);
    display.button(project);
}
const init = display.initButton;

export {
    displayThisProject, init
}