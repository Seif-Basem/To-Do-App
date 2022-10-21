let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if there id tasks in local storage: bcs there is a problem every time i reload the local storage became empty bcs the array is empty above
if (localStorage.getItem("tasks")) { //so if there is data in local add to array so in reload there will be data in array not empty array
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add task
submit.onclick = function () {
    if (input.vlaue !== "") {
        addTaskToArray(input.value); // Add Task To Array Of Tasks
        input.value = ""; // Empty Input Field
    }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
    //Delete Button
    if (e.target.classList.contains("del")) {
        //Remove taks From localstorage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //Remove Element From Page
        e.target.parentElement.remove();
    }
    //Task Element
    if (e.target.classList.contains("task")) {
        //Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        //Toggle Done Class
        e.target.classList.toggle("done"); //so when i toggle task it turn less opacity
    }
});

function addTaskToArray(taskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfTasks);
    // Add Tasks to Local Storage
    addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty Tasks Div
    tasksDiv.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
        // Create Main Div
        let div = document.createElement("div"); //made new element
        div.className = "task"; //give it class
        // Check If Task is Done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id); //give it id from the task object
        div.appendChild(document.createTextNode(task.title)); // made text and put it into div
        // Create Delete Button
        let span = document.createElement("span"); //THEN i made span to delete
        span.className = "del";// give it class
        span.appendChild(document.createTextNode("Delete")); //made text and put it into span
        // Append Btn to main div
        div.appendChild(span);
        // Add Task Div To Tasks Container
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks"); //get data from localstorage
    if (data) {
        let tasks = JSON.parse(data); //if it there turn it into text to put it into page
        addElementsToPageFrom(tasks); //the function that put data into page
    }
}

function deleteTaskWith(taskId) {
    //For Explain only
    // for (let i = 0; i < arrayOfTasks.length; i++) {
    //     console.log(`${arrayOfTasks[i].id} === ${taskId}`)
    // }
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        } // task if flase and i press it turn into true and vis vrsa
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}

// to make delete all btn
// window.localStorage.removeItem("tasks")
// tasksDiv.innerHTML = "";
deleteBtn = document.querySelector("button");
deleteBtn.onclick = function () {
    window.localStorage.removeItem("tasks")
    tasksDiv.innerHTML = "";
}