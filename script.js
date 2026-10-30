
// 1. Product data and current order
const products = [
    { id: 1, name: "Bread", price: 2.50, category: "Food" },
    { id: 2, name: "Milk", price: 3.00, category: "Drinks" },
    { id: 3, name: "Cheese", price: 4.50, category: "Food" },
    { id: 4, name: "Water", price: 1.00, category: "Drinks" },
    { id: 5, name: "Apples", price: 2.00, category: "Fruits" },
    { id: 6, name: "Rice", price: 5.00, category: "Food" }
];

let order = [];
let salesHistory = [];
let nextProductId = 7;

// 2. Select the HTML elements used by JavaScript
const productsList = document.querySelector("#products-list");
const orderList = document.querySelector("#order-list");
const emptyMessage = document.querySelector("#empty-message");
const itemCountElement = document.querySelector("#item-count");
const subtotalElement = document.querySelector("#subtotal");
const discountElement = document.querySelector("#discount");
const totalElement = document.querySelector("#total");
const clearOrderButton = document.querySelector("#clear-order");
const completeSaleButton = document.querySelector("#complete-sale");
const receiptDialog = document.querySelector("#receipt-dialog");
const receiptContent = document.querySelector("#receipt-content");
const newOrderButton = document.querySelector("#new-order");

// Product search elements
const productSearch = document.querySelector("#product-search");
const categoryFilter = document.querySelector("#category-filter");

// Custom product elements
const customProductName = document.querySelector("#custom-product-name");
const customProductPrice = document.querySelector("#custom-product-price");
const customProductCategory = document.querySelector("#custom-product-category");
const addCustomProductButton = document.querySelector("#add-custom-product");

// Payment elements
const amountPaidInput = document.querySelector("#amount-paid");
const changeElement = document.querySelector("#change");

// Sales history elements
const salesHistoryElement = document.querySelector("#sales-history");
const emptyHistoryMessage = document.querySelector("#empty-history");

// 3. Format a number as a price
function formatMoney(amount) {
    return "$" + amount.toFixed(2);
}

// 4. Display available products
function renderProducts() {
    productsList.innerHTML = "";

    const searchText = productSearch.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    let foundProducts = 0;

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        // Check the search text and selected category.
        if (!product.name.toLowerCase().includes(searchText)) {
            continue;
        }

        if (selectedCategory !== "all" &&
            product.category !== selectedCategory) {
            continue;
        }

        const card = document.createElement("article");
        card.className = "product-card";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const category = document.createElement("p");
        category.className = "product-category";
        category.textContent = product.category;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = formatMoney(product.price);

        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.className = "button button-primary";
        addButton.textContent = "Add";

        addButton.addEventListener("click", function () {
            addToOrder(product.id);
        });

        card.appendChild(name);
        card.appendChild(category);
        card.appendChild(price);
        card.appendChild(addButton);

        productsList.appendChild(card);

        foundProducts++;
    }

    // Display a message when no products match the search.
    if (foundProducts === 0) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = "No products found.";

        productsList.appendChild(message);
    }
}

// 5. Find a product by its ID
function findProduct(productId) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            return products[i];
        }
    }

    return null;
}

// 6. Add a product or increase its quantity
function addToOrder(productId) {
    const product = findProduct(productId);

    if (product === null) {
        return;
    }

    let orderItem = null;

    for (let i = 0; i < order.length; i++) {
        if (order[i].id === productId) {
            orderItem = order[i];
            break;
        }
    }

    if (orderItem === null) {
        order.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    } else {
        orderItem.quantity++;
    }

    renderOrder();
}

// 7. Change the quantity of an item
function changeQuantity(productId, amount) {
    for (let i = 0; i < order.length; i++) {
        if (order[i].id === productId) {
            order[i].quantity += amount;

            // Remove the item if its quantity reaches zero.
            if (order[i].quantity <= 0) {
                order.splice(i, 1);
            }

            break;
        }
    }

    renderOrder();
}

// 8. Remove an item from the current order
function removeFromOrder(productId) {
    for (let i = 0; i < order.length; i++) {
        if (order[i].id === productId) {
            order.splice(i, 1);
            break;
        }
    }

    renderOrder();
}

// 9. Calculate the subtotal
function calculateSubtotal() {
    let subtotal = 0;

    for (let i = 0; i < order.length; i++) {
        subtotal += order[i].price * order[i].quantity;
    }

    return subtotal;
}

// 10. Calculate the discount
function calculateDiscount() {
    const subtotal = calculateSubtotal();

    if (subtotal > 100) {
        return subtotal * 0.10;
    }

    return 0;
}

// 11. Calculate the final total
function calculateTotal() {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();

    return subtotal - discount;
}

// 12. Count all units in the order
function calculateItemCount() {
    let count = 0;

    for (let i = 0; i < order.length; i++) {
        count += order[i].quantity;
    }

    return count;
}

