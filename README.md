# Sauce Demo Cypress Automation Framework

## Project Overview

This project is a production-ready End-to-End (E2E) Cypress automation framework built for Sauce Demo.

The framework validates the complete retail purchase workflow including authentication, product selection, cart validation, checkout process, order completion, and application state management.

This project follows real QA team architecture using business-domain ownership instead of page-per-file test design.

---

## Business Flow Covered

Login
→ Inventory
→ Cart
→ Checkout Information
→ Checkout Overview
→ Order Completion
→ Navigation & State Management

---

## Project Modules

### Module 1 — Login

- Valid Login
- Invalid Login
- Locked User Validation
- Protected Access Validation

### Module 2 — Inventory

- Add to Cart
- Remove Product
- Multiple Product Selection
- Product Sorting Validation
- Inventory State Persistence

### Module 3 — Cart

- Cart Validation
- Product Presence Validation
- Remove from Cart
- Continue Shopping
- Checkout Navigation

### Module 4 — Checkout

- Checkout Information Validation
- Checkout Overview Validation
- Finish Order Flow
- Negative Form Validation
- Totals Validation

### Module 5 — Navigation & State Management

- Burger Menu Validation
- Logout Flow
- Reset App State
- Navigation Stability
- Browser State Validation

---

## Tech Stack

- Cypress
- JavaScript
- Mocha
- Chai
- Git
- GitHub

---

## Test Types Covered

- Smoke Testing
- Functional Testing
- Regression Testing
- Negative Testing
- End-to-End Testing
- Resilience Testing
- State Validation

---

## Project Structure

```text
cypress/
├── e2e/
│   ├── practiceLessons/
│   └── sauceDemo/
│       ├── login.cy.js
│       ├── inventory.cy.js
│       ├── cart.cy.js
│       ├── checkout.cy.js
│       └── navigation.cy.js
│
├── fixtures/
├── support/
│   ├── commands.js
│   └── e2e.js
│
├── cypress.config.js
├── package.json
├── README.md
└── .gitignore