let url = 'http://localhost:3000/users/';

// first fetch to our database ever
fetch('http://localhost:3000/characters/')
.then(response => response.json())
.then(data => fillTables(data))
.catch(error => console.log("Smth didnt work " + error));

function fillTables(data) {
    const list = document.getElementById("list");

    data.forEach(character => {
        list.innerHTML += `
        <li>${character.name}</li>
        <li>${character.height}</li>
        <li>${character.alive}</li>
        <li>${character.strength}</li>
        <li>${character.weakness}</li>`
    });
}

const sendButton = document.getElementById("signUpButton");
const deleteButton = document.getElementById("deleteButton");
const loginButton = document.getElementById("loginButton");

sendButton.addEventListener("click", () => {

    let data = {
        name : document.getElementById("signUpUsername").value,
        email : document.getElementById("signUpEmail").value,
        password : document.getElementById("signUpPassword").value
    };

    if (!(data.name == "" || data.email == "" || data.password == "")) {
        const options = {
            method: 'POST', // or 'PUT', 'DELETE', etc.
            headers: {
            'Content-Type': 'application/json' // specify the content type as JSON
            },
            body: JSON.stringify(data) // convert the data to JSON string
        }

        fetch(url, options)
        .then(response => {
        if (!response.ok) {
            console.log("Response not ok");
        }
        return response.json();
        })
        .then(data => console.log("user: " + data.name + " created successfully"))
        .catch(error => console.error("Error sending data: " + error));
    }
    else {
        alert("Can't leave fields empty");
    }
})

deleteButton.addEventListener("click", () => {

    let inGivenData = {
        name : document.getElementById("signUpUsername").value,
        email : document.getElementById("signUpEmail").value,
        password : document.getElementById("signUpPassword").value
    }

    const options = {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    console.log(url + inGivenData.name);

    let customUrl = url + "name/";

    fetch((customUrl + inGivenData.name),options)
    .then(response => {
        if (!response.ok) console.log("Response not ok");
        response.json();
    })
    .then(console.log("user deleted successfully"))
    .catch(error => console.log("an error occured: " + error));
});


loginButton.addEventListener("click", () => {

    let inGivenData = {
        name : document.getElementById("loginUsername").value,
        password : document.getElementById("loginPassword").value
    }

    let customUrl = url + "name/";
    console.log(customUrl + inGivenData.name);

    fetch((customUrl + inGivenData.name))
    .then(response => response.json())
    .then(data => loginByPassword(data, inGivenData.password, inGivenData.name))
    .catch(error => console.error("An error occured: " + error));
});

function loginByPassword(data, password, name) {
    console.log(data);
    if (data.name == name && data.password == password) {
        window.location.href = "./main/after.html";
    }
    else {
        console.error("Username or password wrong");
    }
}