// 13. Calculate the customer's change
function calculateChange() {
    const amountPaid = Number(amountPaidInput.value);
    const total = calculateTotal();

    if (amountPaid >= total) {
        return amountPaid - total;
    }

    return 0;
}

// 14. Update the customer's change
function updateChange() {
    if (order.length === 0) {
        changeElement.textContent = formatMoney(0);
        return;
    }

    const amountPaid = Number(amountPaidInput.value);
    const total = calculateTotal();

    if (amountPaid >= total && amountPaid > 0) {
        changeElement.textContent = formatMoney(calculateChange());
    } else {
        changeElement.textContent = formatMoney(0);
    }
}

// 15. Display the current order and update totals
function renderOrder() {
    orderList.innerHTML = "";

    if (order.length === 0) {
        emptyMessage.hidden = false;
    } else {
        emptyMessage.hidden = true;
    }

    for (let i = 0; i < order.length; i++) {
        const item = order[i];
        const itemTotal = item.price * item.quantity;

        const row = document.createElement("div");
        row.className = "order-item";

        const details = document.createElement("div");

        const name = document.createElement("p");
        name.className = "order-item-name";
        name.textContent = item.name;

        const unitPrice = document.createElement("p");
        unitPrice.className = "order-item-price";
        unitPrice.textContent = formatMoney(item.price) + " each";

        const controls = document.createElement("div");
        controls.className = "order-item-controls";

        const decreaseButton = document.createElement("button");
        decreaseButton.type = "button";
        decreaseButton.className = "quantity-button";
        decreaseButton.textContent = "-";
        decreaseButton.setAttribute("aria-label", "Decrease " + item.name);

        decreaseButton.addEventListener("click", function () {
            changeQuantity(item.id, -1);
        });

        const quantity = document.createElement("span");
        quantity.className = "quantity";
        quantity.textContent = item.quantity;

        const increaseButton = document.createElement("button");
        increaseButton.type = "button";
        increaseButton.className = "quantity-button";
        increaseButton.textContent = "+";
        increaseButton.setAttribute("aria-label", "Increase " + item.name);

        increaseButton.addEventListener("click", function () {
            changeQuantity(item.id, 1);
        });

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-button";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {
            removeFromOrder(item.id);
        });

        controls.appendChild(decreaseButton);
        controls.appendChild(quantity);
        controls.appendChild(increaseButton);
        controls.appendChild(removeButton);

        details.appendChild(name);
        details.appendChild(unitPrice);
        details.appendChild(controls);

        const total = document.createElement("p");
        total.className = "order-item-total";
        total.textContent = formatMoney(itemTotal);

        row.appendChild(details);
        row.appendChild(total);

        orderList.appendChild(row);
    }

    // Update all order totals.
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const total = calculateTotal();

    itemCountElement.textContent = calculateItemCount();
    subtotalElement.textContent = formatMoney(subtotal);
    discountElement.textContent = formatMoney(discount);
    totalElement.textContent = formatMoney(total);

    // Prevent completing or clearing an empty order.
    clearOrderButton.disabled = order.length === 0;
    completeSaleButton.disabled = order.length === 0;

    updateChange();
}

// 16. Clear the current order
function clearOrder() {
    if (order.length === 0) {
        return;
    }

    // Ask for confirmation before clearing the order.
    const confirmed = confirm("Are you sure you want to clear this order?");

    if (!confirmed) {
        return;
    }

    order = [];
    amountPaidInput.value = "";

    renderOrder();
}

// 17. Add a custom product
function addCustomProduct() {
    const name = customProductName.value.trim();
    const price = Number(customProductPrice.value);
    const category = customProductCategory.value;

    if (name === "" || customProductPrice.value === "" || price <= 0 ||
        !Number.isFinite(price)) {
        alert("Please enter a valid product name and price.");
        return;
    }

    // Check if a product with the same name already exists.
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase() === name.toLowerCase()) {
            alert("This product already exists.");
            return;
        }
    }

    const newProduct = {
        id: nextProductId,
        name: name,
        price: price,
        category: category
    };

    products.push(newProduct);
    nextProductId++;

    customProductName.value = "";
    customProductPrice.value = "";

    renderProducts();

    alert("Product added successfully.");
}

