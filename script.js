// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Function to add a task
    function addTask(taskText, save = true) {
        // Retrieve the task text from the input field, trim any extra spaces
        const trimmedTaskText = taskInput.value.trim();

        // If taskText is empty, alert the user
        if (trimmedTaskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new <li> element for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = trimmedTaskText;

        // Create a "Remove" button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add an event listener to the remove button to remove the task
        removeButton.addEventListener('click', function() {
            taskList.removeChild(taskItem);
            // Remove the task from Local Storage after removal from DOM
            removeTaskFromLocalStorage(trimmedTaskText);
        });

        // Append the remove button to the task item
        taskItem.appendChild(removeButton);

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Clear the input field after adding the task
        taskInput.value = '';

        // If save is true, save the new task to Local Storage
        if (save) {
            saveTaskToLocalStorage(trimmedTaskText);
        }
    }

    // Function to save task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false means do not save again to Local Storage
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', function() {
        addTask(taskInput.value); // Use trimmed value to add task
    });

    // Event listener for pressing the "Enter" key to add a task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value); // Use trimmed value to add task
        }
    });

});
