const BANK_ACCOUNTS = [];
const BALANCE_DECIMAL_POINTS = 2;

let currentBankAccount;

function addAccount({ username, pin, amount }) {
    BANK_ACCOUNTS.push({
        username: username,
        pin: pin,
        balance: amount,
        transactions: [],
        logTransaction(type, amount) {
            this.transactions.push({
                type: type,
                amount: amount,
                date: new Date().toISOString()
            })
        },
        withdraw(withdraw_amount) {
            if (withdraw_amount > this.balance) {
                return "You wish you had the money eheh";
            } else if (withdraw_amount <= 0) {
                return "You can't withdraw a negative amount of money."
            }

            this.balance -= withdraw_amount;
            this.logTransaction("withdraw", withdraw_amount);

            return "Success!\n" + this.getBalance();
        },
        deposit(deposit_amount) {
            if (deposit_amount <= 0) {
                return "You can't deposit a negative amount of money.";
            }

            this.balance += deposit_amount;
            this.logTransaction("deposit", deposit_amount);

            return "Success!\n" + this.getBalance();
        },
        getBalance() {
            return `You currently have €${this.balance.toFixed(BALANCE_DECIMAL_POINTS)}`;
        },
        sendTo(user, amount) {
            if (this.balance < amount) {
                return "You don't have enough money!";
            } else if (amount <= 0) {
                return "You can't transfer a zero or a negative amount of money!";
            }

            user.balance += amount;
            this.balance -= amount;

            return "The money were sent to the user!";
        },
        getHistory() {
            let return_val = "Here's your transaction history:";

            if (this.transactions.length === 0) {
                return_val += "\nNo transaction to list :(";
                return return_val;
            }

            for (let transaction of this.transactions) {
                return_val += `\n${("-").repeat(20)}\nType: ${transaction.type}\nAmount: ${transaction.amount}\nDate: ${transaction.date}`;
            }

            return return_val
        }
    })
}

function getAccountFromUsername(username) {
    username = username.toLowerCase()

    for (let account of BANK_ACCOUNTS) {
        if (account.username.toLowerCase() === username) {
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
    } while (!selectedBankAccount);

    // Request pin
    let pin;

    while (true) {
        pin = prompt("Insert your pin:")

        if (pin === selectedBankAccount.pin) {
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
    } while (isNaN(amount) || amount === 0);

    return amount;
}

addAccount({
    username: "Carlo",
    pin: "1010",
    amount: 0
})
addAccount({
    username: "Gertrude",
    pin: "1292",
    amount: 0
})
addAccount({
    username: "Luca",
    pin: "1524",
    amount: 0
})
addAccount({
    username: "Marco",
    pin: "0000",
    amount: 0
})

currentBankAccount = promptAuthentication();

alert("You're now logged in as " + currentBankAccount.username);

let running = true
let userInput, returnVal;
let actionList = currentBankAccount.admin && "1. Show bank accounts"
while (running) {
    userInput = +prompt("1. Balance\n2. Transaction History\n3. Withdraw\n4. Deposit\n5. Send money\n6. Logout\n7. Exit");

    switch (userInput) {
        case 1:
            returnVal = currentBankAccount.getBalance();
            break;
        case 2:
            returnVal = currentBankAccount.getHistory();
            break;
        case 3:
            returnVal = currentBankAccount.withdraw(promptAmount());
            break;
        case 4:
            returnVal = currentBankAccount.deposit(promptAmount());
            break;
        case 5:
            let name = prompt("Insert username: ");
            let found = getAccountFromUsername(name);

            if (!found) {
                returnVal = "Insert a valid username!";
                break;
            }

            returnVal = currentBankAccount.sendTo(found, promptAmount());
            break;
        case 6:
            currentBankAccount = promptAuthentication()
            returnVal = `You're now logged in as ${currentBankAccount.username}!`
            break;
        case 7:
            running = false;
            returnVal = "Thank you for using my Bank System.";
            break;
        default:
            returnVal = "Please, insert a valid input.";
    }

    alert(returnVal);
}