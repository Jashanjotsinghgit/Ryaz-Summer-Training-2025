let sideBar_list = document.querySelectorAll(".sideBar__btn");
let pendingTask_section = document.querySelector("#pendingTask");
let completedTask_section = document.querySelector("#completedTask");
let pendingTask_listItems = document.querySelectorAll(".pendingTask__listItem");
let pendingTask_list = document.querySelector(".pendingTask__list");
let completedTask_list = document.querySelector(".completedTask__list");
calc_n_pendingTasks();

function calc_n_pendingTasks() {
  let n = pendingTask_list.children.length;
  let pendingTasks = document.querySelector(".pendingTasks_length");

  if (n == 0)
    pendingTasks.innerHTML = `<i class="fa-regular fa-clock"></i>No pending Task`;
  else if (n == 1)
    pendingTasks.innerHTML = `<i class="fa-regular fa-clock"></i>${n} task`;
  else pendingTasks.innerHTML = `<i class="fa-regular fa-clock"></i>${n} tasks`;
  return n;
}

function calc_n_completedTasks() {
  let n = completedTask_list.children.length;
  let pendingTasks = document.querySelector(".completedTasks_length");

  if (n == 0)
    pendingTasks.innerHTML = `<i class="fa-regular fa-square-check"></i> None`;
  else if (n == 1)
    pendingTasks.innerHTML = `<i class="fa-regular fa-square-check"></i>${n} task`;
  else
    pendingTasks.innerHTML = `<i class="fa-regular fa-square-check"></i>${n} tasks`;
}
sideBar_list.forEach((item) => {
  item.addEventListener("click", () => {
    sideBar_list.forEach((item) => item.classList.remove("selected"));
    item.classList.add("selected");

    let val = item.dataset.return;
    console.log(val);
    if (val === "pendingTask" || val === "newTask") {
      pendingTask_section.style.display = "block";
      completedTask_section.style.display = "none";
      calc_n_pendingTasks();
    } else if (val === "completedTask") {
      pendingTask_section.style.display = "none";
      completedTask_section.style.display = "block";
      calc_n_completedTasks();
    }
  });
});

//Adding NewTask Functionality

function createListItem() {
  // Creation of Elements
  let item = document.createElement("li");
  item.classList.add("listItem", "pendingTask__listItem");
  let span1 = document.createElement("span");
  let input_checkbox = document.createElement("input");
  input_checkbox.type = "checkbox";
  input_checkbox.classList.add("pendingTask__checkbox");
  let input_heading = document.createElement("input");
  input_heading.type = "text";
  input_heading.classList.add("listItem_creation_input");
  let span2 = document.createElement("span");
  let btn1 = document.createElement("button");
  btn1.innerText = "Save";
  btn1.classList.add("listItem__btn", "saveBtn");
  let btn2 = document.createElement("button");
  btn2.innerText = "Remove";
  btn2.classList.add("listItem__btn", "deleteBtn");
  //Organising the structure
  span1.append(input_checkbox, input_heading);
  console.log(span1);
  span2.append(btn1, btn2);
  item.append(span1, span2);
  return item;
}

let newTaskBtn = document.querySelector("#newTask");
newTaskBtn.addEventListener("click", () => {
  if (document.querySelector(".listItem_creation_input")) {
    alert("Firstly Fill the Selected one");
  } else {
    item = createListItem();
    pendingTask_list.prepend(item);
  }
});

let rightSectionList = document.querySelectorAll(".right-section__list");
rightSectionList.forEach((rightlist) => {

  rightlist.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
      e.target.parentNode.parentNode.remove();
      calc_n_completedTasks();
      calc_n_pendingTasks();
    } else if (e.target.classList.contains("pendingTask__checkbox")) {
      if (e.target.checked) {
        e.target.nextElementSibling.style.textDecoration = "line-through";
      } else {
        e.target.nextElementSibling.style.textDecoration = "none";
      }
    } else if (e.target.classList.contains("doneBtn")) {
      let li = e.target.parentNode.parentNode;
      changePendingToCompleteted(li,true);
      calc_n_pendingTasks();
    } else if(e.target.classList.contains("saveBtn")){
        let inp_value = document.querySelector(".listItem_creation_input").value;
      console.log(inp_value);
      if (inp_value.trim() === "") {
        alert("Please Fill the Task Heading");
      } else {
        console.log(item);
        let h4 = document.createElement("h4");
        h4.innerText = inp_value;
        item.firstElementChild.children[1].remove();
        item.firstElementChild.append(h4);
        let btns = item.lastElementChild.children;
        btns[0].classList.remove("saveBtn");
        btns[0].innerText = "Done";
        btns[0].classList.add("doneBtn");
        btns[1].innerText = "Delete";
        calc_n_pendingTasks();
      }
    }

  });
});

function changePendingToCompleteted(item,bln) {
      item.classList.remove("pendingTask__listItem");
      item.classList.add("completedTask__listItem");
      let spans = item.children;
      for (let span of spans) {
        span.children[0].remove();
      }
      console.log(item);
      completedTask_list.append(item);
}

function saveToDone(){
    let saveBtns = document.querySelectorAll(".saveBtn")
    for(let btn of saveBtns){
        btn.classList.add("doneBtn");
        btn.classList.remove("saveBtn");
    }
}