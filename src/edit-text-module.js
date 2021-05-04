import * as projectList from './left-pane.js';

let global;
const addDOM = {
    text: (obj) => {
        obj.addEventListener('click', () => {
            obj.style.display='none';
            displayEditForm(obj);
        })
    },
    submit: (obj, input) => {
        obj.addEventListener('click', () => {
            let newText = input.value;
            if (newText != "") {
                global.obj.textContent = newText;
                global.item[global.attr] = newText;
                projectList.save();
            }
            removeTemporaryForm();
        })
    },
    cancel: (obj) => {
        obj.addEventListener('click', () => {
            removeTemporaryForm();
        })
    }
}
const displayEditForm = (obj) => {
    let parent = obj.parentElement;
    let form = document.createElement('form');
    form.id = 'temporary-form';
    form.style.display = 'block';
    let input = document.createElement('input');
    input.type = 'text';
    input.value = obj.textContent;
    let submit = document.createElement('button');
    submit.type = 'button';
    submit.innerHTML = '<i class="material-icons">done</i>';
    addDOM.submit(submit, input)
    let cancel = document.createElement('button');
    cancel.button = 'button';
    cancel.innerHTML = '<i class="material-icons">clear</i>';    
    addDOM.cancel(cancel);
    form.append(input,submit,cancel);
    parent.appendChild(form);
} 
const removeTemporaryForm = () => {
    let element = document.getElementById('temporary-form');
    element.remove();
    global.obj.style.display = 'block';
}
const makeTextEditable = (obj, item, attr) => {
    if (obj.editable == true) return;
    obj.editable = true;
    global = {obj,item,attr};
    addDOM.text(obj);
}


export {
    makeTextEditable,
}