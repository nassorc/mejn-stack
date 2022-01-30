class UI {
    async loadData(id) {
        try {
            const res = await fetch(`http://localhost:8080/api/user/${id}`)
            const data = await res.json()
            return data
        } catch(err) {
            console.log(err)
        }
    }
    todoEntity(elementClassName, items) {
        // Function returns the todo list DOM with the new items
        // receives the parent of the items as a class
        // gives each todo a id 
        
        let result = ''
        const todoListDOM = document.querySelector(`.${elementClassName}`)
   
        items.forEach(item => {
            result += `
            <li class="todo-group__body-item" data-todoId=${item.todoId}>
                <div class="comment">
                    <p>${item.record}</p>
                </div>
                <div class="owner">
                    Added by
                    <a href="">nassorc</a>
                </div>
                <button class="show-settings__button add-settings"><h4>. . .</h4></button>
                <div class="todo-group__body-item-settings setting hide">
                    <div class="delete-todo"><span>delete todo</span></div>
                    <div class="edit-todo"><span>edit todo</span></div>
                </div>
            </li>
            `
        })
        todoListDOM.innerHTML += result
    }

    todoAddInputFunction(addButtonClassName, inputClassName) {
        // pass a HTML class of todo-input to this function to add functionality.
        const addButton = document.querySelector(`.${addButtonClassName}`)
        
        addButton.addEventListener('click', async (e) => {
            // e.preventDefault()
            const inputValue = {todo: document.querySelector(`.${inputClassName}`).value}
          
           await fetch('http://localhost:8080/api/posts/user', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                    inputValue
               })
           })
           .then(res => {res.json()})
        })
    }

    todoShowSetting() {
        // div container must have a button.add-settings and
        // a div with a class set of setting and hide
        // function will toggle display none off and on with a classname of hide. use setting class to find div
        const settingButtons = [...document.querySelectorAll('button.add-settings')]
        settingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const liContainer = e.target.parentNode.parentNode
                const settingContainer = liContainer.querySelector('.setting')
                if(settingContainer.classList.contains('hide')) {
                    settingContainer.classList.remove('hide')
                } else {
                    settingContainer.classList.add('hide')

                }
                
            })
        })
    }

    deleteTodo(id) {
        // button must have delete-todo in class list
        const deleteButtons = [...document.querySelectorAll('.delete-todo')]
        // const li = [...document.querySelectorAll('li.todo-group__body-item')]
        // console.log(li)
        // li.forEach(item => {
        //     console.log(item.dataset.todoid)
        // })
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                document.location.reload(true)
                const todoId = e.target.parentNode.parentNode.dataset.todoid
                console.log(todoId)
                const res = await fetch(`http://localhost:8080/api/user/${id}/post/delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        todoId: todoId
                    })
                })
            })
        })
    }

}

class Storage {
    static parseCookie(cookie) {
        let todoList = []
        const cookies = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
        cookies.userId.split(',').forEach(todo => todoList.push(todo))
        return todoList
    }
}

class Timer {
    // main() {
    //     const startingMinutes = 10
    //     // we want to convert to seconds
    //     const time = startingMinutes * 60

    //     const timerElement = document.querySelector('.timer')
    //     setINterval(updateCountdown, 1000);

    // }
    // updateTimer() {
    //     // convert minutes to seconds 
    //     // floor to retreive lowest number without decimals
    //     const minutes = Math.floor(time/ 60)
    //     let seconds = time % 60
        //    seconds = seconds < 10 : '0' + seconds : seconds;
    //     timerElement.innerHtml = `${minutes}: ${seconds}`
    //     time--;
    // }
}

(async function main() {
    const ui = new UI
    // const todoList = Storage.parseCookie(document.cookie)
    const cookie = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
    const id = cookie.userIdFind
    
    ui.loadData(id)
    .then(todo => {
        // console.log(Object.values(todo))

        ui.todoEntity('todo-group__body', todo)
        ui.todoAddInputFunction('todo-add', 'todo-input')
        ui.todoShowSetting()
        ui.deleteTodo(id)
    })    

})()



