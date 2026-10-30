# Jawad_Ali_POS_System

A simple and interactive Point of Sale (POS) system built using **HTML, CSS, and Vanilla JavaScript**.

This project simulates a basic supermarket checkout system, allowing cashiers to manage customer orders, add products, adjust quantities, calculate prices, process payments, and generate receipts.

## Overview

Jawad_Ali POS System is a front-end project developed to practice JavaScript fundamentals, DOM manipulation, event handling, and basic problem-solving.

The system provides a simple interface where users can select products, manage the current order, calculate totals, and complete sales.

## Technologies Used

- **HTML5** – Structure of the application.
- **CSS3** – Styling and responsive layout.
- **Vanilla JavaScript** – Application logic, DOM manipulation, and event handling.

## Features

### Core Features
- Display available products with names and prices.
- Add products to the current order.
- Increase or decrease product quantities.
- Remove products from the order.
- Calculate individual product totals.
- Automatically calculate subtotal and total items.
- Display the final amount to pay.
- Clear or cancel the current order.
- Complete sales and generate purchase receipts.
- Start a new order after completing a sale.

### Additional Features
- Search products by name.
- Filter products by category.
- Apply a **10% discount** when the subtotal exceeds $100.
- Enter the customer's payment amount.
- Automatically calculate the customer's change.
- Confirm before clearing an order.
- Add custom products with a name, price, and category.
- Display the date and time on receipts.
- Maintain a sales history during the current session.

## Project Structure

```text
Jawad-POS-System/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in your web browser.
4. Start adding products and managing orders.

No backend, database, or additional dependencies are required.

## Discount Rules

The system automatically applies a 10% discount when the subtotal is greater than $100.

- Subtotal ≤ $100: No discount.
- Subtotal > $100: 10% discount.

The final total is calculated after applying the discount.

## Learning Objectives

This project focuses on practicing fundamental JavaScript concepts, including:

- Variables and constants (`let` and `const`).
- Arrays and objects.
- Conditional statements (`if` and `else`).
- Loops (`for`).
- Functions, parameters, and return values.
- DOM selection and manipulation.
- Event listeners and event handling.
- Basic arithmetic operations.

The implementation uses simple, reusable functions and avoids advanced JavaScript concepts to maintain clarity and readability.

## Limitations

- All data is stored in memory and is lost when the page is refreshed.
- Sales history is limited to the current browser session.
- No backend or database integration.
- No inventory or stock management.
- No user authentication.

## Project Purpose

This project was developed as a practical JavaScript assignment to demonstrate an understanding of JavaScript fundamentals, DOM manipulation, event handling, and building interactive web interfaces.

---

**Developed by Jawad Sayyah**

*Jawad POS System – Simple, Practical, and Interactive.*
