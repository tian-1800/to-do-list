import * as display from './left-pane.js';
let list = [];
list = JSON.parse(sessionStorage.getItem('projects'));
const firstProject = new display.Project('First Project');
if(!list) {
    list = [firstProject];
    sessionStorage.setItem('projects', JSON.stringify(list));
} 
display.addProjectButton();
display.projectList(list);