let url = 'http://localhost:3000/users';

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
        <li>${user.password}</li>
        `
    });
}