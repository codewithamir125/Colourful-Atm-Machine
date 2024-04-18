import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 5000;
let myPin = 1234;
// Print welcome message
console.log(chalk.blue("\n \tWelcome To \'Code With Amir\' - ATM Machine\n"));
// Prompt the user to enter their PIN
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code:")
    }
]);
// Check if the entered PIN is correct
if (pinAnswer.pin === myPin) {
    console.log(chalk.bold.green("\n Pin is Correct ! Login Successful\n"));
    // Prompt the user to select (withdraw or check balance)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.hex('#99CCFF')("Select your operation: "),
            choices: ["Withdraw Ammount", "Check Balance"]
        }
    ]);
    // If the user selects "Withdraw"
    if (operationAns.operation === "Withdraw Ammount") {
        // Prompt the user to select ("Fast Cash" or "Enter Amount")
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.hex('#99CCFF')("Choose withdrawal method:"),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        // If the user selects "Fast Cash"
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk.hex('#CCFFFF')("Select Amount:"),
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ]);
            // Check if the user have sufficient balance
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("\nInsufficient Balance"));
            }
            else {
                // Withdraw the selected fast cash amount from the user's balance
                myBalance -= fastCashAns.fastCash;
                console.log(`\n${chalk.green("$", fastCashAns.fastCash)} Withdraw Successfully !`);
                console.log(`Your Remaining Balance is ${chalk.greenBright("$", myBalance)}`);
            }
        }
        // If the user selects "Enter Amount"
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.hex('#CCFFFF')("Enter amount to withdraw: ")
                }
            ]);
            // Check if the user have sufficient balance
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("\nInsufficient Balance"));
            }
            else {
                // Withdraw the selected amount from the user's balance
                myBalance -= amountAns.amount;
                console.log(`\n${chalk.greenBright("$", amountAns.amount)} Withdraw Successfully !`);
                console.log(`Your Remaining Balance is ${chalk.greenBright("$", myBalance)}`);
            }
        }
    }
    // If the user selects "Check Balance"
    else if (operationAns.operation === "Check Balance") {
        console.log(`\nYour Balance is ${chalk.greenBright("$", myBalance)}`);
    }
}
// If the entered PIN is incorrect
else {
    console.log(chalk.red("\nPin is Incorrect, Try Again!"));
}
