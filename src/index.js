import * as display from './left-pane.js';
let list = [];
list = JSON.parse(sessionStorage.getItem('projects'));
const firstProject = new display.Project('Vacation To Rome');
firstProject.description = "We'll go from June 14-22 and stop through London on the way back to visit Jane and Paolo. Monti looks like a great place to stay. Maybe do a night out in Trastevere."
if(!list) {
    list = [firstProject];
    sessionStorage.setItem('projects', JSON.stringify(list));
} 
display.addProjectButton();
display.projectList(list);