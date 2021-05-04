import * as projectList from './left-pane.js';
import differenceInCalendarDays from 'date-fns/differenceInDays';
import parseISO from 'date-fns/parseISO';

let global;
const addDOM = {
    duration: (obj) => {
        obj.addEventListener('click', () => {
            displayEditDuration(obj);
            obj.style.display = 'none';
        })
    },
    date: (obj) => {
        obj.addEventListener('click', () => {
            displayEditDate(obj);
            obj.style.display = 'none';
        })
    },
    submitDuration: (obj, start, finish) => {
        obj.addEventListener('click', () => {
            global.item.startDate = start.value;
            global.item.dueDate = finish.value;
            global.obj.textContent = countDuration(global.obj,start,finish);
            projectList.save();
            removeTemporaryForm();
        })
    },
    cancel: (obj) => {
        obj.addEventListener('click', () => {
            removeTemporaryForm();
        })
    }
}

const displayEditDuration = (obj) => {
    let parent = obj.parentElement;
    let form = document.createElement('form');
    form.id = 'temporary-form';
    form.style.display = 'block';    
    const start = createStart();
    const finish = createFinish();
    let submit = document.createElement('button');
    submit.type = 'button';
    submit.innerHTML = '<i class="material-icons">done</i>';
    addDOM.submitDuration(submit, start, finish);
    let cancel = document.createElement('button');
    cancel.button = 'button';
    cancel.innerHTML = '<i class="material-icons">clear</i>';    
    addDOM.cancel(cancel);
    form.append(start,finish,submit,cancel);
    parent.appendChild(form);
}

const createStart = () => {
    let start = document.createElement('input');
    start.type = 'date';
    console.log(global.item.startDate);
    if (global.item.startDate == "") {
        start.valueAsDate = new Date();
    }
    else start.valueAsDate = parseISO(global.item.startDate);
    return start;
}
const createFinish = () => {
    let finish = document.createElement('input');
    finish.type = 'date';
    if (global.item.dueDate == "") {
        finish.valueAsDate = new Date();
    }
    else finish.valueAsDate = parseISO(global.item.dueDate);
    return finish;
}
const countDuration = (obj, start, finish) => {
    const today = new Date();
    const untilStart = differenceInCalendarDays(today,start);
    const untilFinish = differenceInCalendarDays(today,finish);
    return `${start.value} until ${finish.value}`;
}

const removeTemporaryForm = () => {
    let element = document.getElementById('temporary-form');
    element.remove();
    global.obj.style.display = 'block';
}

const makeDateEditable = (obj, projectOrTask, item) => {
    if (obj.editable) return;
    obj.editable = true;
    global = {obj,item};
    if (projectOrTask == "project") {
        addDOM.duration(obj);
    }
    else addDOM.date(obj);

}

export {
    makeDateEditable
};