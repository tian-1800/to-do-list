import * as rightPane from './right-pane.js';

class Project {
    constructor(title) {
        this.title = title;
        this.description = "lorem ipsum domet ngalor ngidul arep nangendi (click here to edit)";
        this.startDate = '';
        this.dueDate = '';
        this.taskList = [];
    }
    addTask = (task) => this.taskList.push(task); 
    deleteTask = (task) => {
        this.task.splice(this.indexOf(task),1);
    }
    static list;
}

const addDOM = (() => {
    const project = (obj) => {
        obj.addEventListener('click', () => {
            rightPane.displayThisProject(obj.project,obj.projectIndex);
        })
        obj.addEventListener('text-update', () => {
            sessionStorage.setItem('projects', JSON.stringify(Project.list));
            console.log('update');
        })
    }
    const button = {
        plus: (obj) => {
            obj.addEventListener('click', () => {
                display.newForm();
                obj.style.display = 'none';
            })
        },
        submit: (obj) => {
            obj.addEventListener('click', () => {
                console.log("submit");
                display.newProject();
                document.getElementById('new-project-form').style.display = 'none';
                document.getElementById('add-project-button').style.display = 'block';
            })
        },
        cancel: (obj) => {
            obj.addEventListener('click', () => {
                console.log("cancel");
                document.getElementById('new-project-form').style.display = 'none';
                document.getElementById('add-project-button').style.display = 'block';
            })
        },
    }
    return {
        project, button
    }
})();

const display = (() => {    
    const window = document.getElementById('project-list');
    const projectList = (list) => {
        Project.list = list;
        window.innerHTML = '';
        for (let project of list) {
            //console.log(project.title);
            let item = document.createElement('li');
            item.textContent = project.title;
            item.project = project;
            item.projectIndex = list.indexOf(project);
            addDOM.project(item);
            window.appendChild(item);
        }
    }
    const addButton = () => {
        let button = document.getElementById('add-project-button');
        let doneButton = document.getElementById('new-project-submit');
        let cancelButton = document.getElementById('new-project-cancel');
        addDOM.button.plus(button);
        addDOM.button.submit(doneButton);
        addDOM.button.cancel(cancelButton);
        rightPane.init();
    } 
    const newForm = () => {    
        let form = document.getElementById('new-project-form');
        form.style.display = 'block';
    }
    const newProject = () => {
        let title = document.getElementById('input-project-title').value;
        let project = new Project(title);
        console.log(title);
        Project.list.push(project);
        save();
        projectList(Project.list);
    }
    const save = () => {
        sessionStorage.setItem('projects', JSON.stringify(Project.list));
    }
    return {
        projectList, addButton, newForm, newProject, save
    }

})();
const projectList = display.projectList;
const addProjectButton = display.addButton;
const save = display.save;
export {
    projectList,addProjectButton,Project,save
}

