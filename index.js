let url = 'http://localhost:3000/users/';

async function awaitFetch(inGivenData) {
    const response = await fetch(url);
    const data = await response.json();
    
    return checkIfUserExists(data, inGivenData);
}

fetch(url)
.then(response => response.json())
.then(data => fillTables(data))
.catch(error => console.log("Smth didnt work " + error));

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
        name,
        email,
        password
    };

    data.name = document.getElementById("username").value;
    data.email = document.getElementById("email").value;
    data.password = document.getElementById("password").value;

    console.log(data);

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
    .then(data => console.log("data sent successfully"))
    .catch(error => console.log("Error sending data"));
})

deleteButton.addEventListener("click", () => {

    let inGivenData = {
        name : document.getElementById("username").value,
        email : document.getElementById("email").value,
        password : document.getElementById("password").value
    }

    const options = {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    console.log(url + inGivenData.name);

    fetch(url + inGivenData.name,options)
    .then(response => {
        if (!response.ok) console.log("Response not ok");
        response.json();
    })
    .then(data => console.log("user " + data.name + " deleted successfully"))
    .catch(error => console.log("an error occured: " + error));
});

/*function checkIfUserExists(data, inGivenData) {
    data.forEach(user => {
        if (user.name == inGivenData.name && user.email == inGivenData.email && user.password == inGivenData.password) {
            console.log("found user: " + user.name);
            return "http://localhost:3000/users/" + user.name;
        }
    });

    return "";
}*/