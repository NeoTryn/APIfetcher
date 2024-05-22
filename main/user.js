const url = "http://localhost:3000/users/name/"
let username = localStorage.getItem("name");
let email = localStorage.getItem("email");

const nameHeading = document.getElementById("name");
const emailHeading = document.getElementById("email");
const picturelinkHeading = document.getElementById("picture-link");

nameHeading.innerHTML += username;
emailHeading.innerHTML += email;

const input = document.getElementById("link");
const password = document.getElementById("password");
const send = document.getElementById("send");

send.addEventListener("click", () => {
    if (input.value != "undefined") {

        const data = {
            name : username,
            email : email,
            password : password.value,
            pictureLink : input.value
        }    

        const options = {
            method: 'PUT', // Or 'PATCH'
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        }
        
        let customUrl = url + username;
        console.log(customUrl);

        fetch(customUrl, options)
        .then(response => {
            if (!response.ok) {
                console.log("Response not ok");
            }
            return response.json()})
        .then(data => console.log("SUCCESS sending: " + data))
        .catch(error => console.log(error));  
    }
    else {
        console.log("e");
    }
})

fetch(url + username)
.then(response => response.json())
.then(data => {
    let img = document.getElementById("profile-picture");
    img.src = data.pictureLink;
})
.catch(error => console.log(error));