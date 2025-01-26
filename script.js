const namefield = document.getElementById('name');
const textholder = document.getElementById('textholder');
const statusPosition = document.getElementById('status');
const addBtn = document.getElementById('add-task');

const ul = document.querySelector('ul');

let taskArray = [];

addBtn.addEventListener('click', changeLayout);


function changeLayout(event){
    event.preventDefault();
    ul.innerHTML = `<li>
                        <div class="lable-li text-part">
                            <p>Name</p>
                            <p>Discription</p>
                            <p>Status</p>
                        </div>
                    </li>`;
    taskArray.push({number: taskArray.length, name: namefield.value, discription: textholder.value, status: statusPosition.value});
    console.log(taskArray);
    taskArray.forEach(element => {
        createElement(element.number);
        addDeleteOnBtns();
    });
    
}

function createElement(numberOfElement){
    const li = `<li id="${numberOfElement}-li">
    <div class="text-part">
        <p>${taskArray[numberOfElement].name}</p>
        <p>${taskArray[numberOfElement].discription}</p>
        <p class="status-text">${taskArray[numberOfElement].status}</p>
    </div>
    <button id="${numberOfElement}" class="delete-task">Delete</button>
    </li>`;
    ul.innerHTML += li; 
}

function addDeleteOnBtns(){
    const deleteBtns = document.querySelectorAll('.delete-task');
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const li = document.getElementById(`${deleteBtn.id}-li`);
            ul.removeChild(li);
            console.log("deleteBtn.id: "+deleteBtn.id);
            console.log(taskArray.findIndex(element => element.number == deleteBtn.id));
            taskArray.splice(taskArray.findIndex(element => element.number == deleteBtn.id), 1);   
            console.log(taskArray);
        });
    }); 
}