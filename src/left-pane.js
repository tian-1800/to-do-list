import * as rightPane from './right-pane.js';
import * as editText from './edit-text-module.js';

class Project {
    constructor(title) {
        this.title = title;
        this.description = "lorem ipsum domet ngalor ngidul arep nangendi";
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

let displayed;

const addDOM = (() => {
    const project = (obj) => {
        obj.addEventListener('click', () => {
            rightPane.displayThisProject(obj.project,obj.projectIndex);
            let list = document.getElementsByClassName('project-item');
            for (let item of list) {
                item.classList.remove('selected');
            }
            obj.classList.add("selected");
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
                let title = document.getElementById('input-project-title').value;
                if (title != "") {
                    display.newProject();
                    document.getElementById('new-project-form').style.display = 'none';
                    document.getElementById('add-project-button').style.display = 'block';
                }
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
            let li = document.createElement('li');
            let item = document.createElement('span');
            item.className = 'project-item';
            item.textContent = project.title;
            item.project = project;
            item.projectIndex = list.indexOf(project);
            addDOM.project(item);
            let edit = document.createElement('i');
            edit.classList = 'material-icons edit';
            edit.textContent = 'edit';
            let del = document.createElement('i');
            del.classList = 'material-icons delete';
            del.textContent = 'delete';
            editText.makeTextEditable(edit, item, project, "title", false);
            li.append(item, edit, del);
            window.appendChild(li);
        }
        initDisplay();
    }
    const initDisplay = () => {
        if (Project.list.length > 0) {
            rightPane.displayThisProject(Project.list[0]);
            displayed = 0;
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