// 18. Build and display a receipt
function completeSale() {
    if (order.length === 0) {
        return;
    }

    const total = calculateTotal();
    const amountPaid = Number(amountPaidInput.value);

    // Check if the customer has entered a valid payment.
    if (amountPaidInput.value === "" || !Number.isFinite(amountPaid) ||
        amountPaid < total) {
        alert("The amount paid must be equal to or greater than the total.");
        return;
    }

    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const change = calculateChange();
    const saleDate = new Date().toLocaleString();

    receiptContent.innerHTML = "";

    // Receipt title
    const title = document.createElement("h2");
    title.className = "receipt-title";
    title.textContent = "Jawad POS System - Receipt";

    receiptContent.appendChild(title);

    // Receipt date and time
    const date = document.createElement("p");
    date.className = "receipt-date";
    date.textContent = saleDate;

    receiptContent.appendChild(date);

    // Purchased products
    for (let i = 0; i < order.length; i++) {
        const item = order[i];

        const line = document.createElement("div");
        line.className = "receipt-line";

        const description = document.createElement("span");
        description.textContent = item.name + " x " + item.quantity;

        const price = document.createElement("span");
        price.textContent = formatMoney(item.price * item.quantity);

        line.appendChild(description);
        line.appendChild(price);

        receiptContent.appendChild(line);
    }

    // Receipt subtotal
    const subtotalLine = document.createElement("div");
    subtotalLine.className = "receipt-line";

    const subtotalLabel = document.createElement("span");
    subtotalLabel.textContent = "Subtotal";

    const subtotalPrice = document.createElement("span");
    subtotalPrice.textContent = formatMoney(subtotal);

    subtotalLine.appendChild(subtotalLabel);
    subtotalLine.appendChild(subtotalPrice);

    receiptContent.appendChild(subtotalLine);

    // Receipt discount
    const discountLine = document.createElement("div");
    discountLine.className = "receipt-line";

    const discountLabel = document.createElement("span");
    discountLabel.textContent = "Discount";

    const discountPrice = document.createElement("span");
    discountPrice.textContent = formatMoney(discount);

    discountLine.appendChild(discountLabel);
    discountLine.appendChild(discountPrice);

    receiptContent.appendChild(discountLine);

    // Receipt final total
    const totalLine = document.createElement("div");
    totalLine.className = "receipt-line receipt-total";

    const totalLabel = document.createElement("span");
    totalLabel.textContent = "Total";

    const totalPrice = document.createElement("span");
    totalPrice.textContent = formatMoney(total);

    totalLine.appendChild(totalLabel);
    totalLine.appendChild(totalPrice);

    receiptContent.appendChild(totalLine);

    // Receipt payment details
    const paymentLine = document.createElement("div");
    paymentLine.className = "receipt-line";

    const paymentLabel = document.createElement("span");
    paymentLabel.textContent = "Amount Paid";

    const paymentPrice = document.createElement("span");
    paymentPrice.textContent = formatMoney(amountPaid);

    paymentLine.appendChild(paymentLabel);
    paymentLine.appendChild(paymentPrice);

    receiptContent.appendChild(paymentLine);

    const changeLine = document.createElement("div");
    changeLine.className = "receipt-line";

    const changeLabel = document.createElement("span");
    changeLabel.textContent = "Change";

    const changePrice = document.createElement("span");
    changePrice.textContent = formatMoney(change);

    changeLine.appendChild(changeLabel);
    changeLine.appendChild(changePrice);

    receiptContent.appendChild(changeLine);

    // Save the completed sale in the session history.
    const sale = {
        id: salesHistory.length + 1,
        date: saleDate,
        total: total,
        items: []
    };

    for (let i = 0; i < order.length; i++) {
        sale.items.push({
            name: order[i].name,
            quantity: order[i].quantity,
            price: order[i].price
        });
    }

    salesHistory.push(sale);

    renderSalesHistory();

    // Display the receipt.
    receiptDialog.showModal();
}

// 19. Display completed sales
function renderSalesHistory() {
    salesHistoryElement.innerHTML = "";

    if (salesHistory.length === 0) {
        emptyHistoryMessage.hidden = false;
    } else {
        emptyHistoryMessage.hidden = true;
    }

    for (let i = salesHistory.length - 1; i >= 0; i--) {
        const sale = salesHistory[i];

        const historyItem = document.createElement("div");
        historyItem.className = "history-item";

        const details = document.createElement("div");
        details.className = "history-details";

        const title = document.createElement("strong");
        title.textContent = "Sale #" + sale.id;

        const date = document.createElement("p");
        date.textContent = sale.date;

        const items = document.createElement("p");
        let itemCount = 0;

        for (let j = 0; j < sale.items.length; j++) {
            itemCount += sale.items[j].quantity;
        }

        items.textContent = itemCount + " items";

        details.appendChild(title);
        details.appendChild(date);
        details.appendChild(items);

        const total = document.createElement("span");
        total.className = "history-total";
        total.textContent = formatMoney(sale.total);

        historyItem.appendChild(details);
        historyItem.appendChild(total);

        salesHistoryElement.appendChild(historyItem);
    }
}

// 20. Start a new order after the sale
function startNewOrder() {
    order = [];
    amountPaidInput.value = "";

    renderOrder();
    receiptDialog.close();
}

// 21. Connect buttons and inputs to their actions
clearOrderButton.addEventListener("click", clearOrder);
completeSaleButton.addEventListener("click", completeSale);
newOrderButton.addEventListener("click", startNewOrder);

productSearch.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);

addCustomProductButton.addEventListener("click", addCustomProduct);

amountPaidInput.addEventListener("input", updateChange);

// 22. Initial page display
renderProducts();
renderOrder();
renderSalesHistory();
