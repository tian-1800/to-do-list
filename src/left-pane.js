import * as rightPane from './right-pane.js';
import addEditDel from './edit-del-icon.js';

class Project {
    constructor(title) {
        this.title = title;
        this.description = "lorem ipsum domet ngalor ngidul arep nangendi ora keturutan";
        this.startDate = '';
        this.dueDate = '';
        this.taskList = [];
    }
    addTask = (task) => this.taskList.push(task); 
    deleteTask = (task) => {
        this.task.splice(this.indexOf(task),1);
    }
    static list;
    static activeIndex = 0;
    static lastDeleted;
    static name = "project";
}

const addDOM = (() => {
    const project = (obj) => {
        obj.addEventListener('click', () => {
            Project.activeIndex = obj.parentElement.index;
            display.initDisplay();
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
            let li = document.createElement('li');
            li.className = 'project-item';
            li.textContent = project.title;
            li.project = project;
            li.index = list.indexOf(project);
            addEditDel(li,project,"title", list);
            addDOM.project(li.firstChild);
            // del.type = "project";
            // editText.makeTextEditable(edit, item, project, "title", false);
            // deleteModule.makeTextDeletable(del, list, item);
            window.appendChild(li);
        }
        initDisplay();
    }
    const initDisplay = () => {
        if (Project.list.length > 0) {
            //projectList(Project.list);
            if(Project.list.length<Project.activeIndex+1) Project.activeIndex = 0;
            rightPane.displayThisProject(Project.list[Project.activeIndex],Project.activeIndex);
            let list = document.getElementsByClassName('project-item');
            for (let item of list) {
                item.classList.remove('selected');
                item.displayed = false;
            }
            let obj = list[Project.activeIndex];
            obj.classList.add("selected");
            obj.displayed = true;
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
        document.getElementById('input-project-title').value = '';
        save();
        projectList(Project.list);
    }
    const save = (update) => {
        sessionStorage.setItem('projects', JSON.stringify(Project.list));
        if (update) projectList(Project.list);
    }
    return {
        projectList, addButton, newForm, newProject, save,initDisplay,
    }

})();
const projectList = display.projectList;
const addProjectButton = display.addButton;
const save = display.save;
export {
    projectList,addProjectButton,Project,save
}

