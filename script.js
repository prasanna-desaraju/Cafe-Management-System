document.addEventListener("DOMContentLoaded", () => {
    const menuItems = [
        { name: "Coffee", price: 3.0 },
        { name: "Tea", price: 2.5 },
        { name: "Sandwich", price: 5.0 },
        { name: "Cake", price: 4.0 },
    ];

    let currentOrder = [];
    let pastOrders = [];

    const menuList = document.getElementById("menu-list");
    const itemSelect = document.getElementById("item-select");
    const orderList = document.getElementById("order-list");
    const totalBill = document.getElementById("total-bill");
    const pastOrdersList = document.getElementById("past-orders-list");
    const quantityInput = document.getElementById("quantity");
    const addOrderButton = document.getElementById("add-order");

    // Display menu items
    function displayMenu() {
        menuItems.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            menuList.appendChild(listItem);

            const option = document.createElement("option");
            option.value = index;
            option.textContent = item.name;
            itemSelect.appendChild(option);
        });
    }

    // Update total bill
    function updateTotal() {
        const total = currentOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalBill.textContent = total.toFixed(2);
    }

    // Update order list
    function updateOrderList() {
        orderList.innerHTML = "";
        currentOrder.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            orderList.appendChild(listItem);
        });
        updateTotal();
    }

    // Add item to order
    addOrderButton.addEventListener("click", () => {
        const selectedItemIndex = itemSelect.value;
        const quantity = parseInt(quantityInput.value, 10);

        if (!quantity || quantity <= 0) return;

        const selectedItem = menuItems[selectedItemIndex];
        const existingItem = currentOrder.find((item) => item.name === selectedItem.name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            currentOrder.push({ ...selectedItem, quantity });
        }
        updateOrderList();
    });

    // Finalize order and move it to past orders
    const finalizeOrderButton = document.createElement("button");
    finalizeOrderButton.textContent = "Finalize Order";
    document.getElementById("bill").appendChild(finalizeOrderButton);

    finalizeOrderButton.addEventListener("click", () => {
        if (currentOrder.length === 0) {
            alert("No items in the order to finalize!");
            return;
        }

        // Add current order to past orders
        pastOrders.push([...currentOrder]);

        // Update past orders list
        const orderSummary = pastOrders[pastOrders.length - 1]
            .map((item) => `${item.name} x${item.quantity}`)
            .join(", ");
        const pastOrderItem = document.createElement("li");
        pastOrderItem.textContent = `Order ${pastOrders.length}: ${orderSummary}`;
        pastOrdersList.appendChild(pastOrderItem);

        // Clear current order
        currentOrder = [];
        updateOrderList();
    });

    displayMenu();
});
