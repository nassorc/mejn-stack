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

async function main() {
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

}

main()
// var newValue;

// document.querySelector('.btn-todo').addEventListener('click', () => {
//     const input = document.querySelector('.todo').value
//     let todoList = document.querySelector('.todo-items')
//     let result = `<li class="todo-item"><span>${input}</span> <button class="btn-remove">remove</button><button class="btn-edit">edit</button></li>`

//     todoList.innerHTML += result
//     addEventRemove()
//     addToDatabase(input)
// })

// function addEventEdit() {
//     const editButtons = [...document.querySelectorAll('.btn-edit')]
//     editButtons.forEach(button => {
//         const parent = button.parentNode
//         button.onclick = () => {
//             promptNewValue(parent, async (o, n) => {
//                 const res = await fetch('http://localhost:13371/api/modify', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         o,
//                         n,
//                     }),
//                 })
//                 const data = await res.json()
//                 console.log(data)
//             })
//         }
//     })
    
// }

// function promptNewValue(element, callback) {
//     const oldValue = element.querySelector('span').innerHTML
//     let newValue
//     const input = window.prompt('Enter new Todo')
//     if (!input) {
//         return
//     }
//     newValue = input
//     element.querySelector('span').innerHTML = input
    
//     callback(oldValue, newValue)
// }

// function addEventRemove() {
//     const removeButtons = [...document.querySelectorAll('.btn-remove')]
//     removeButtons.forEach(button => {
//         button.addEventListener('click', async (e) => {
//             const parent = e.target.parentNode
//             const record = parent.querySelector('span').innerHTML
//             parent.remove()
//             const res = await fetch('http://localhost:13371/api/delete', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     record
//                 }),
//             })
//             const data = await res.json()
//             console.log(data)
//         })
//     })
// }
// async function addToDatabase(record){
//     console.log('working')
//     try{
//         const res = await fetch('http://localhost:13371/api/create', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 record
//             }),
//         })
//         const data = await res.json()
//         console.log(data)
//     } catch(err) {
//         console.log(err)
//     }
    
// }



// function addDataToDom(records){
//     records.forEach(record => {
//         console.log(record)
//         let todoList = document.querySelector('.todo-items')
//         let result = `<li class="todo-item"><span>${record.record}</span> <button class="btn-remove">remove</button><button class="btn-edit">edit</button></li>`

//         todoList.innerHTML += result
//         addEventRemove()
//         addEventEdit()
        
//     })
// }

// async function loadDataa() {
//     const res = await fetch('http://localhost:13371/api/get')
//     const data = await res.json()
//     addDataToDom(data)
// }

// function main(){
//     loadDataa()
//     addEventRemove()
//     addEventEdit()
    
// }

// document.addEventListener('DOMContentLoaded', () => main)


