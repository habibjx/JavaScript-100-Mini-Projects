/**
 * 02/04/2025.
 * Description:
 * Author: M H R Habib.
 */

// Global Variables

window.onload = () => {
    main()

}

function main(){
    // DOM References =========
    const userInput = document.getElementById('userInput');
    const addNodeButton = document.getElementById('addNodeButton');
    const nodeListsParent = document.getElementById('nodeListsParent');

    // Event Listener ===========
    addNodeButton.addEventListener('click', () => addNodeButtonHandle(userInput, nodeListsParent));

    nodeListsParent.addEventListener('click', (event) => nodeListsParentHandle(event));

    userInput.addEventListener('keydown', (event) => {if(event.key === 'Enter') addNodeButton.click()});

}

// Event Handler ==========
function addNodeButtonHandle(userInput, nodeListsParent){
    const node = userInput.value;
    if(node === ''){
        alert('Please Enter Node');
        return;
    }
    nodeListUpdate(nodeListsParent, node)
    userInput.value = '';
}

// DOM function ==============================

function nodeListUpdate(element, node){
    const list = document.createElement('div');
    const checkMark = document.createElement('div');
    const p = document.createElement('p');
    const deleteBox = document.createElement('div');
    const i = document.createElement('i');

    list.classList.add('list')
    checkMark.classList.add('check-mark');
    p.innerText = node;
    deleteBox.classList.add('delete-box');
    deleteBox.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    list.append(checkMark, p, deleteBox);
    element.prepend(list);
}

function nodeListsParentHandle(event){
    const deleteButton = event.target.closest('.delete-box');
    if(deleteButton){
        const parent = deleteButton.parentElement
        if(parent) parent.remove();
    }
    
    const mark = event.target.closest('.check-mark');
    if (mark) mark.innerHTML = mark.innerHTML.trim() === "" ? `<i class="fa-solid fa-check"></i>` : "";
}


//Utilities Function ========================