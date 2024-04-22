const taskInput = document.querySelector('.list__input');
const taskBtn = document.querySelector('.add__task__btn');
const taskList = document.querySelector('.list');

function createLi() {
    const li = document.createElement('li');
    return li;
};

taskInput.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
      if (!taskInput.value) return;
      createTask(taskInput.value);
    }
});

function clearInput() {
    taskInput.value = '';
    taskInput.focus();
};

function createRemoveBtn(li) {
    li.innerText += '  ';
    const removeBtn = document.createElement('button');
  
    removeBtn.innerText = 'Apagar tarefa';
    removeBtn.setAttribute('class', 'remove__btn');
    removeBtn.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(removeBtn);
};

function createTask(inputText) {
    const liTask = createLi();
  
    liTask.innerText = inputText;
    taskList.appendChild(liTask);
    clearInput();
    createRemoveBtn(liTask);
    saveTasks();
};

taskBtn.addEventListener('click', function() {
    if (!taskInput.value) return;
    createTask(taskInput.value);
  });
  
  document.addEventListener('click', function(e) {
    const el = e.target;
  
    if (el.classList.contains('remove__btn')) {
      el.parentElement.remove();
      saveTasks();
    }
});

function saveTasks() {
    const liTasks = taskList.querySelectorAll('li');
    const toDoList = [];
  
    for (let task of liTasks) {
      let taskText = task.innerText;
      taskText = taskText.replace('Apagar tarefa', '').trim();
      toDoList.push(taskText);
    }
  
    const tasksJson = JSON.stringify(toDoList);
    localStorage.setItem('tasks', tasksJson);
};
  
  function addSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    const litsOfTasks = JSON.parse(tasks);
  
    for (let task of litsOfTasks) {
      createTask(task);
    }
};
  
addSavedTasks();
