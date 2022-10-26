const form = document.querySelector('.main__form');
const input = document.querySelector('.main__add-input');
const list = document.querySelector('.main__list');
const totalTasks = document.querySelector('.main__list-total');
const errorMsg = document.querySelector('.main__error-msg');
const delBtn = document.querySelector(".delBtn");
const tasksList = document.querySelector('.main__tasks-list');
const dateHolder = document.querySelector('.header__date');
const date = new Date();
let darkMode = false;

const months = [
    "January", "February", 
    "March", "April", "May", 
    "June", "July", "August",
    "September", "October", 
    "November", "December"
];

const day = date.getDate();
const year = date.getFullYear();
const monthName = months[date.getMonth()];
dateHolder.innerHTML = ` Today is ${day} ${monthName}, ${year}`;

form.addEventListener("submit", (e) => handleAdd(e));
input.addEventListener("keyup", () => removeErrorMessage());
delBtn.addEventListener("click", () => deleteAllItem());
delBtn.style.display = "none";


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
totalTasks.innerText = tasks.length;
if (tasks.length > 0) {
    delBtn.style.display = "block";
    tasks.forEach((task) => {
        // const addedItem = document.createElement("li");
        // addedItem.className = "main__list-item";
        // addedItem.style.padding = "10px";
        // addedItem.innerText = task;
        // tasksList.appendChild(addedItem);
        // list.append(tasksList);
        // console.log(addedItem);
        tasksList.innerHTML =
        `<div class="main__list-item">
        <div class="task_content">${task}</div>
        <div>
            <img class="delete_task" src="./src/img/bin.png">
            <img class="check hide " src="./src/img/check.png">
        </div>
        

    </div>` +tasksList.innerHTML;
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
        tasksList.innerHTML =
        `<div class="main__list-item">
            <div class="task_content">${input.value}</div>
            <div>
                <img class="delete_task" src="./src/img/bin.png">
                <img class="check hide " src="./src/img/check.png">
            </div>
         </div>` +tasksList.innerHTML;
        list.append(tasksList);
        tasks.push(input.value);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        totalTasks.innerText = tasks.length;
        if(tasks.length > 0) {
            delBtn.style.display = "block";
        }
    }
    markAsComplete();
}
document.addEventListener('keydown', (event) => {
    if (event.shiftKey) {
        const itemsList = document.querySelectorAll(".main__list-item");
        var first_ = itemsList[0];
        var Last = itemsList[itemsList.length - 1];
        itemsList.forEach((item) => {
            if (item == first_) {
                item.addEventListener("click", () => {
                    itemsList.forEach((i) => {
                        if (i == Last){
                            i.addEventListener("click", ()=>{
                                itemsList.forEach((j)=>{
                                    j.classList.add("remove");
                                    const icon = document.createElement("img");
                                    icon.src = "./src/img/check.png";
                                    icon.className = "add-icon";
                                    j.appendChild(icon);
                                })
                            })
                        }
                    })

                })
            }
        });
    }
});
function markAsComplete () {
    const itemsList = document.querySelectorAll(".main__list-item");
    itemsList.forEach((item) => {
        const deleteTask = item.querySelector(".delete_task");
        deleteTask.addEventListener("click" , ()=>{
            (deleteTask.parentElement.parentElement.parentElement.removeChild(deleteTask.parentElement.parentElement));
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            totalTasks.innerText = tasks.length;
            let t = [];
            if (tasks.length > 0) {
                let cmp = item.querySelector(".task_content" ).innerHTML;
                for(var i = 0 ; i < tasks.length ; i++){
                    if(cmp === tasks[i]){
                     
                    }else{
                        t.push(tasks[i]);
                    }
                }
            }
            tasks.push(input.value);
            localStorage.setItem("tasks", JSON.stringify(t));
        })
        item.addEventListener("click", () => {
            const curr = item.querySelector(".check");
            const curr2 = item.querySelector(".task_content");
            curr2.classList.contains("remove")?curr2.classList.remove("remove"):curr2.classList.add("remove");
            curr.classList.contains("hide")?curr.classList.remove("hide"):curr.classList.add("hide");
        });
    });
}



function deleteAllItem() {
    alert("Delete all the tasks?");
    localStorage.clear();
    location.reload();
}

markAsComplete();

function removeErrorMessage() {
    errorMsg.innerText = "";
}


// Dark Mode Function
function myFunction() {
    document.body.classList.toggle("dark-mode");
    if (darkMode ==false) {
        document.getElementById("toggle-off").style.display = "none";
        document.getElementById("toggle-on").style.display = "block";
        darkMode=true;
    }
    else {
        document.getElementById("toggle-on").style.display = "none";
        document.getElementById("toggle-off").style.display = "block";
        darkMode=false;
    }
}

