import * as projectList from './left-pane.js';

let global;
const addDOM = {
    text: (toggler, obj, item, attr, big) => {
        toggler.addEventListener('click', () => {
            item = obj.item;
            global = {toggler, obj, item, attr, big};
            toggler.style.display='none';
            obj.style.display='none';
            console.log(item);
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
    let input;
    if (global.big) {
        input = document.createElement('textarea');
        input.cols = "50";
        input.rows = "5";
        console.log('big');
    }
    else {
        input = document.createElement('input');
        input.style.display = 'inline';
        input.style.width = '150px';
    }
    input.value = obj.textContent;
    let submit = document.createElement('button');
    submit.type = 'button';
    submit.innerHTML = '<i class="material-icons">done</i>';
    submit.style.opacity = '100%';
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
    global.obj.style.display = 'initial';
    global.toggler.style.display = 'initial';
}

// main function, args are as follow:
//     -toggler: object storing the clicked edit icon
//     -obj: text object to be edited
//     -item.attr: variable which has obj as the text content
//     -big: true if input form is to be a text area, false if an regular input text`
const makeTextEditable = (toggler, obj, item, attr, big) => {
    obj.item = item;
    if (obj.editable) return;
    obj.editable = true;
    addDOM.text(toggler, obj, item, attr, big);
}


export {
    makeTextEditable,
}