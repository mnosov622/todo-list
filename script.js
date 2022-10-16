const form = document.querySelector(".main__form");
const input = document.querySelector(".main__add-input");
const list = document.querySelector(".main__list");
const totalTasks = document.querySelector(".main__list-total");
const errorMsg = document.querySelector(".main__error-msg");
const tasksList = document.querySelector(".main__tasks-list");
const dateHolder = document.querySelector(".header__date");
const date = new Date();
let darkMode = false;

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

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
totalTasks.innerText = tasks.length;

function markTaskComplete(e) {
    const element = e.target;
    element.classList.add("remove");
    const icon = document.createElement("img");
    icon.src = "./src/img/check.png";
    icon.className = "add-icon";
    element.appendChild(icon);
}

function addTaskEntry(task) {
    // create task entry
    const taskEntry = document.createElement("li");
    taskEntry.className = "main__list-item";
    taskEntry.innerText = task;
    tasksList.appendChild(taskEntry);

    // attach click listener to the entry
    taskEntry.addEventListener("click", markTaskComplete);
}

if (tasks.length > 0) for (const task of tasks) addTaskEntry(task);
else list.style.display = "none";

function createItem() {
    if (input.value.trim() === "") {
        errorMsg.innerText = "Please write your task";
    } else {
        list.style.display = "block";
        addTaskEntry(input.value);
        tasks.push(input.value);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        totalTasks.innerText = tasks.length;
    }
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

function handleAdd(e) {
    e.preventDefault();
    createItem();
    input.value = "";
}

// INIT
form.addEventListener("submit", (e) => handleAdd(e));
input.addEventListener("keyup", () => removeErrorMessage());
input.focus();
