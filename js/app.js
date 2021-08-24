'use strict;'

let all = [];
function Movie(image, name, year) {

    this.image = image;
    this.name = name;
    this.year = year;
    all.push(this);
}

let tableDiv = document.getElementById('tableDiv');
let table = document.createElement('table');
tableDiv.appendChild(table);

function tableHead() {
    let head = ['', '', ''];
    let tr1 = document.createElement('tr');
    table.appendChild(tr1);

    for (let i = 0; i < head.length; i++) {
        let th = document.createElement('th');
        tr1.appendChild(th);
        th.textContent = head[i];
    }
}
tableHead();

Movie.prototype.render = function () {
    let tr2 = document.createElement('tr');
    table.appendChild(tr2);

    let td = document.createElement('td');
    tr2.appendChild(td);
    td.innerHTML = `<img src="/img/${this.image.toLowerCase()}.png" alt="${this.image}" width="50" height="50">`;

    let td2 = document.createElement('td');
    tr2.appendChild(td2);
    td2.textContent = this.name;

    let td3 = document.createElement('td');
    tr2.appendChild(td3);
    td3.textContent = this.year;


}

let form = document.getElementById('form');
form.addEventListener('submit', submitListener)
function submitListener(e) {
    e.preventDefault();
    let newImage = e.target.image.value;
    let newName = e.target.name.value;

    let newYear = e.target.year.value;

    let newMovie = new Movie(newImage, newName, newYear);
    saveDate();
    newMovie.render();

}

function saveDate() {
    let string = JSON.stringify(all);
    localStorage.data = string;
}

function getData() {
    let getItem = localStorage.getItem('data');
    let userData = JSON.parse(getItem);

    if (userData) {
        for (let x = 0; x < userData.length; x++) {
            new Movie(userData[x].image, userData[x].name, userData[x].year);
        }
    }
}
getData();

for (let i = 0; i < all.length; i++) {
    all[i].render();
}
document.addEventListener('reset', clear);
function clear() {
    localStorage.removeItem('data');
    location.reload();
}