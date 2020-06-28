import { BuisnessLogic } from '../bl/shared-bl.js'
import { authService } from '../services/auth-service.js'
import { todoService } from '../services/todo-service.js'

const buisnessLogic = new BuisnessLogic();
let displayedList = [];
const btnLogin = document.querySelector("#login");
const btnLogout = document.querySelector("#logout");

btnLogin.addEventListener("click", async () => {
    await authService.login("admin@admin.ch", "123456");
    updateStatus();
});
btnLogout.addEventListener("click", () => {
    authService.logout();
    updateStatus();
});
function updateStatus() {
    Array.from(document.querySelectorAll(".js-non-user")).forEach(x => x.classList.toggle("hidden", authService.isLoggedIn()))
    Array.from(document.querySelectorAll(".js-user")).forEach(x => x.classList.toggle("hidden", !authService.isLoggedIn()))
}
function initEventListenersInMenu() {
    document.querySelector('.link__add').addEventListener('click', renderForm);
    document.querySelector('.btn__add').addEventListener('click', renderForm);
    document.querySelector('.disp-style').addEventListener('click', toggleStyle);
    document.querySelector('#btn__sorting__all').addEventListener('click', async () => {
        resetChecked();
        renderTodoList(await getTodoList());
    });
    const radioBtn = Array.from(document.querySelectorAll('.sorting_options__radio > input'));
    radioBtn.forEach(radio => {
        radio.addEventListener('change', (e) => {
            renderTodoList(listSorting( e.target.value));
        })
    })
    document.querySelector('#btn__sorting__done').addEventListener('click', async () => {
        resetChecked();
        displayedList = buisnessLogic.filterDone(await getTodoList());
        renderTodoList(buisnessLogic.filterDone(displayedList));
    });
    document.querySelector('#btn__sorting__todo').addEventListener('click', async () => {
        resetChecked();
        displayedList = buisnessLogic.filterTodo(await getTodoList());
        renderTodoList(buisnessLogic.filterTodo(displayedList));
    });
}
function resetChecked(){
    const radioBtn = Array.from(document.querySelectorAll('.sorting_options__radio > input'));
    radioBtn.forEach(radio => radio.checked = false);
}
function listSorting(sortBy) {
    return buisnessLogic.sortingAList(displayedList, sortBy);
}
async function getTodoList() {
    const list = await todoService.getTodos();
    displayedList = list;
    return list;
}
function renderTodoList(list) {
    const template = Handlebars.compile(document.querySelector("#entry-template").innerHTML);
    const appContainer = document.querySelector('.form__list__container');
    appContainer.innerHTML = template(list);
    addRandomColorsToBackground()
    document.querySelector('.list__container').addEventListener('click', (e) => editTask(e));
}
function addRandomColorsToBackground() {
    if (document.querySelector('.link_css').className.includes('funny')) {
        const backgroungColors = ['bgColor1', 'bgColor2', 'bgColor3)', 'bgColor4', 'bgColor5', 'bgColor6'];
        Array.from(document.querySelectorAll('.list__item')).forEach(todo => {
            const color = backgroungColors[Math.floor(Math.random() * backgroungColors.length)];
            todo.className= color;
        });
    }
}
async function editTask(e) {
    if (e.target.className === 'edit') {
        const liChildrenNodes = e.target.parentElement.children;
        const id = Object.values(liChildrenNodes).find((child) => child.className.includes('id')).innerText;
        const defalutValues = await todoService.getTodo(id);
        console.log(defalutValues)
        renderForm(defalutValues);
        await todoService.deleteTodo(id);
    }
}
async function renderForm(defaultObject) {
    const templateInput = Handlebars.compile(document.querySelector("#input-template").innerHTML);
    const appContainer = document.querySelector('.form__list__container');
    appContainer.innerHTML = templateInput(defaultObject);
    const starBtn = document.querySelector('.stair_rating');
    const inputCloseBtn = document.querySelector('.btn_task_input_close');
    inputCloseBtn.addEventListener('click', async () => {
        renderTodoList(await getTodoList());
    });
    const submitBtn = document.querySelector('.btn_task_input');
    starBtn.addEventListener('click', handleStairRating);
    submitBtn.addEventListener('click', handleFormInput);
}
async function handleFormInput() {
    event.preventDefault();
    const inputTitle = document.querySelector('.inputTitle');
    const inputDescription = document.querySelector('.inputDescription');
    const inputStart = document.querySelector('.start');
    const inputFinish = document.querySelector('.finish');
    const inputDone = document.querySelector('.inputDone').checked;
    const inputImportance = document.querySelectorAll('.full').length;

    await todoService.createTodo(inputTitle.value, inputDescription.value, inputStart.value, inputFinish.value, inputImportance, inputDone)
    renderTodoList(await getTodoList());
    inputTitle.value = '';
}
function toggleStyle() {
    const cssVariant = document.querySelector('.link_css');
    if (/funny/.test(cssVariant.href)) {
        cssVariant.href = '../css/buisness.css';
        cssVariant.classList.toggle('funny');
        document.querySelector('.disp-style').innerHTML = 'Display: funny &#9662';
        (document.querySelector('.link_css'))
            ? Array.from(document.querySelectorAll('.list__item')).forEach(todo => todo.setAttribute('style', 'background-color: white;'))
            : null;
    }
    else {
        cssVariant.href = '../css/funny.css';
        cssVariant.classList.toggle('funny');
        addRandomColorsToBackground();
        document.querySelector('.disp-style').innerHTML = 'Display: buisness &#9662';
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
updateStatus(); 
initEventListenersInMenu();