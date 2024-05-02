const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

// Function to fetch tasks from the API and display them
async function fetchAndDisplayTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = ''; // Clear previous tasks

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = `
            <p>${task.title}</p>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        tasksContainer.appendChild(taskElement);
    });
}

// Function to add a new task
async function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    if (taskInput.trim() === '') return;

    const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
            title: taskInput,
            completed: false
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const newTask = await response.json();
    console.log('New task added:', newTask);
    fetchAndDisplayTasks(); // Refresh tasks list
}

// Function to edit an existing task
async function editTask(taskId) {
    const newTitle = prompt('Enter new task title:');
    if (!newTitle) return;

    const response = await fetch(`${apiUrl}/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: newTitle
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const updatedTask = await response.json();
    console.log('Task updated:', updatedTask);
    fetchAndDisplayTasks(); // Refresh tasks list
}

// Function to delete a task
async function deleteTask(taskId) {
    const response = await fetch(`${apiUrl}/${taskId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        console.log(`Task with ID ${taskId} deleted successfully`);
        fetchAndDisplayTasks(); // Refresh tasks list
    } else {
        console.error('Failed to delete task');
    }
}

// Initial fetch and display tasks
fetchAndDisplayTasks();
