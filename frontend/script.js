const apiUrl = "http://localhost:5000/api/tasks";

// Fetch and display tasks
async function fetchTasks() {
    const res = await fetch(apiUrl);
    const tasks = await res.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    
    tasks.forEach(task => {
        taskList.innerHTML += `
            <li class="task" id="task-${task._id}">
                <div>
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                </div>
                <button class="edit-btn" onclick="editTask('${task._id}', '${task.title}', '${task.description}')">✏️ Edit</button>
                <button class="delete-btn" onclick="deleteTask('${task._id}')">❌ Delete</button>
            </li>
        `;
    });
}

// Add or update task
async function addOrUpdateTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDesc").value;
    const taskId = document.getElementById("taskId").value;

    if (!title.trim()) {
        alert("Task title cannot be empty!");
        return;
    }

    const method = taskId ? "PUT" : "POST";
    const url = taskId ? `${apiUrl}/${taskId}` : apiUrl;

    await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDesc").value = "";
    document.getElementById("taskId").value = "";
    document.getElementById("addTaskBtn").innerText = "➕ Add Task";
    fetchTasks();
}

// Populate input fields for editing
function editTask(id, title, description) {
    document.getElementById("taskTitle").value = title;
    document.getElementById("taskDesc").value = description;
    document.getElementById("taskId").value = id;
    document.getElementById("addTaskBtn").innerText = "✏️ Update Task";
}

// Delete a task
async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchTasks();
}

// Load tasks on page load
fetchTasks();
