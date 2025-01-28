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


const listBox = document.querySelector('.list');

let mainTaskArray = [];

//доббавление элемента в общий массив
addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    mainTaskArray.push({number: mainTaskArray.length, name: namefield.value, description: textholder.value, status: statusPosition.value, date: currentDate.toLocaleString('ru-RU', options)});
    changeLayout(mainTaskArray);
});

//фильтрация по имени или статусу
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    changeLayout(createFilteredList(mainTaskArray));
});

//отрисовка экрана
function changeLayout(taskArray){
    //нарисовать шапку
    listBox.innerHTML = `<ul>
                            <li>
                                <div class="lable-li text-part">
                                    <p>Name</p>
                                    <p>Description</p>
                                    <p>Date</p>
                                    <p>Status</p>
                                </div>
                            </li>
                        </ul>`;

        //добавить надпись, что лист пуст, иначе отрисовать элементы (задачи)
         if (taskArray.length === 0){
            listBox.innerHTML += `<div class="empty-list">
                                    <p>Your list is empty</p>
                                    <img src="./images/icons8-sad-ghost-48.png" alt="sad-ghost">
                                /div>`;
        } 
        else{
            for (const index in taskArray) createElement(index, taskArray);
            addDeleteOnBtns(taskArray);
        }
}

//добавление задачи на экран
function createElement(numberOfElement, taskArray){
    const li = `<li id="${numberOfElement}-li">
                    <div class="text-part">
                        <p>${taskArray[numberOfElement].name}</p>
                        <p>${taskArray[numberOfElement].description}</p>
                        <p>${taskArray[numberOfElement].date}</p>
                        <p class="status-text">${taskArray[numberOfElement].status}</p>
                    </div>
                    <button id="${numberOfElement}" class="delete-task">Delete</button>
                </li>`;
                
    const ul = document.querySelector('ul');
    ul.innerHTML += li; 
}

//добавление addEventListener на каждую кнопку
function addDeleteOnBtns(taskArray){ 
    const deleteBtns = document.querySelectorAll('.delete-task');
    const ul = document.querySelector('ul');

    //удаление элемента (задачи) из DOM и из общего массива
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const li = document.getElementById(`${deleteBtn.id}-li`);
            ul.removeChild(li);
            taskArray.splice(taskArray.findIndex(element => element.number == deleteBtn.id), 1); 

            if (taskArray.length === 0){
                listBox.innerHTML += `<div class="empty-list">
                                    <p>Your list is empty</p>
                                    <img src="./images/icons8-sad-ghost-48.png" alt="sad-ghost">
                                </div>`;
            } 
        });
    }); 
}

//создание нового массива, в котором содержаться элементы, которые удовлетворяют условиям
function createFilteredList(taskArray){
    filteredtaskArray = [];
    filteredtaskArray = taskArray.filter(element => (element.name === searchTextholder.value || searchTextholder.value === '') && (element.status === searchStatus.value || searchStatus.value === ''));
    return filteredtaskArray;
}
