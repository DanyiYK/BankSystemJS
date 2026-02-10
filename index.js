const BANK_ACCOUNTS = [];
const BALANCE_DECIMAL_POINTS = 2;

let currentBankAccount;

function addAccount({ username, pin, amount }) {
    BANK_ACCOUNTS.push({
        username: username,
        pin: pin,
        balance: amount,
        transactions: [],
        logTransaction(type, amount){
            this.transactions.push({
                type: type,
                amount: amount,
                date: new Date().toISOString()
            })
        },
        withdraw(withdraw_amount){
            if(withdraw_amount > this.balance) {
                return "You can't withdraw more money than the one you have";
            }

            this.balance -= withdraw_amount;
            this.logTransaction("withdraw", withdraw_amount);
        },
        deposit(deposit_amount){
            if(deposit_amount >= 0) {
                return "You can't deposit a negative amount of money.";
            }

            this.balance += deposit_amount;
            this.logTransaction("deposit", withdraw_amount);
        },
        getBalance(){
            return `You currently have €${this.balance.toFixed(BALANCE_DECIMAL_POINTS)}`;
        },
        getHistory(){
            let return_val = "Here's your transaction history:";

            if(this.transactions.length===0) {
                return_val += "\nNo transaction to list :(";
                return return_val;
            }

            for(let transaction of this.transactions) {
                return_val += `Type: ${transaction.type}\nAmount: ${transaction.amount}\nDate: ${transaction.date}\n${("-").repeat(20)}`;
            }

            return return_val
        }
    })
}

function getAccountFromUsername(username) {
    username = username.toLowerCase()

    for(let account of BANK_ACCOUNTS) {
        if(account.username.toLowerCase() === username) {
            return account
        }
    }
}

// Asks the user for their username and pin
// and returns the BankAccount object.
function promptAuthentication() {
    // Request username until it finds a corresponding bank account
    let selectedBankAccount;
    let username;

    do {
        username = prompt("Insert your username:");
        selectedBankAccount = getAccountFromUsername(username)
    } while(!selectedBankAccount);

    // Request pin
    let pin;

    while(true) {
        pin = +prompt("Insert your pin:")
        
        if(pin===selectedBankAccount.pin) {
            break
        }

        alert("Wrong pin, please try again.")
    }

    return selectedBankAccount;
}

function promptAmount() {
    let amount;

    do {
        amount = +prompt("Insert amount:")
    } while(isNaN(amount) || amount===0);

    return amount;
}

addAccount({
    username: "Carlo",
    pin: 1010,
    amount: 100 
})
addAccount({
    username: "Gertrude",
    pin: 1292,
    amount: 1945 
})
addAccount({
    username: "Luca",
    pin: 1524,
    amount: 0 
})

currentBankAccount = promptAuthentication();

alert("Sei loggato con " + currentBankAccount.username);

let running = true
let userInput, returnVal;
while(running) {
    userInput = +prompt("1. Balance\n2. Transaction History\n3. Withdraw\n4. Deposit\n5. Exit");

    switch(userInput){
        case 1:
            alert(currentBankAccount.getBalance());
            break;
        case 2:
            alert(currentBankAccount.getHistory());
            break;
        case 3:

        case 5:
            running = false;
    }
}