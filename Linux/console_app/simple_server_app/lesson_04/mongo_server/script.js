// script.js
document.getElementById("loadBtn").addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:3000/");
        const animals = await response.json();

        const list = document.getElementById("animalList");
        list.innerHTML = ""; // Liste leeren

        animals.forEach(animal => {
            const item = document.createElement("li");
            item.textContent = `${animal.name} (${animal.kind}) – ${animal.weight}kg`;
            list.appendChild(item);
        });
    } catch (error) {
        console.error("Fehler beim Laden der Tiere:", error);
    }
});
