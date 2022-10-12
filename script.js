const form = document.querySelector('.main__form');
const input = document.querySelector('.main__add-input');
const list = document.querySelector('.main__list');
const errorMsg = document.querySelector('.main__error-msg');

form.addEventListener('submit', (e) => handleAdd(e));
input.addEventListener('keyup', () => removeErrorMessage());

list.style.display = "none";

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
        const listHolder = document.createElement('ul');
        const item = document.createElement('li');
        item.className = "main__list-item";
        item.style.padding = "10px";
        item.innerText = input.value;
        listHolder.appendChild(item);
        list.append(listHolder);
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
