const namefield = document.getElementById('name');
const textholder = document.getElementById('textholder');
const statusPosition = document.getElementById('status');
const addBtn = document.getElementById('add-task');
const deleteBtn = document.getElementById('delete-task');

const ul = document.querySelector('ul');

let taskArray = [];

addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    taskArray.push({name: namefield.value, discription: textholder.value, status: statusPosition.value});
    const li = `<li>
                        <div class="text-part">
                            <p>${namefield.value}</p>
                            <p>${textholder.value}</p>
                            <p class="status-text">${statusPosition.value}</p>
                        </div>
                        <button>Delete</button>
                    </li>`;
    ul.innerHTML += li;
});

deleteBtn.addEventListener('click', (event) => {
    event.preventDefault();

})