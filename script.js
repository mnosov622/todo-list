const form = document.querySelector('.main__form');
const input = document.querySelector('.main__add-input');
const list = document.querySelector('.main__list');
const errorMsg = document.querySelector('.main__error-msg');
const tasksList = document.querySelector('.main__tasks-list');

form.addEventListener('submit', (e) => handleAdd(e));
input.addEventListener('keyup', () => removeErrorMessage());

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if(tasks.length > 0) {
    tasks.forEach(task => {
        const addedItem = document.createElement('li');
        addedItem.className = "main__list-item";
        addedItem.style.padding = "10px";
        addedItem.innerText = task;
        tasksList.appendChild(addedItem);
        list.append(tasksList);
        console.log(addedItem);
    })

}

else {
    list.style.display = "none"
}

listOfTasks.forEach(task => {
    const tasks = document.querySelector('.main__tasks');
    const item = document.createElement('li');
    item.className = "main__list-item";
    item.style.padding = "10px";
    item.innerText = task;
    tasks.appendChild(item);
    list.append(tasks);
})

function handleAdd(e) {
    e.preventDefault();
    createItem();
    input.value = "";
}

function createItem() {
    if(input.value.trim() === '') {
        errorMsg.innerText = "Please write your task";
    }

    else {
        list.style.display = "block";
        const item = document.createElement('li');
        item.className = "main__list-item";
        item.style.padding = "10px";
        item.innerText = input.value;

        tasksList.appendChild(item);
        list.append(tasksList);

        tasks.push(input.value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const items = document.querySelectorAll('.main__list-item')
        items.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.add("remove");
                const icon = document.createElement('img');
                icon.src = "./src/img/check.png";
                icon.className = "add-icon";
                item.appendChild(icon);
            });
        }); 

}

function removeErrorMessage() {
    errorMsg.innerText = "";
}
