const namefield = document.getElementById('name');
const textholder = document.getElementById('textholder');
const addForm = document.querySelector('.form-add');

const searchStatus = document.getElementById('status-search');
const searchTextholder = document.getElementById('textholder-search');

const errorMessage = document.querySelector('.error-message');

const listBox = document.querySelector('.list');
const list = document.querySelector('.new-list');
const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }

let mainTaskArray = [];

//доббавление элемента в общий массив
addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if(!namefield.value || !textholder.value) return errorMessage.classList.remove('none');
    else errorMessage.classList.add('none');
    const currentDate = new Date();
    mainTaskArray.push({number: mainTaskArray.length + 1, name: namefield.value, description: textholder.value, date: currentDate.toLocaleString('ru-RU', options), status: 'active'});
    changeLayout(mainTaskArray);
    addForm.reset();
});

//отрисовка экрана
function changeLayout(taskArray){
        //добавить надпись, что лист пуст, иначе отрисовать элементы (задачи)
         if (taskArray.length === 0){
            listBox.innerHTML += `<div class="empty-list">
                                    <p>Your list is empty</p>
                                    <img src="./images/icons8-sad-ghost-48.png" alt="sad-ghost">
                                </div>`;
        } 
        taskArray.forEach(item => createElement(item));
}

//добавление задачи на экран
function createElement({number, name, description, date, status}){
    const li = document.createElement('li');
    li.innerHTML = `
                    <div class="text-part">
                        <p class="name-field" id="${number}-nameText">${name}</p>
                        <input type="text" class="input-field none" id="${number}-nameText-input" placeholder="${name}">
                        <p>${description}</p>
                        <p>${date}</p>
                        <input type="checkbox" id="${number}" ${status === 'completed' ? "checked" : null} class="checkbox-status">
                    </div>
                    <button id="${number}" class="delete-task">Delete</button>`;
                
    list.appendChild(li);
}

// удаление
listBox.addEventListener('click', (event) => {
    if(event.target.classList.contains('delete-task')){
        const { id } = event.target;
        mainTaskArray = mainTaskArray.filter(item => item.number !== +id);
        changeLayout(mainTaskArray);
    }

    if(event.target.classList.contains('checkbox-status')){
        const { id } = event.target;
        mainTaskArray = mainTaskArray.map( item => {
            if (item.number === +id) {
                item.status = item.status === "active" ? "completed" : "active";
            }
            return item;
        });
        changeLayout(mainTaskArray);
    }
});

//фильтрация по имени
searchTextholder.addEventListener('input', (event) => {
    if(event.target.value.length > 2){
        const search = event.target.value.toLowerCase();
        const filter = mainTaskArray.filter(item => item.name.toLowerCase().includes(search));
        changeLayout(filter);
        return;
    }
    changeLayout(mainTaskArray);
})

//фильтрация по статусу
searchStatus.addEventListener("input", (event) => {
    const { value } = event.target;
    if (value === "Status") {
        changeLayout(mainTaskArray);
        return;
    }
    const filter = mainTaskArray.filter(item => item.status === value);
    changeLayout(filter);
});

//изменение имени при двойном клике
listBox.addEventListener('dblclick', (event) => {
    if(event.target.classList.contains("name-field")){
        const { id } = event.target;
        event.target.classList.add('none');
        const inputField = document.getElementById(`${id}-input`);
        inputField.classList.remove('none');
        inputField.focus();

        inputField.addEventListener("blur", changeInput);

        inputField.addEventListener('keydown', (event) => {
            if(event.key === 'Enter'){
                changeInput();
            }
        });

        function changeInput(){
            const number = parseInt(id, 10);
            if(inputField.value !== ''){

                mainTaskArray[number-1].name = inputField.value;
                event.target.innerText = inputField.value;

            }
            event.target.classList.remove('none');
            inputField.classList.add('none');            
            console.log(mainTaskArray);
        }

    }
});

