 document.addEventListener('DOMContentLoaded', () => {
      const taskInput = document.getElementById('taskInput');
      const taskList = document.getElementById('taskList');

      // Retrieve tasks from local storage if available
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

      // Function to render tasks
      const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
          const li = document.createElement('li');
          li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div class="actions">
              <button class="complete" onclick="toggleCompletion(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
              <button class="edit" onclick="editTask(${index})">Edit</button>
              <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
          `;
          taskList.appendChild(li);
        });
      };
        const addTask = () => {
        const text = taskInput.value.trim();
        if (text !== '') {
          tasks.push({ text, completed: false });
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
          taskInput.value = '';
        }
      };
       const deleteTask = (index) => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      };
       const toggleCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      };
      renderTasks();
       taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          addTask();
        }
      });
});   