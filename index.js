let url = 'http://localhost:3000/users/';

// first fetch to our database ever
/*fetch(url)
.then(response => response.json())
.then(data => fillTables(data))
.catch(error => console.log("Smth didnt work " + error));*/

function fillTables(data) {
    const list = document.getElementById("list");

    data.forEach(user => {
        list.innerHTML += `
        <li>${user.name}</li>
        <li>${user.email}</li>
        <li>${user.password}</li>`
    });
}

const sendButton = document.getElementById("signUp");
const deleteButton = document.getElementById("deleteButton")

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
        .catch(error => console.log("Error sending data: " + error));
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
