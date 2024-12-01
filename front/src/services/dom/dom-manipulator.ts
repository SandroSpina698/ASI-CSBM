export const disableElementById = (element_id : string) => {
    const element = document.getElementById(element_id);
    if(element) {
        element.classList.add("invisible");
    } else {
        console.warn(`No element with id ${element_id} found`);
    }
}

export const enableElementById = (element_id : string) => {
    const element = document.getElementById(element_id);
    if(element) {
        element.classList.remove("invisible");
    } else {
        console.warn(`No element with id ${element_id} found`);
    }
}

export const addLabelToElementById = (element_id : string, label : string) => {
    const element = document.getElementById(element_id);
    if(element){
        element.innerText = label;
    } else {
        console.warn(`No element with id ${element_id} found`);
    }
}

export const addClassToElementById = (element_id : string, className : string ) => {
    const element = document.getElementById(element_id);
    if(element) {
        element.classList.add(className);
    }else {
        console.warn(`No element with id ${element_id} found`);
    }
}

export const removeClassToElementById = (element_id : string, className : string ) => {
    const element = document.getElementById(element_id);
    if(element) {
        element.classList.remove(className);
    }else {
        console.warn(`No element with id ${element_id} found`);
    }
}