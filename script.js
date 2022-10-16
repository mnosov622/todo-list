const form = document.querySelector(".main__form");
const input = document.querySelector(".main__add-input");
const list = document.querySelector(".main__list");
const totalTasks = document.querySelector(".main__list-total");
const errorMsg = document.querySelector(".main__error-msg");
const tasksList = document.querySelector(".main__tasks-list");
const dateHolder = document.querySelector(".header__date");
const date = new Date();
let darkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
if (darkMode == true) {
    document.body.classList.toggle("dark-mode");
    document.getElementById("toggle-off").style.display = "none";
    document.getElementById("toggle-on").style.display = "block";
}
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const day = date.getDate();
const year = date.getFullYear();
const monthName = months[date.getMonth()];
dateHolder.innerHTML = ` Today is ${day} ${monthName}, ${year}`;

form.addEventListener("submit", (e) => handleAdd(e));
input.addEventListener("keyup", () => removeErrorMessage());

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
totalTasks.innerText = tasks.length;

if (tasks.length > 0) {
    tasks.forEach((task) => {
        const addedItem = document.createElement("li");
        addedItem.className = "main__list-item";
        addedItem.style.padding = "10px";
        addedItem.innerText = task;
        tasksList.appendChild(addedItem);
        list.append(tasksList);
    });
} else {
    list.style.display = "none";
}

function handleAdd(e) {
    e.preventDefault();
    createItem();
    input.value = "";
}

function createItem() {
    if (input.value.trim() === "") {
        errorMsg.innerText = "Please write your task";
    } else {
        list.style.display = "block";
        const item = document.createElement("li");
        item.className = "main__list-item";
        item.style.padding = "10px";
        item.innerText = input.value;

        tasksList.prepend(item);
        list.append(tasksList);

        tasks.push(input.value);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        totalTasks.innerText = tasks.length;
    }
    markAsComplete();
}
document.addEventListener("keydown", (event) => {
    if (event.shiftKey) {
        const itemsList = document.querySelectorAll(".main__list-item");
        var first_ = itemsList[0];
        var Last = itemsList[itemsList.length - 1];
        itemsList.forEach((item) => {
            if (item == first_) {
                item.addEventListener("click", () => {
                    itemsList.forEach((i) => {
                        if (i == Last) {
                            i.addEventListener("click", () => {
                                itemsList.forEach((j) => {
                                    j.classList.add("remove");
                                    const icon = document.createElement("img");
                                    icon.src = "./src/img/check.png";
                                    icon.className = "add-icon";
                                    j.appendChild(icon);
                                });
                            });
                        }
                    });
                });
            }
        });
    }
});
function markAsComplete() {
    const itemsList = document.querySelectorAll(".main__list-item");
    itemsList.forEach((item) => {
        item.addEventListener("click", () => {
            item.classList.add("remove");
            const icon = document.createElement("img");
            icon.src = "./src/img/check.png";
            icon.className = "add-icon";
            item.appendChild(icon);
            tasks = tasks.filter((task) => task !== item.textContent);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            totalTasks.innerText = tasks.length;
        });
        item.addEventListener("transitionend", () => {
            if (item.classList.contains("remove")) {
                item.remove();
            }
        });
    });
}

markAsComplete();

function removeErrorMessage() {
    errorMsg.innerText = "";
}

// Dark Mode Function
function myFunction() {
    document.body.classList.toggle("dark-mode");
    if (darkMode == false) {
        document.getElementById("toggle-off").style.display = "none";
        document.getElementById("toggle-on").style.display = "block";
        darkMode = true;
    } else {
        document.getElementById("toggle-on").style.display = "none";
        document.getElementById("toggle-off").style.display = "block";
        darkMode = false;
    }
}
