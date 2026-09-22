const addTaskBtn = document.getElementById("addTaskBtn");
const taskForm = document.getElementById("taskForm");

const saveTaskBtn = document.getElementById("saveTaskBtn");
const subjectInput = document.getElementById("subjectInput");
const taskInput = document.getElementById("taskInput");

const taskSection = document.querySelector(".task-section");


// Show Task Form
addTaskBtn.addEventListener("click", function () {
    taskForm.style.display = "block";
});


// Save Task
saveTaskBtn.addEventListener("click", function () {

    const subject = subjectInput.value;
    const task = taskInput.value;

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

    updateProgress();

    // Clear inputs
    subjectInput.value = "";
    taskInput.value = "";

    // Hide form
    taskForm.style.display = "none";
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
    }

});

// Update Progress
function updateProgress() {

    const tasks = document.querySelectorAll(".task-checkbox");
    const completedTasks = document.querySelectorAll(
        ".task-checkbox:checked"
    );

    if (tasks.length === 0) {
        document.getElementById("progressText").textContent =
            "Completed: 0%";
        return;
    }

    const percentage = Math.round(
        (completedTasks.length / tasks.length) * 100
    );

    document.getElementById("progressText").textContent =
        "Completed: " + percentage + "%";
}

// Delete Task
document.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete-btn")) {

        const taskCard = event.target.closest(".task-card");

        taskCard.remove();

        updateProgress();
    }

});