const addTaskBtn = document.getElementById("addTaskBtn");
const taskForm = document.getElementById("taskForm");

const saveTaskBtn = document.getElementById("saveTaskBtn");
const subjectInput = document.getElementById("subjectInput");
const taskInput = document.getElementById("taskInput");

const taskSection = document.querySelector(".task-section");
const progressText = document.getElementById("progressText");


// Show Task Form
addTaskBtn.addEventListener("click", function () {
    taskForm.style.display = "block";
});


// Update Progress
function updateProgress() {

    const tasks = document.querySelectorAll(".task-checkbox");
    const completedTasks = document.querySelectorAll(
        ".task-checkbox:checked"
    );

    if (tasks.length === 0) {
        progressText.textContent = "Completed: 0%";
        return;
    }

    const percentage = Math.round(
        (completedTasks.length / tasks.length) * 100
    );

    progressText.textContent = "Completed: " + percentage + "%";
}


// Save Task
saveTaskBtn.addEventListener("click", function () {

    const subject = subjectInput.value.trim();
    const task = taskInput.value.trim();

    if (subject === "" || task === "") {
        alert("Please enter subject and task.");
        return;
    }

    // Create Task Card
    const taskCard = document.createElement("div");

    taskCard.classList.add("task-card");

    taskCard.innerHTML = `
        <h3>${subject}</h3>
        <p>${task}</p>
        <input type="checkbox" class="task-checkbox">
        <button class="delete-btn">🗑️ Delete</button>
    `;

    // Add task to page
    taskSection.appendChild(taskCard);

    // Clear inputs
    subjectInput.value = "";
    taskInput.value = "";

    // Hide form
    taskForm.style.display = "none";

    updateProgress();

    // Save task in localStorage
    saveTasks();
});


// Complete Task
document.addEventListener("change", function (event) {

    if (event.target.classList.contains("task-checkbox")) {

        const taskCard = event.target.closest(".task-card");

        if (event.target.checked) {
            taskCard.classList.add("completed-task");
        } else {
            taskCard.classList.remove("completed-task");
        }

        updateProgress();
        saveTasks();
    }

});


document.addEventListener("click", function (event) {

    const deleteButton = event.target.closest(".delete-btn");

    if (deleteButton) {

        const taskCard = deleteButton.closest(".task-card");

        if (taskCard) {
            taskCard.remove();

            updateProgress();
            saveTasks();
        }
    }

});

// Save all tasks
function saveTasks() {

    const tasks = [];

    document.querySelectorAll(".task-card").forEach(function (taskCard) {

        const subject = taskCard.querySelector("h3").textContent;
        const task = taskCard.querySelector("p").textContent;
        const completed = taskCard.querySelector(".task-checkbox").checked;

        tasks.push({
            subject: subject,
            task: task,
            completed: completed
        });

    });

    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

// Load saved tasks
function loadTasks() {

    const savedTasks = localStorage.getItem("studyTasks");

    if (savedTasks === null) {
        return;
    }

    const tasks = JSON.parse(savedTasks);

    // Remove old HTML tasks
    document.querySelectorAll(".task-card").forEach(function (taskCard) {
        taskCard.remove();
    });

    // Add saved tasks
    tasks.forEach(function (taskData) {

        const taskCard = document.createElement("div");

        taskCard.classList.add("task-card");

        taskCard.innerHTML = `
            <h3>${taskData.subject}</h3>
            <p>${taskData.task}</p>
            <input type="checkbox" class="task-checkbox">
            <button class="delete-btn">🗑️ Delete</button>
        `;

        const checkbox = taskCard.querySelector(".task-checkbox");

        if (taskData.completed) {
            checkbox.checked = true;
            taskCard.classList.add("completed-task");
        }

        taskSection.appendChild(taskCard);
    });

    updateProgress();
}


// Load tasks when page starts
loadTasks();