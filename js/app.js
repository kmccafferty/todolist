//PROBLEM - User interaction doesn't work
//SOLUTION - Add Interactivity

var taskInput = document.getElementById("new-task"); 
var addButton = document.getElementsByTagName("button")[0]; 
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTaskHolder = document.getElementById("completed-tasks");


////////NEW TASK LIST ITEM/////////////////////////////////////////////

var createNewTaskElement = function(taskString){
  
  var listItem = document.createElement("li");  //new LI
  var checkBox = document.createElement("input");  //input checkbox
  var label = document.createElement("label");  //label
  var editInput = document.createElement("input"); //input {text}
  var editButton = document.createElement("button"); //edit button
  var deleteButton = document.createElement("button"); 
  
  //each element needs modifying
  
  checkBox.type = "checkbox"; 
	editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;
 
  //each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
}


//////ADD A NEW TASK///////////////////////////////////////////////////
//this takes the listItem returned in the function above

var addTask = function(){
  console.log("Add task...");
  
   //Create a new LI w/ text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  
  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  //Clear out input after button is pushed
  taskInput.value = "";
      
}
  
  
//Edit an existing task//////////////////////////////////////////////////

var editTask = function() {
  console.log("Edit task");
  
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  
  //Check to see if parent is in .editMode
  if (containsClass){
    
    //Switch from .editMode 
    //Label's text becomes the input's value
    label.innerText = editInput.value;
    
  } else {
    
    //Switch to .editMode
    //Input's value becomes the label's text
    editInput.value = label.innerText
  }
  
    //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");
  
}



//Delete existing task/////////////////////////////////////////////////

var deleteTask = function(){
  console.log("delete task");
  
  //Remove parent LI from UL
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  ul.removeChild(listItem);
  
}


//Mark task as complete////////////////////////////////////////////////

var taskCompleted = function() {
  console.log("complete task");
  
  //append task LI to the #completed-tasks
  var listItem = this.parentNode;
  completedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
  
}

//Mark task as incomplete////////////////////////////////////////////////

var taskIncomplete = function() {
  console.log("incomplete task");
  
  //append task LI to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
}


//BIND TASK EVENTS//////////////////////////////////////////////
//Selects necessary elements, binds event handlers to them
//Calls functions when those events happen.


var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("bind li events");
  
  //Select li's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
   //bind  editTask function to edit button
  editButton.onclick = editTask;
  
    //bind deleteTask function to delete button
  deleteButton.onclick = deleteTask;
  
    //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
  console.log("AJAX request");
  
}


//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);

//Set another click to perform an ajax request
addButton.addEventListener("click", ajaxRequest);


//Cycle over incompleteTaskHolder ul items
  //for each li, bind events to li children (taskcCompleted)
for (var i = 0; i < incompleteTaskHolder.children.length; i += 1){
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//Cyce over completedTaskHolder ul items
   //for each li
    //bind events to li children [taskIncomplete]
for (var i = 0; i < completedTaskHolder.children.length; i += 1){
  bindTaskEvents(completedTaskHolder.children[i],taskIncomplete);
}




/////Extras: change the edit button to "save" when it's in edit mode
///rather than "edit." Also prevent the thing from adding empty
//tasks into the to-do list.




