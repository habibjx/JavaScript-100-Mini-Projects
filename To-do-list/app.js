/**
 * 02/04/2025.
 * Description:
 * Author: M H R Habib.
 */

// Global Variables
const welcomeText = [
    { id: 1, text: 'Your day, your plan! Start adding tasks now.' },
    { id: 2, text: 'Add your first task and stay productive!' },
    { id: 3, text: 'Welcome! Let’s organize your tasks today.' }
];

let nodeList = JSON.parse(localStorage.getItem('userData')) || welcomeText;

const nodeListsParent = document.getElementById('nodeListsParent');

window.onload = () => {
    main()
    

}

function main(){
    // DOM References =========
    const userInput = document.getElementById('userInput');
    const addNodeButton = document.getElementById('addNodeButton');
    

    // Event Listener ===========
    addNodeButton.addEventListener('click', () => handleAddNodeButton(userInput));
    nodeListsParent.addEventListener('click', (event) => handleNodeListsParent(event));

    userInput.addEventListener('keydown', (event) => {if(event.key === 'Enter') addNodeButton.click()});

    autoUpdateNode();
}

// Event Handler ==========
function handleAddNodeButton(userInput){
    const node = userInput.value;
    if(node === ''){
        alert('Please Enter Node');
        return;
    }
    nodeListUpdate(node);
    userInput.value = '';
}
function handleNodeListsParent(event){
    const deleteButton = event.target.closest('.delete-box');
    if(deleteButton){
        const id = deleteButton.parentElement.getAttribute('data-time');
        findNodeById(id)
        deleteButton.parentElement.remove();
    }
    
    const mark = event.target.closest('.check-mark');
    if (mark) mark.innerHTML = mark.innerHTML.trim() === "" ? `<i class="fa-solid fa-check"></i>` : "";
}


// DOM function ==============================

function nodeListUpdate(node){
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

    const uniqueTimeId = Date.now() * Math.ceil(Math.random() * 10);
    list.setAttribute('data-time', uniqueTimeId);
    list.append(checkMark, p, deleteBox);
    nodeListsParent.prepend(list);

    nodeList.push({id: uniqueTimeId, text: node});
    localStorage.setItem('userData', JSON.stringify(nodeList));
}
function nodeListReUpdate(id, node){
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

    list.setAttribute('data-time', id);
    list.append(checkMark, p, deleteBox);
    nodeListsParent.prepend(list);
}


//Utilities Function ========================
function findNodeById(id) {
    const index = nodeList.findIndex( obj => {
        return obj.id === Number(id);
    });
    if(index !== -1){
        nodeList.splice(index,1);
    }
    localStorage.setItem('userData', JSON.stringify(nodeList));
}

function autoUpdateNode(){
    console.log(nodeList)
    nodeListsParent.innerHTML = '';
    for(let node of nodeList){
        nodeListReUpdate(node.id, node.text)
    }
}
