import * as projectList from './left-pane.js';
import differenceInCalendarDays from 'date-fns/differenceInDays';
import parseISO from 'date-fns/parseISO';

let global;
const addDOM = {
    duration: (obj,item) => {
        global = {obj,item};
        obj.addEventListener('click', () => {
            displayEditDuration(obj);
            obj.style.display = 'none';
        })
    },
    date: (obj,item) => {
        obj.addEventListener('click', () => {
            global = {obj,item};
            displayEditDate(obj);
            obj.style.display = 'none';
        })
    },
    submitDuration: (obj, start, finish) => {
        obj.addEventListener('click', () => {
            let a = start.firstElementChild.value;
            let b = finish.firstElementChild.value;
            console.log(a,b);
            if (a != "" & b != "") { 
                global.item.startDate = a;
                global.item.dueDate = b;
                console.log('global item is ' + global.item);
                global.obj.textContent = countDuration(global.obj,a,b);
                projectList.save();
                removeTemporaryForm();
            }
        })
    },
    submitDate: (obj,dueDate) => {
        obj.addEventListener('click', () => {
            let a = dueDate.firstElementChild.value;
            if (a != "") {
                global.item.dueDate = a;
                global.obj.textContent = a;
                projectList.save();
                removeTemporaryForm();
            }
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
    const start = createInput('start');
    const finish = createInput('finish');
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

const displayEditDate = (obj) => {
    let parent = obj.parentElement;
    let form = document.createElement('form');
    form.id = 'temporary-form';
    form.style.display = 'block';    
    const dueDate = createInput('due');
    let submit = document.createElement('button');
    submit.type = 'button';
    submit.innerHTML = '<i class="material-icons">done</i>';
    addDOM.submitDate(submit, dueDate);
    let cancel = document.createElement('button');
    cancel.button = 'button';
    cancel.innerHTML = '<i class="material-icons">clear</i>';    
    addDOM.cancel(cancel);
    form.append(dueDate,submit,cancel);
    parent.appendChild(form);
}

const createInput = (text) => {
    let label = document.createElement('label');
    label.for = text;
    label.textContent = `${text} date: `;
    label.style.display = 'block';
    let obj = document.createElement('input');
    obj.type = 'date';
    obj.id = text;    
    const attr = {
        'start': global.item.startDate,
        'finish': global.item.dueDate,
        'due': global.item.dueDate,
    }
    obj.valueAsDate = parseISO(attr[text]);
    console.log("valueDate is" + obj.valueAsDate);
    if (!obj.valueAsDate) {
        obj.valueAsDate = new Date();
    }
    label.appendChild(obj);
    return label;
}
const countDuration = (obj, start, finish) => {
    const today = new Date();
    //const untilStart = differenceInCalendarDays(today,start);
    //const untilFinish = differenceInCalendarDays(today,finish);
    return `${start} until ${finish}`;
}

const removeTemporaryForm = () => {
    let element = document.getElementById('temporary-form');
    element.remove();
    console.log("global.obj is " + global.obj);
    global.obj.style.display = 'initial';
}

const makeDateEditable = (obj, projectOrTask, item) => {
    //global = {obj,item};
    if (obj.editable) {
        if (projectOrTask == "project") {
            global = {obj,item};
        }
        return;
    }
    obj.editable = true;
    if (projectOrTask == "project") {
        addDOM.duration(obj,item);
    }
    else addDOM.date(obj,item);

}

export {
    makeDateEditable
};