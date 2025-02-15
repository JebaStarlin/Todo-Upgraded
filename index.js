const tabs = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');
const today = new Date().toISOString().split('T')[0];
const date = document.getElementById('todo-date');
date.value=new Date().toISOString().split('T')[0];

tabs.forEach((tab,i)=>{
    tab.addEventListener('click', ()=>{
        tabs.forEach(tab =>{
            tab.classList.remove('active');
        })
        tab.classList.add('active');
        contents.forEach(content =>{
            content.classList.remove('active')
        })
        contents[i].classList.add('active')
    })
})


let todos =[]
let count = todos.length+1;
render()
function render(){
    renderTodo();
    renderTodoDone();
    renderPendingTodos();
}

function renderTodo(){
    const todoContainer = document.getElementById('todos')
    todoContainer.innerHTML=''
    todos.forEach((todo,index) =>{
        if(!todo.isDone){
            const row = document.createElement('div')
            row.classList.add('row')
            const div = document.createElement('div')
            div.classList.add('row')
            const id = document.createElement('p')
            const todoName = document.createElement('p')
            id.innerText = ++index+") "
            todoName.innerText = todo.name
            div.appendChild(id);
            div.appendChild(todoName)
            const date = document.createElement('p')
            date.innerText= todo.date
            const done = document.createElement('button')
            done.innerText = 'done'
            done.addEventListener('click',()=>setDone(todo.id))
            row.appendChild(div)
            row.appendChild(date)
            row.appendChild(done)
            todoContainer.appendChild(row)
        }        
    })
    console.log(todos);
}

function renderTodoDone(){
    const todoDoneContainer = document.getElementById('todo-done')
    todoDoneContainer.innerHTML=''
    todos.forEach((todo,index) =>{
        if(todo.isDone){
            const row = document.createElement('div')
            row.classList.add('row')
            const div = document.createElement('div')
            div.classList.add('row')
            const id = document.createElement('p')
            const todoName = document.createElement('p')
            id.innerText = ++index+") "
            todoName.innerText = todo.name
            div.appendChild(id);
            div.appendChild(todoName)
            const date = document.createElement('p')
            date.innerText= todo.date
            const done = document.createElement('button')
            done.innerText = 'done'
            done.addEventListener('click',()=>setDone(todo.id))
            row.appendChild(div)
            row.appendChild(date)
            row.appendChild(done)
            todoDoneContainer.appendChild(row)
        }
    })
}

function renderPendingTodos(){
    console.log("in");
    
    const todoPending = document.getElementById('todo-pending')
    todoPending.innerHTML=''
    todos.forEach((todo,index) =>{
        
        if(new Date(todo.date)<Date.now()){
            const row = document.createElement('div')
            row.classList.add('row')
            const div = document.createElement('div')
            div.classList.add('row')
            const id = document.createElement('p')
            const todoName = document.createElement('p')
            id.innerText = ++index+") "
            todoName.innerText = todo.name
            div.appendChild(id);
            div.appendChild(todoName)
            const date = document.createElement('p')
            date.innerText= todo.date
            const done = document.createElement('button')
            done.innerText = 'done'
            done.addEventListener('click',()=>setDone(todo.id))
            row.appendChild(div)
            row.appendChild(date)
            row.appendChild(done)
            todoPending.appendChild(row)
        }
    })
}

function addTodo(event){
    event.preventDefault();
    todoName = document.getElementById('todo-input').value;
    todoDate = document.getElementById('todo-date').value;
    todos.push({
        id: count++,
        name:todoName,
        date: todoDate ,
        isDone: false
    })
    document.getElementById('todo-input').value="";
    document.getElementById('todo-date').value=new Date().toISOString().split('T')[0];
    render();
}

function deleteTodo(id){
    console.log("id",id);
    todos=todos.filter(todo =>{
        return todo.id != id;
    })
    
    render();
}

function setDone(id){
    todos.forEach(todo =>{
        if(todo.id==id){
            todo.isDone = true;
        }
    })
    render();
}