class Task {

constructor(title, description, priority, category){

this.id = Date.now();
this.title = title;
this.description = description;
this.priority = priority;
this.category = category;
this.completed = false;

}

}

class TaskManager{

constructor(){
this.tasks=[];
}

addTask(task){
this.tasks.push(task);
}

deleteTask(id){
this.tasks=this.tasks.filter(task=>task.id!==id);
}

toggleComplete(id){

this.tasks.forEach(task=>{

if(task.id===id){
task.completed=!task.completed;
}

});

}

updateTask(id,title,desc,priority,category){

this.tasks.forEach(task=>{

if(task.id===id){

task.title=title;
task.description=desc;
task.priority=priority;
task.category=category;

}

});

}

filterByCategory(category){

if(category==="all") return this.tasks;

return this.tasks.filter(task=>task.category===category);

}

searchTasks(keyword){

return this.tasks.filter(task=>

task.title.toLowerCase().includes(keyword.toLowerCase()) ||
task.description.toLowerCase().includes(keyword.toLowerCase())

);

}

}

const manager = new TaskManager();

const taskList = document.getElementById("taskList");
const notification = document.getElementById("notification");

function showNotification(msg){

notification.innerText = msg;

notification.style.display="block";

setTimeout(()=>{
notification.style.display="none";
},4000);

}

function renderTasks(tasks){

taskList.innerHTML="";

tasks.forEach(task=>{

const li=document.createElement("li");

if(task.completed){
li.classList.add("completed");
}

li.innerHTML=`

<strong>${task.title}</strong>

<p>${task.description}</p>

Priority: ${task.priority}

Category: ${task.category}

<br>

<button onclick="completeTask(${task.id})">Complete</button>

<button onclick="editTask(${task.id})">Edit</button>

<button onclick="deleteTask(${task.id})">Delete</button>

`;

taskList.appendChild(li);

});

}

document.getElementById("addTaskBtn").addEventListener("click",()=>{

const title=document.getElementById("title").value.trim();
const desc=document.getElementById("description").value.trim();
const priority=document.getElementById("priority").value;
const category=document.getElementById("category").value;

const errorMsg=document.getElementById("errorMsg");

if(title===""){

errorMsg.innerText="Task title cannot be empty";
return;

}

errorMsg.innerText="";

const task=new Task(title,desc,priority,category);

manager.addTask(task);

if(priority==="high"){
showNotification("High priority task added!");
}

renderTasks(manager.tasks);

});

function deleteTask(id){

manager.deleteTask(id);

renderTasks(manager.tasks);

}

function completeTask(id){

const task=manager.tasks.find(t=>t.id===id);

manager.toggleComplete(id);

if(task.priority==="high"){
showNotification("High priority task completed!");
}else{
showNotification("Task completed!");
}

renderTasks(manager.tasks);

}

function editTask(id){

const task=manager.tasks.find(t=>t.id===id);

const newTitle=prompt("Edit title",task.title);
const newDesc=prompt("Edit description",task.description);
const newPriority=prompt("Edit priority (low, medium, high)",task.priority);
const newCategory=prompt("Edit category",task.category);

if(newTitle===""){
alert("Title cannot be empty");
return;
}

manager.updateTask(id,newTitle,newDesc,newPriority,newCategory);

if(newPriority==="high"){
showNotification("High priority task updated!");
}

renderTasks(manager.tasks);

}

document.getElementById("filterCategory").addEventListener("change",(e)=>{

const filtered=manager.filterByCategory(e.target.value);

renderTasks(filtered);

});

document.getElementById("searchTask").addEventListener("keyup",(e)=>{

const results=manager.searchTasks(e.target.value);

renderTasks(results);

});

/* Theme Toggle */

const themeToggle=document.getElementById("themeToggle");

themeToggle.addEventListener("click",()=>{

if(document.body.classList.contains("light")){

document.body.classList.remove("light");
document.body.classList.add("dark");

}else{

document.body.classList.remove("dark");
document.body.classList.add("light");

}

});
