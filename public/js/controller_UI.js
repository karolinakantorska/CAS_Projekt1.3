import { BuisnessLogic } from './shared-bl.js'
import { NotesStorage } from './notes-storage.js'

import { authService } from './services/auth-service.js'
import { orderService } from './services/order-service.js'

const notesStorage = new NotesStorage();
const buisnessLogic = new BuisnessLogic(notesStorage);
let actuallyDisplayedList = [];
const btnLogin = document.querySelector(".loggIn");

function initEventListenersInMenu() {
    btnLogin.addEventListener('click',logToggle);
    document.querySelector('.link__add').addEventListener('click', renderForm);
    document.querySelector('.btn__add').addEventListener('click', renderForm);
    document.querySelector('.disp-style').addEventListener('click', toggleStyle);
    document.querySelector('#btn__sorting__all').addEventListener('click', async() => {
        // TODO Repetition to avoid
        const list = await getTodoList();
        actuallyDisplayedList = list;
        renderOrders(list);
    });
    document.querySelector('.btn__sort').addEventListener('click', () => {
        renderOrders(listSorting());
    });
    document.querySelector('#btn__sorting__done').addEventListener('click', async() => {
        const list = await getTodoList();
        actuallyDisplayedList = buisnessLogic.filterDone(list);
        renderOrders(buisnessLogic.filterDone(list));
    });
    document.querySelector('#btn__sorting__todo').addEventListener('click', async() => {
        const list = await getTodoList();
        actuallyDisplayedList = buisnessLogic.filterTodo(list);
        renderOrders(buisnessLogic.filterTodo(list));
    });
}
// logg out is not working
async function logToggle(){
    if (btnLogin.id === 'logedOut') {
        btnLogin.innerHTML = 'Log Out';
        btnLogin.setAttribute('id', 'logedIn');
        await authService.login("admin@admin.ch", "123456");
        // true
        console.log(authService.isLoggedIn())
        //authService.isLoggedIn();
    }
    else {
        btnLogin.innerHTML = 'Log In';
        btnLogin.setAttribute('id', 'logedOut');
        // false
        console.log(!authService.isLoggedIn())
        // empty object
        console.log(authService)
        authService.logout();
        //!authService.isLoggedIn();
    }
}
function listSorting() {
    const sortFormHTMLCollection = Array.from(document.querySelector('.sorting_options__radio').children);
    const radioInputs = [];
    sortFormHTMLCollection.filter((item) => item.localName === "label").forEach((item) => radioInputs.push(...item.children));
    return buisnessLogic.sortingAList(actuallyDisplayedList, radioInputs);
}
async function getTodoList() {
    const list = await orderService.getOrders();
    return list;
}
 function renderOrders(list) {
    // const order = await orderService.getOrders();
    // console.log(order);
    const templateSource = document.querySelector("#entry-template").innerHTML;
    const template = Handlebars.compile(templateSource);
    const appContainer = document.querySelector('.form__list__container');
    appContainer.innerHTML = template(list);
    addRandomColorsToBackground()
    document.querySelector('.list__container').addEventListener('click', (e) => editTask(e));
}
function addRandomColorsToBackground(){
    if (document.querySelector('.link_css').className.includes('funny')) {
        const backgroungColors = ['rgb(68,92,116)','rgb(88,112,136)', 'rgb(255,229,229)', 'rgb(255,215,203)', 'rgb(234,236,239)', 'rgb(255,153,153)'];
        Array.from(document.querySelectorAll('.list__item')).forEach(todo => {
            const color = backgroungColors[Math.floor(Math.random() * backgroungColors.length)];
            todo.setAttribute('style', `background-color: ${color};`);
        });
    }
}
async function editTask(e) {
    if (e.target.className === 'edit'){
        const liChildrenNodes = e.target.parentElement.children;
        const id = Object.values(liChildrenNodes).find((child) => child.className.includes('id')).innerText;
        renderForm();
        const defalutValues = await orderService.getOrder(id);
        console.log(id);
        await orderService.deleteOrder(id);
        (defalutValues.done)
            ? document.querySelector('.inputDone').checked = true
            : null;
        document.querySelector('.inputTitle').setAttribute('value', `${defalutValues.title}`);
        document.querySelector('.inputDescription').setAttribute('placeholder', `${defalutValues.description}`);
        document.querySelector('.start').setAttribute('value', `${defalutValues.start}`);
        document.querySelector('.finish').setAttribute('value', `${defalutValues.finish}`);
        const inputCloseBtn = document.querySelector('.btn_task_input_close');
        const stars = Array.from(document.querySelectorAll('.rating-star')).splice(0, defalutValues.importance);
        for (let star of stars) {
            star.classList.add('full');
        }
    }
}
async function renderForm() {
    //reading the templates
    const templateSourceInput = document.querySelector("#input-template").innerHTML;
    // compiling template string into template function
    const templateInput = Handlebars.compile(templateSourceInput);
    const appContainer = document.querySelector('.form__list__container');
    appContainer.innerHTML = templateInput();
    const starBtn = document.querySelector('.stair_rating');
    const inputCloseBtn = document.querySelector('.btn_task_input_close');
    inputCloseBtn.addEventListener('click', async() => {
        // TODO Repetition to avoid
        const list = await getTodoList();
        actuallyDisplayedList = list;
        renderOrders(list);
    });
    const submitBtn = document.querySelector('.btn_task_input');
    starBtn.addEventListener('click', handleStairRating);
    submitBtn.addEventListener('click', handleFormInput);
}
async function handleFormInput(){
    event.preventDefault();
    const inputTitle = document.querySelector('.inputTitle');
    const inputDescription = document.querySelector('.inputDescription');
    const inputStart = document.querySelector('.start');
    const inputFinish = document.querySelector('.finish');
    const inputDone = document.querySelector('.inputDone').checked;
    const inputImportance = document.querySelectorAll('.full').length;

    await orderService.createPizza(inputTitle.value, inputDescription.value, inputStart.value, inputFinish.value, inputImportance, inputDone)
    let list = await getTodoList();
    actuallyDisplayedList = list;
    renderOrders(list);
    inputTitle.value = '';
}
function toggleStyle() {
    const cssVariant = document.querySelector('.link_css');
    if (/funny/.test(cssVariant.href)) {
        cssVariant.href = '../css/buisness.css';
        cssVariant.classList.toggle('funny');
        document.querySelector('.disp-style').innerHTML = 'Display: funny &#9662';
        console.log(document.querySelector('.link_css'));
        (document.querySelector('.link_css'))
            ? Array.from(document.querySelectorAll('.list__item')).forEach(todo => todo.setAttribute('style', 'background-color: white;'))
            : null;
    }
    else {
        cssVariant.href = '../css/funny.css';
        cssVariant.classList.toggle('funny');
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
initEventListenersInMenu();
