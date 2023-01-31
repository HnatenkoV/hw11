const todoList = document.getElementById('todo-list-wrapper');
const selectDiv = document.getElementById('selectDiv');
const toDoData = document.getElementsByClassName('todo-wrapper');
const arrLeft = document.getElementById('arr-left');
const arrRight = document.getElementById('arr-right');
const count = document.getElementById('cnt');

let currentPage = 1;
let urlPage = `https://rickandmortyapi.com/api/character?page=${currentPage}`;

let page = 1;

async function getCharacters(urlPage) {
    const response = await fetch(urlPage);
    const data = await response.json();
    console.log(data);

       data.results.map((element) => {
            todoList.innerHTML += `<section onclick="handlerListClick(event)" class = "todo-record-wrapper">
        <div class = "list-data-id"><p>"id": ${element.id}</p></div>
        <div class = "list-data-name"><p class ="name-person">"name": ${element.name}</p></div>
        <div class = "list-data-status"><p>"status" :${element.status}</p></div>
        <button class = "del-button" btn-name = "delete">Delete</button>
         </section>`;
         });
    // count.innerHTML = currentPage;
}

getCharacters(urlPage);

arrRight.addEventListener("click", () => {
    todoList.innerHTML = '';
    if (currentPage < 42) {
        currentPage++;
    }
    getCharacters(`https://rickandmortyapi.com/api/character?page=${currentPage}`);

    const urlParams = new URL(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
    const page = urlParams.searchParams.get('page');
    count.innerHTML = page;
});


arrLeft.addEventListener("click", () => {
    todoList.innerHTML = '';
    if (currentPage > 1) {
        currentPage--;
    }
    getCharacters(`https://rickandmortyapi.com/api/character?page=${currentPage}`);

    const urlParams = new URL(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
    const page = urlParams.searchParams.get('page');
    count.innerHTML = page;
});


const actionList = {
    delete: (element) => {
        element.remove();
    },
}


function handlerListClick(event) {
    const currentRecord = event.target;
    const action = event.target.getAttribute('btn-name');
    const personName = event.target.querySelectorAll("section div p.name-person")
    console.log(event)

    if (action in actionList) {
        actionList[action](currentRecord.parentElement);
    }

    const menuItem = document.querySelectorAll('.todo-record-wrapper');

    menuItem.forEach(item => {
        item.addEventListener('click', (e) => {
            menuItem.forEach(el => {
                el.classList.remove('active');
            });
            item.classList.add('active')

            selectDiv.textContent = item.querySelectorAll("section div p.name-person")[0].textContent;
        })
    })
}


function handledReturnClick(event) {
    // location.reload(); <= как вариант можно просто обновить страницу :)

    const sectionElem = document.querySelectorAll("section");

    if (sectionElem.length > 0) {
        sectionElem.forEach(item => {
            item.remove();
        });
    }

    toDoData.innerHTML = listData.results.map((element) => {
        todoList.innerHTML += `<section onclick="handlerListClick(event)" class = "todo-record-wrapper">
            <div class = "list-data-id"><p>"id": ${element.id}</p>
                </div>
            <div class = "list-data-name"><p class ="name-person">"name": ${element.name}</p></div>
            <div class = "list-data-status"><p>"status" :${element.status}</p></div>
            <button class = "del-button" btn-name = "delete">Delete</button>
        </section>`;
    });
}


