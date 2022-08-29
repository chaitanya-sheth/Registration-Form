let submitButton = document.getElementById("submit");

let info = {
    studentName: '',
    email: '',
    url: '',
    website: '',
    gender: '',
    skillArr: [],
}

let getInfo = function() {
    info.studentName = document.getElementById('name').value;
    info.email = document.getElementById('email').value;
    info.url = document.getElementById('url').value;
    info.website = document.getElementById('website').value;
    info.gender = document.querySelector('input[name="male-female"]:checked').value;
    let skills = document.querySelectorAll('.checkbox:checked');
    info.skillArr = [];
    skills.forEach(function(item) {
        info.skillArr.push(item.value);
    })
    if (localStorage.getItem("infoSection") === null) {
        infoItem = [];
    }
    else {
        infoItem = JSON.parse(localStorage.getItem("infoSection"))
    }
    infoItem.push(info);
    localStorage.setItem("infoSection", JSON.stringify(infoItem));
}

const showInfo = function(){
    let cardContainer = document.getElementById("cardContainer");
    let cards = '';
    let getLocalStorage = localStorage.getItem("infoSection");

    if (getLocalStorage === null) {
        console.log("null");
    }
    else {
        cardDivArr = JSON.parse(getLocalStorage);

        cardDivArr.forEach(function(item, index) {

            cards = cards + `<div class="card">
            <img src=${item.url}>
            <div class="info">
                <p>Name : ${item.studentName}</p>
                <p>Email : ${item.email}</p>
                <p>Website : <a href="${item.website}" target = "blank">${item.website}</a></p>
                <p>Gender : ${item.gender}</p>
                <p>Skills : ${item.skillArr.join(", ")}</p>
                <button onclick="deleteData(${index})">Delete</button>
            </div>
        </div>`;
        })
    }
    cardContainer.innerHTML = cards;
}

const deleteData = function(index) {
    let getList = JSON.parse(localStorage.getItem("infoSection"));
    getList.splice(index, 1);
    localStorage.setItem("infoSection", JSON.stringify(getList));
    window.location.reload();
}

showInfo();

submitButton.addEventListener(('click'), function() {
    getInfo();
    showInfo();
})
