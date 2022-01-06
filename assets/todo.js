var newValue;

document.querySelector('.btn-todo').addEventListener('click', () => {
    const input = document.querySelector('.todo').value
    let todoList = document.querySelector('.todo-items')
    let result = `<li class="todo-item"><span>${input}</span> <button class="btn-remove">remove</button><button class="btn-edit">edit</button></li>`

    todoList.innerHTML += result
    addEventRemove()
    addToDatabase(input)
})

function addEventEdit() {
    const editButtons = [...document.querySelectorAll('.btn-edit')]
    editButtons.forEach(button => {
        const parent = button.parentNode
        button.onclick = () => {
            promptNewValue(parent, async (o, n) => {
                const res = await fetch('http://localhost:13371/api/modify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        o,
                        n,
                    }),
                })
                const data = await res.json()
                console.log(data)
            })
        }
    })
    
}

function promptNewValue(element, callback) {
    const oldValue = element.querySelector('span').innerHTML
    let newValue
    const input = window.prompt('Enter new Todo')
    if (!input) {
        return
    }
    newValue = input
    element.querySelector('span').innerHTML = input
    
    callback(oldValue, newValue)
}

function addEventRemove() {
    const removeButtons = [...document.querySelectorAll('.btn-remove')]
    removeButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const parent = e.target.parentNode
            const record = parent.querySelector('span').innerHTML
            parent.remove()
            const res = await fetch('http://localhost:13371/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    record
                }),
            })
            const data = await res.json()
            console.log(data)
        })
    })
}
async function addToDatabase(record){
    console.log('working')
    try{
        const res = await fetch('http://localhost:13371/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                record
            }),
        })
        const data = await res.json()
        console.log(data)
    } catch(err) {
        console.log(err)
    }
    
}



function addDataToDom(records){
    records.forEach(record => {
        console.log(record)
        let todoList = document.querySelector('.todo-items')
        let result = `<li class="todo-item"><span>${record.record}</span> <button class="btn-remove">remove</button><button class="btn-edit">edit</button></li>`

        todoList.innerHTML += result
        addEventRemove()
        addEventEdit()
        
    })
}

async function loadData() {
    const res = await fetch('http://localhost:13371/api/get')
    const data = await res.json()
    addDataToDom(data)
}

function main(){
    loadData()
    addEventRemove()
    addEventEdit()
    
}

document.addEventListener('DOMContentLoaded', () => main)



