import { BuisnessLogic } from './shared-bl.js'
import { NotesStorage } from './notes-storage.js'

import { authService } from './services/auth-service.js'
import { orderService } from './services/order-service.js'

const notesStorage = new NotesStorage();
const buisnessLogic = new BuisnessLogic(notesStorage);
const todoList = notesStorage.getTodoList();

function initEventListenersInMenu() {
    document.querySelector('.link__add').addEventListener('click', renderForm);
    document.querySelector('.btn__add').addEventListener('click', renderForm);
    document.querySelector('.disp-style').addEventListener('click', toggleStyle);
    document.querySelector('#btn__sorting__all').addEventListener('click', () => renderTodoList(todoList));
    //document.querySelector('.btn__sort').addEventListener('click', () => buisnessLogic.sortingAList(todoList, radioInputs));
    document.querySelector('.btn__sort').addEventListener('click', () => renderTodoList(listSorting()));
    // TODO change a list that will be sorted out
    document.querySelector('#btn__sorting__done').addEventListener('click', () => renderTodoList(buisnessLogic.filterDone(todoList)));
    document.querySelector('#btn__sorting__todo').addEventListener('click', () => renderTodoList(buisnessLogic.filterTodo(todoList)));
}

function listSorting() {
    const sortFormHTMLCollection = Array.from(document.querySelector('.sorting_options__radio').children);
    const radioInputs = [];
    sortFormHTMLCollection.filter((item) => item.localName === "label").forEach((item) => radioInputs.push(...item.children));
    return buisnessLogic.sortingAList(todoList, radioInputs)
}
function renderTodoList(list) {
    //reading the templates
    //const templateSource = document.querySelector("#entry-template").innerHTML;
    // compiling template string into template function 
    //const template = Handlebars.compile(templateSource);
    const ulTodoList = document.createElement('ul');
    ulTodoList.setAttribute('class', 'list__container');
    ulTodoList.innerHTML = template(list);
    ulTodoList.addEventListener('click', (e) => editTask(e));

    const appContainer = document.querySelector('.form__list__container');
    appContainer.innerHTML = '';
    appContainer.appendChild(ulTodoList);
}
// z przykladu:
//const appContainer = document.querySelector('.form__list__container');
//const ordersRenderer = Handlebars.compile(document.querySelector("#entry-template").innerHTML);

async function renderOrders() {
    // dostalam sie do informacji z serwera
    // TO JEST ARRAY OBIEKTOW [{}, {}, {}]
    // const order = await orderService.getOrders()
    // console.log(order)

    const templateSource = document.querySelector("#entry-template").innerHTML;
    const template = Handlebars.compile(templateSource);
    const ulTodoList = document.createElement('ul');
    ulTodoList.setAttribute('class', 'list__container');
    ulTodoList.innerHTML = template({ orders: await orderService.getOrders() });
    //ulTodoList.addEventListener('click', (e) => editTask(e));
    const appContainer = document.querySelector('.form__list__container');
    appContainer.innerHTML = '';
    appContainer.appendChild(ulTodoList);
    // z przykladu:
    //appContainer.innerHTML = ordersRenderer({ orders: await orderService.getOrders() });
}
function editTask() {
    const liChildrenNodes = event.target.parentElement.children;
    const id = Object.values(liChildrenNodes).find((child) => child.className.includes('id')).innerText;
    renderForm();
    const defalutValuesObject = notesStorage.getNodeByID(id)[0];
    document.querySelector('.inputTitle').setAttribute('value', `${defalutValuesObject.title}`);
    document.querySelector('.inputDescription').setAttribute('valuet', `${defalutValuesObject.description}`);
    document.querySelector('.start').setAttribute('value', `${defalutValuesObject.start}`);
    document.querySelector('.finish').setAttribute('value', `${defalutValuesObject.finish}`);
    notesStorage.deleteNodeByID(id);
    controllerAction();
}
function getInput() {
    // input
    const formNewTask = document.querySelector('.newTask');
    const title = document.querySelector('.inputTitle').value;
    const description = document.querySelector('.inputDescription').value;
    const done = document.querySelector('.inputDone').checked
    console.log(document.querySelector('.inputDone').checked)
    const start = document.querySelector('.start').value;
    const finish = document.querySelector('.finish').value;
    const importance = document.querySelectorAll('.full').length;
    // generate id
    const id = 'id' + (new Date()).getTime();
    formNewTask.reset();
    const newTask = {
        id,
        title,
        start,
        finish,
        done,
        description,
        importance,
    }
    notesStorage.addNewTask(newTask);
}
function renderForm() {
    //reading the templates
    const templateSourceInput = document.querySelector("#input-template").innerHTML;
    // compiling template string into template function
    const templateInput = Handlebars.compile(templateSourceInput);
    const appContainer = document.querySelector('.form__list__container');
    appContainer.innerHTML = templateInput(todoList);
    const starBtn = document.querySelector('.stair_rating');
    const inputCloseBtn = document.querySelector('.btn_task_input_close');
    inputCloseBtn.addEventListener('click', () => renderTodoList(todoList));
    const submitBtn = document.querySelector('.btn_task_input');
    const inputTitle = document.querySelector('.inputTitle')
    // creating a todo
    submitBtn.addEventListener('click', async event => {
        event.preventDefault();
        //console.log(inputTitle.value);
        await orderService.createPizza(inputTitle.value)
        renderOrders()
        inputTitle.value = '';
    });
    starBtn.addEventListener('click', handleStairRating); 

}

function toggleStyle() {
    const cssVariant = document.querySelector('.link_css');
    if (/funny/.test(cssVariant.href)) {
        cssVariant.href = '../css/buisness.css';
        document.querySelector('.disp-style').innerHTML = 'Display: funny &#9662'
    }
    else {
        cssVariant.href = '../css/funny.css';
        document.querySelector('.disp-style').innerHTML = 'Display: buisness &#9662'
    }
}

function handleStairRating() {
    function addClassToStars(node) {
        const parentsChildren = node.parentElement.children
        const parentsChildrenArray = Object.values(parentsChildren).filter((child) => child.classList.contains('rating-star'))
        const nodeIndex = parentsChildrenArray.indexOf(node)
        parentsChildrenArray.forEach((child, index) => {
            (index <= nodeIndex)
                ? child.classList.add('full')
                : child.classList.remove('full')
        })
    }
    event.target.classList.contains('rating-star')
        ? addClassToStars(event.target)
        : null;
}

initEventListenersInMenu();
