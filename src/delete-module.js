import * as projectList from './left-pane.js';
import * as rightPane from './right-pane.js';

const addDOM = {
    delete: (toggler, array, obj) => {
        toggler.addEventListener('click', () => {
            array.splice(obj.index, 1);
            updateDisplay(toggler, array, obj);
        })
    }
}
const updateDisplay = (toggler, array, obj) => {
    // let update;
    // if (toggler.parentElement.classList.contains("project-item")) {
    //     update = true;
    //     console.log("update");
    // }
    projectList.save(true);
    // if (toggler.type == "project") {
    //     projectList.projectList(array);   
    //     if (obj.displayed) {
    //         rightPane.displayThisProject(array[0]);
    //     }   
    // }
    
}
const makeTextDeletable = (toggler, array, obj) => {
    addDOM.delete(toggler, array, obj);
}

export {
    makeTextDeletable,
}