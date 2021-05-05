import * as projectList from './left-pane.js';

const addDOM = {
    delete: (toggler, array, index) => {
        toggler.addEventListener('click', () => {
            array.splice(index, 1);
            updateDisplay();
        })
    }
}
const updateDisplay = () => {
    projectList.save();
    
}
const del = (toggler, array, index) => {
    addDOM.delete(toggler, array, index);
}