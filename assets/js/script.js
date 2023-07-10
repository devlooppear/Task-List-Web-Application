const addBtn = document.querySelector('#add-btn');

function addTask() {
  const taskTitle = document.querySelector('#task-title').value;

  if (taskTitle) {
    const template = document.querySelector('.template');
    const newTask = template.cloneNode(true);
    newTask.querySelector('.task-title').textContent = taskTitle;
    newTask.classList.remove('template');
    newTask.classList.remove('hide');

    const list = document.querySelector('#task-list');
    list.appendChild(newTask);

    const removeBtn = newTask.querySelector('.remove-btn');
    removeBtn.addEventListener('click', function() {
      removeTask(newTask);
    });

    const doneBtn = newTask.querySelector('.done-btn');
    doneBtn.addEventListener('click', function() {
      completeTask(newTask);
    });

    document.querySelector('#task-title').value = '';

    // Store task in localStorage
    storeTask(taskTitle);
  }
}

function storeTask(taskTitle) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ title: taskTitle, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskElement) {
  const list = document.querySelector('#task-list');
  list.removeChild(taskElement);
  const taskTitle = taskElement.querySelector('.task-title').textContent;
  updateStoredTasks(taskTitle, 'remove');
}

function completeTask(taskElement) {
  taskElement.classList.toggle('done');
  const taskTitle = taskElement.querySelector('.task-title').textContent;
  const completed = taskElement.classList.contains('done');
  updateStoredTasks(taskTitle, 'complete', completed);
}

function updateStoredTasks(taskTitle, action, completed = false) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (action === 'remove') {
    tasks = tasks.filter(task => task.title !== taskTitle);
  } else if (action === 'complete') {
    const index = tasks.findIndex(task => task.title === taskTitle);
    if (index !== -1) {
      tasks[index].completed = completed;
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => {
    addTaskToList(task.title, task.completed);
  });
}

function addTaskToList(taskTitle, completed = false) {
  const template = document.querySelector('.template');
  const newTask = template.cloneNode(true);
  newTask.querySelector('.task-title').textContent = taskTitle;
  newTask.classList.remove('template');
  newTask.classList.remove('hide');

  if (completed) {
    newTask.classList.add('done');
  }

  const list = document.querySelector('#task-list');
  list.appendChild(newTask);

  const removeBtn = newTask.querySelector('.remove-btn');
  removeBtn.addEventListener('click', function() {
    removeTask(newTask);
  });

  const doneBtn = newTask.querySelector('.done-btn');
  doneBtn.addEventListener('click', function() {
    completeTask(newTask);
  });
}

// Add event listener to the add button
addBtn.addEventListener('click', function(e) {
  e.preventDefault();
  addTask();
});

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);
