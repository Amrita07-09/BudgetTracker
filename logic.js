const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");   
const money_minus = document.getElementById("money-minus"); 
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// store transactions
let transactions = [];

//  Add transaction to DOM
function addTransactionDOM(transaction){
    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );

    item.innerHTML = `
        ${transaction.text}
        <span>${sign}₹${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

//  Update balance, income, expense
function updateValues(){
    const amounts = transactions.map(t => Number(t.amount));

    const total = amounts.reduce((acc, item) => acc + item, 0);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0);

    const expense = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0);

    balance.innerText = `₹${total.toFixed(2)}`;
    money_plus.innerText = `₹${income.toFixed(2)}`;
    money_minus.innerText = `₹${Math.abs(expense).toFixed(2)}`;
}

// Remove transaction
function removeTransaction(id){
    transactions = transactions.filter(t => t.id !== id);
    init();
}

//Add new transaction
function addTransaction(e){
    e.preventDefault();

    if(text.value.trim() === "" || amount.value.trim() === ""){
        alert("Please enter text and amount");
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);

    init(); 

    text.value = "";
    amount.value = "";
}

//  Initialize app
function init(){
    list.innerHTML = ""; // clear old data
    transactions.forEach(addTransactionDOM);
    updateValues();
}

// Event listener
form.addEventListener("submit", addTransaction);

// start app
init();
