let items = JSON.parse(localStorage.getItem("shoppingItems")) || [];

const itemName = document.getElementById("itemName");
const quantity = document.getElementById("quantity");
const addButton = document.getElementById("addButton");
const shoppingList = document.getElementById("shoppingList");

function saveItems() {
    localStorage.setItem("shoppingItems", JSON.stringify(items));
}

function renderItems() {
    shoppingList.innerHTML = "";

    items.forEach((item, index) => {
        const li = document.createElement("li");

        const text = document.createElement("span");
        text.textContent = `${item.name} - Qty: ${item.quantity}`;

        if (item.bought) {
            text.classList.add("bought");
        }

        text.addEventListener("click", () => {
            items[index].bought = !items[index].bought;
            saveItems();
            renderItems();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            items.splice(index, 1);
            saveItems();
            renderItems();
        });

        li.appendChild(text);
        li.appendChild(deleteButton);
        shoppingList.appendChild(li);
    });
}

addButton.addEventListener("click", () => {
    const name = itemName.value.trim();
    const qty = quantity.value;

    if (name === "" || qty < 1) {
        alert("Please enter an item and valid quantity.");
        return;
    }

    items.push({
        name: name,
        quantity: qty,
        bought: false
    });

    saveItems();
    renderItems();

    itemName.value = "";
    quantity.value = 1;
});

renderItems();
