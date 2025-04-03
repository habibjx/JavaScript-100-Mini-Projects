/**
 * 02/04/2025.
 * Description:
 * Author: M H R Habib.
 */

// Global Variables
const welcomeText = [
    { id: 1, isMark: false, text: 'Your day, your plan! Start adding tasks now.' },
    { id: 2, isMark: false, text: 'Add your first task and stay productive!' },
    { id: 3, isMark: false, text: 'Welcome! Let’s organize your tasks today.' }
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
    if (mark){
        const id = mark.parentElement.getAttribute('data-time');
        let isMark = true;
        if(mark.innerHTML.trim() === ""){
            mark.innerHTML = `<i class="fa-solid fa-check"></i>`;
            isMark = true;
        }
        else{
            mark.innerHTML = "";
            isMark = false;
        }
        updateCheckMark(id, isMark)
    }
}



// DOM function ==============================

function nodeListUpdate(node){
    const list = document.createElement('div');
    const checkMark = document.createElement('div');
    const p = document.createElement('p');
    const deleteBox = document.createElement('div');

    list.classList.add('list')
    checkMark.classList.add('check-mark');
    p.innerText = node;
    deleteBox.classList.add('delete-box');
    deleteBox.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    const uniqueTimeId = Date.now() * Math.ceil(Math.random() * 10);
    list.setAttribute('data-time', uniqueTimeId);
    list.append(checkMark, p, deleteBox);
    nodeListsParent.prepend(list);

    nodeList.push({id: uniqueTimeId, isMark: false, text: node});
    saveData();
}
function nodeListReUpdate(id, isMark, node){
    const list = document.createElement('div');
    const checkMark = document.createElement('div');
    const p = document.createElement('p');
    const deleteBox = document.createElement('div');

    list.classList.add('list')
    checkMark.classList.add('check-mark');
    if(isMark){
        checkMark.innerHTML = `<i class="fa-solid fa-check"></i>`;
    }
    else{
        checkMark.innerHTML = "";
    }
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
    saveData();
}

function autoUpdateNode(){
    console.log(nodeList)
    nodeListsParent.innerHTML = '';
    for(let node of nodeList){
        nodeListReUpdate(node.id, node.isMark, node.text)
    }
}

function saveData(){
    localStorage.setItem('userData', JSON.stringify(nodeList));
}

function updateCheckMark(id, isMark){
    for(let obj of nodeList){
        if(obj.id === Number(id)){
            obj.isMark = isMark;
            saveData();
        }         
    }
}