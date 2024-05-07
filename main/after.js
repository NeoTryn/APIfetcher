const createButton = document.getElementById("createCharacter");
const darkModeButton = document.getElementById("darkModeButton");

if (localStorage.getItem("bgColor") == "undefined") {
    localStorage.setItem("bgColor", "white");
}

document.body.style.backgroundColor = localStorage.bgColor;

createButton.addEventListener("click", () => {
    let url = "http://localhost:3000/characters/";

    console.log("her");

    let data = {
        name : document.getElementById("charName").value,
        height : Number(document.getElementById("charHeight").value),
        alive : Boolean(document.getElementById("charAlive").value),
        strength : document.getElementById("charStrength").value,
        weakness : document.getElementById("charWeakness").value
    }

    const options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    };

    fetch(url, options)
    .then(response => {
        if (!response.ok) {
            console.log("Response not ok");
        }
        return response.json()
    })
    .then(data => console.log("Character: " + data.name + " created successfully"))
    .catch(error => console.error("Error sending data: " + error));
})

darkModeButton.addEventListener("click", () => {
    if (document.body.style.backgroundColor == "black") {
        document.body.style.backgroundColor = "white";
        localStorage.bgColor = "white";
    }
    else {
        document.body.style.backgroundColor = "black";
        localStorage.bgColor = "black";
    }
})