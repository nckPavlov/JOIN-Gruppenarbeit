/* let allTasks = []; */

function init() {
/*     loadAllTasks();
    addTask(); */
}

/* function addTask() {
    let description = document.getElementById('description'); 
    let category = document.getElementById('category'); 

    let task = {
        'description': description.value, //liest den value aus dem Input Feld
        'category': category.value,   
        'createdAt': new Date().getTime()
    }; // Zeigt das hinzugefügte JSON Array 
    
    
    allTasks.push(task); //pusht den task in das Global definierte Array

    let allTasksAsString = JSON.stringify(allTasks);  // wandelt das JSON Array in einen string bzw. in Text um  
    localStorage.setItem('allTasks', allTasksAsString); // speichert den JSON Text in deinem localStrorage

    description.value = '';
}

function loadAllTasks(){
    let allTasksAsString = localStorage.getItem('allTasks'); // holt sich den Text wieder
    allTasks = JSON.parse(allTasksAsString); // wandelt den Text wieder in ein Array um
    console.log('Load all Tasks', allTasks);
} */

/**
 * 
 * 
 */
let recipes = [];

function addToRecipes() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');

    let recipy = {
        "title": title.value,
        "description": description.value
    };
    
    recipes.push(recipy);
    console.log(recipes)
    title.value = '';
    description.value = '';
}

async function setItemm(key, value) {
    const url = 'https://remote-storage.developerakademie.org/item'; 
    const payload = { key, value };

    return fetch(url, { method: 'POST', body: JSON.stringify(payload) });
}


const STORAGE_TOKEN = '';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
    const payload = { key:key, value:value, token: STORAGE_TOKEN }
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
    .then(res => res.json());
}
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => res.data.value);
}



let users = [];

async function initRegister() {
    loadUsers();
}

async function loadUsers() {
    try{
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.log('Could not load users')
    }
}

async function register() {
    registerBtn.disabled = true;
    users.push({
        email: email.value,
        password: password.value
    });
    await setItem('users', JSON.stringify(users)); //mit dem Server synchronisieren
    resetForm();
}
function resetForm() {
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}