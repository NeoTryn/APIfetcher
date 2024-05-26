const createButton = document.getElementById("createCharacter");
const darkModeButton = document.getElementById("darkModeButton");
const deleteButton = document.getElementById("deleteButton");
const url = "http://localhost:3000/characters/";

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
        weakness : document.getElementById("charWeakness").value,
        url : document.getElementById("charURL").value
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

    location.reload();
})

fetch(url)
.then(response => response.json())
.then(data => fillCards(data))
.catch(error => console.log("An error occured fetching: " + error))

function fillCards(data) {
    const list = document.getElementById("characters");

    data.forEach(character => {
        list.innerHTML += 
        `<li>
            <div class="card bg-light">
                <h2 class="card-header">${character.name}</h2>
                <img src="${character.url}" class="card-image-top" alt="Image of ${character.name}" style="width: 200px; height: 200px;">
                <div class="card-body">
                    <ul class="card-list">
                        <li>
                            <p>
                                Height: ${character.height}
                            </p>
                        </li>
                        <li>
                            <p>
                                Alive: ${character.alive}
                            </p>
                        </li>
                        <li>
                            <p>
                                Strength: ${character.strength}
                            </p>
                        </li>
                        <li>
                            <p>
                                Weakness: ${character.weakness}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </li>`;
    });
}

deleteButton.addEventListener("click", () => {
    const options = {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const name = document.getElementById("charNameDel").value;

    let customUrl = url + "name/" + name + "/";
    console.log(customUrl); 

    fetch(customUrl, options)
    .then(response => response.json())
    .then(console.log("user deleted successfully"))
    .catch(error => console.log("an error occured: " + error));
})