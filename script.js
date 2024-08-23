document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const filters = document.querySelectorAll('.filters button');

    let tasks = [];

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        tasks
            .filter(task => 
                filter === 'all' ? true : 
                filter === 'completed' ? task.completed : 
                !task.completed
            )
            .forEach((task, index) => {
                const li = document.createElement('li');
                li.className = task.completed ? 'completed' : '';
                li.innerHTML = `
                    <span>${task.name}</span>
                    <div>
                        <button onclick="editTask(${index})">Edit</button>
                        <button onclick="deleteTask(${index})">Delete</button>
                        <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
    };

    const addTask = () => {
        const taskName = taskInput.value.trim();
        if (taskName) {
            tasks.push({ name: taskName, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    };

    window.editTask = (index) => {
        const newName = prompt('Edit task', tasks[index].name);
        if (newName) {
            tasks[index].name = newName;
            renderTasks();
        }
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    filters.forEach(button => {
        button.addEventListener('click', () => {
            renderTasks(button.dataset.filter);
        });
    });

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTask();
    });

    renderTasks();
});
