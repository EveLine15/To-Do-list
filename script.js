const namefield = document.getElementById('name');
const textholder = document.getElementById('textholder');
const statusPosition = document.getElementById('status');
const addBtn = document.getElementById('add-task');

const searchBtn = document.getElementById('search-btn');
const searchStatus = document.getElementById('status-search');
const searchTextholder = document.getElementById('textholder-search');

const currentDate = new Date();

const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }

const ul = document.querySelector('ul');

let mainTaskArray = [];

addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    mainTaskArray.push({number: mainTaskArray.length, name: namefield.value, description: textholder.value, status: statusPosition.value, date: currentDate.toLocaleString('ru-RU', options)});
    changeLayout(mainTaskArray);
});

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    changeLayout(createFilteredList(mainTaskArray));
});

function changeLayout(taskArray){
    console.log('Array in changeLayout: ', taskArray);
    ul.innerHTML = `<li>
                        <div class="lable-li text-part">
                            <p>Name</p>
                            <p>Description</p>
                            <p>Date</p>
                            <p>Status</p>
                        </div>
                    </li>`;
    taskArray.forEach((element, index) => {
        createElement(index, taskArray);
        addDeleteOnBtns(taskArray);
    });
    
}

function createElement(numberOfElement, taskArray){
    console.log('Task array filtered: ', taskArray);
    console.log('Number of element: ', numberOfElement);
    const li = `<li id="${numberOfElement}-li">
                    <div class="text-part">
                        <p>${taskArray[numberOfElement].name}</p>
                        <p>${taskArray[numberOfElement].description}</p>
                        <p>${taskArray[numberOfElement].date}</p>
                        <p class="status-text">${taskArray[numberOfElement].status}</p>
                    </div>
                    <button id="${numberOfElement}" class="delete-task">Delete</button>
                </li>`;
    ul.innerHTML += li; 
}

function addDeleteOnBtns(taskArray){
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

function createFilteredList(taskArray){
    filteredtaskArray = [];
    filteredtaskArray = taskArray.filter(element => (element.description === searchTextholder.value || searchTextholder.value === '') && (element.status === searchStatus.value || searchStatus.value === ''));
    console.log('filtered: ',filteredtaskArray);
    return filteredtaskArray;
}
