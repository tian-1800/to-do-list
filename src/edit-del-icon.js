import { makeTextDeletable } from "./delete-module";
import { makeTextEditable } from "./edit-text-module";

const addEditDel = (obj,item,attr,list) => {
    let span = document.createElement('span');
    span.innerHTML = obj.innerHTML;
    span.index = obj.index;
    obj.innerHTML = "";
    let edit = document.createElement('i');
    edit.classList = 'material-icons appearing-icon';
    edit.textContent = 'edit';
    let del = document.createElement('i');
    del.classList = 'appearing-icon material-icons';
    del.textContent = 'delete';
    obj.append(span, edit,del);
    makeTextEditable(edit, span, item, attr, false);
    makeTextDeletable(del,list,span);
}

export {
    addEditDel as default
}