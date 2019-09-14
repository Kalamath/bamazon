var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\n ============================================================================");
    console.log("\n Welcome to Bamazon")
    console.log("\n Check out our HOTTEST items! \n")
    showItems();
});

function showItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + "$" + res[i].price);
        }
        console.log("-----------------------------------");
        buyItem();
    })
}

function buyItem() {
    inquirer
        .prompt({
            name: "toBuy",
            type: "list",
            message: "Would you like to purchase an item?",
            choices: ["BUY", "NO, I'M GOOD"]
        })
        .then(answers => {
            if (answers.toBuy === "BUY") {
                whichItem();
                console.log("\nShweet :) \n");
            } else {
                connection.end();
                console.log("\nThat's too bad :(");
            }
        })
}

function whichItem() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "idChoice",
                type: "input",
                message: "What is the ID of the item you'd like?",
            },
            {
                name: "amountChoice",
                type: "input",
                message: "How many of this item would you like?"
            }
        ])
            .then((answers) => {
                // console.log(answers);
                var itemID = answers.idChoice;
                var amount = parseInt(answers.amountChoice);
                // console.log(itemID, amount)

                connection.query(
                    "SELECT * FROM products WHERE item_id = " + itemID,
                    function (err, res) {
                        if (err) throw err;

                        for (var result of res) {
                            // console.log(result);
                            var quantity = parseInt(result.stock_quantity);
                            var cost = parseFloat(result.price);
                            var totalCost = (cost * amount).toFixed(2);
                            var newInventory = quantity - amount;

                            inquirer
                            .prompt({
                                name: "checkout",
                                    type: "confirm",
                                    message: "Would you like to check out? \n"
                                })
                                .then((answers) => {
                                    if (quantity < amount) {
                                        console.log("\nSorry we only have " + result.stock_quantity + " left :(\n");
                                        whichItem();
                                    } else if (quantity > amount, answers.checkout) {
                                        console.log("\nYour total will be " + "$" + totalCost + "\n");
                                        inventoryUpdate(newInventory, itemID);
                                    }
                                })
                            // console.log(newInventory);
                        }
                    })

            })
    })
}

function inventoryUpdate(newInventory, itemID) {
    connection.query(
        "UPDATE products SET ? WHERE item_id = " + itemID,
        { stock_quantity: newInventory },
        function (err, res) {
            if (err) throw err;
            console.log("\nThanks for shopping with Bamazon!");
        });
    connection.end();
}













