var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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

connection.connect();

connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    productView();
    // console.log("\n ============================================================================");
    // console.log("\n Welcome to Bamazon")
    // console.log("\n Check out our HOTTEST items! \n")
    // console.log(results[0].item_id, results[0].product_name, results[0].price);
    // console.log(results[1].item_id, results[1].product_name, results[1].price);
    // console.log(results[2].item_id, results[2].product_name, results[2].price);
    // console.log(results[3].item_id, results[3].product_name, results[3].price);
    // console.log(results[4].item_id, results[4].product_name, results[4].price);
    // console.log(results[5].item_id, results[5].product_name, results[5].price);
    // console.log(results[6].item_id, results[6].product_name, results[6].price);
    // console.log(results[7].item_id, results[7].product_name, results[7].price);
    // console.log(results[8].item_id, results[8].product_name, results[8].price);
    // console.log(results[9].item_id, results[9].product_name, results[9].price);
});

connection.end();

// connection.connect(function (err) {
//     if (err) throw err;
//     productView();
//     // runSearch();
// });

// var item;

function productView() {
    connection.query(
        'SELECT * FROM products', function (error, results) {
            // if (error) throw error;
            var table = new Table({ head: ["Item ID", "Product Name", "Price"] });
            console.log("\n ============================================================================");
            console.log("\n Welcome to Bamazon")
            console.log("\n Check out our latest items!")
            table.push(
                ['1', 'Beats Wireless Buds', '$179.99'],
                ['2', 'PS4', '$299.99'],
                ['3', 'Nintendo Switch', '$249.99'],
                ['4', 'Q-Tips', '$4.99'],
                ['5', 'Shampoo', '$6.99'],
                ['6', 'Case of Water', '$5.99'],
                ['7', 'Red Grapes', '$5.99'],
                ['8', 'Air Jordan 1', '$119.99'],
                ['9', 'Addidas Tiro Pants', '$34.99'],
                ['10', 'Panasonic Stereo', '$99.99'],
            )

            console.log("\n" + table.toString() + "\n");

            buyItem();
        }
    )
}

function buyItem() {
    inquirer
        .prompt({
            name: "toBuy",
            type: "confirm",
            message: "Would you like to purchase an item? (Hit Enter for YES)",
        })
        .then(answers => {

        })
}



