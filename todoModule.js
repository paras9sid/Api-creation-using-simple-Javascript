// creating/converting into IIFE function

var toDoListApp = (function () { // IIFE js module-- wrapping full code function into one -- function scope
    //api's creation in javascript--To do list app

    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log("working"); // to check whether code is working fine w/o errors


    //get request to fetch data only from particular source
    async function fetchTodos(){
        //GET request
        //  fetch("https://jsonplaceholder.typicode.com/todos")
        //  .then(function(response){
        //     // console.log(response);

        //     //returning response as json
        //     return response.json();

        //  }).then(function(data){
        //         // console.log(data);
        //         tasks = data.slice(0,10);
        //         renderList();
        //   })
        //   .catch(function(error){
        //     console.log('error',error);
        //   })

        //using async - await -- wriritng async before function for await to use properly w/o error

        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            const data = await response.json();
            tasks = data.slice(0,10);
            renderList();
        }catch(error){
            console.log('error',error);
        }


        
    }

    function addTaskToDom(task){
        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
            <label for = "${task.id}">${task.title}</label>
            <img src ="bin.svg" height="15" width="15" color="red" class="delete" data-id="${task.id}"/>
        `;

        tasksList.append(li);
    }

    function renderList(){
        tasksList.innerHTML = '';

        for(let i = 0;i<tasks.length;i++){
            addTaskToDom(tasks[i] );
        }

        tasksCounter.innerHTML = tasks.length;
    }

    function toggleTask(taskId){
        const task = tasks.filter(function(task){
            return task.id === Number(taskId)
        });

        if(task.length > 0){
                const currentTask = task[0];

                currentTask.completed = !currentTask.completed;
                renderList();
                showNotification('Task toggled successfully');
                return;
        }

        showNotification('Could not toggle task!!');

    }

    function deleteTask(taskId){
        const newTasks = tasks.filter( function(task) {
            return task.id !== Number(taskId)
        });

        tasks = newTasks;
        renderList();
        showNotification('Task deleted successfully!!');
    }


    function addTask(task){
        //example of post request for updation of data or sending new into array
        // if(task){
        //     fetch("https://jsonplaceholder.typicode.com/todos".{
        //         method:'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(task)
        //     })
        //     .then(function(response){
        //         return response.json();
        //     }).then(function(data){
        //         console.log(data);
        //         tasks.push(task);
        //         renderList();
        //         showNotification('Task added successfully');
        //     })
        //     .catch(function(error){
        //         console.log('error',error);
        //     })
        // }

        if(task){
            tasks.push(task);
            renderList();
            showNotification('Task added successfully');
            return;
        }
        showNotification('Task cant be added!');
    }

    function showNotification(text){
        alert(text);
    }


    function handleInputKeyPress(e){
        if(e.key === 'Enter'){
            const text = e.target.value;
            // console.log('text',text); // to check after entering text an dpress Enter text is adding or not

            if(!text){
                showNotification('Task text cant not be empty!');
                return;
            }

            const task = {
                title:text,
                id:Date.now(),
                completed:false
            }

            e.target.value = '';
            // askInput.addEventListener('keyup',handleInputKeyPress);

            addTask(task);
            // console.log('task',task); // to check task is added with text and its id
        }
    }

    function handleClickListener(e){
        const target = e.target;
        // console.log(target);

        if(target.className === 'delete'){ 
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;

        }else if(target.className ==='custom-checkbox'){
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
    }


    function initializeApp(){
        fetchTodos();
        addTaskInput.addEventListener('keyup',handleInputKeyPress);
        document.addEventListener('click',handleClickListener);
    }

    // initializeApp();

    //returning an object -- putting the funtions and everything in return which we have to make public
    return {
        initializeApp : initializeApp
    }

})() // last () = invoking function



