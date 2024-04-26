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
        <li>${user.password}</li>`
    });
}

const data = {
    name : "Hitler, Adolf",
    email : "wolfschanze88@gmail.com",
    password : "Führer88"
};

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