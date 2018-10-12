$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.email);
    });

    $(document).on("click", "#addme", function (event) {
        event.preventDefault();
        console.log("---------------  Add was clicked---------")
        addme();
    })

    $(document).on("click", "#updateme", function (event) {
        event.preventDefault();
        console.log("---------------  Update was clicked---------")
        updateme();
    })

    $(document).on("click", "#deleteme", function (event) {
        event.preventDefault();
        console.log("------------Delete was clicked---------")
        deleteme()
    })

    $(document).on("click", "#getlist", function (event) {
        event.preventDefault();
        console.log("------------get list was clicked---------")
        getlist()
    })

    $(document).on("click", "#getbyid", function (event) {
        event.preventDefault();
        console.log("------------get by id was clicked---------")
        getbyid()
    })

    $('#productlisttable').DataTable({
        "ajax": {
            url: "/api/v2/products",
            get: 'GET'
        },
        "scrollY": '50vh',
        "scrollCollapse": true,
        "paging": false
    })


});


/*
Add a product to WARRANTY WARRIOR!!!
 addme() pulls the data from forms and formats the object to be added
 submitNewProduct() sends the object to the server so it can be added to the DB
*/

// this function creates the object to add  
function addme() {
    let newProduct = {}
    console.log('i am in the addme function!')
    // build newProduct object in correct format to add to database
    newProduct.purchase_date = $("#productdatepurchased").val().trim()
    newProduct.product_name = $("#productname").val().trim()
    newProduct.warranty_expire_date = $("#productwarranty").val().trim()
    newProduct.product_price = $("#productprice").val().trim()
    newProduct.store = $("#productstore").val().trim()
    newProduct.receipt_URL = $("#productreceipturl").val().trim()
    newProduct.warranty_URL = $("#productwarrantyurl").val().trim()
    newProduct.notes = $("#productnotes").val().trim()
    console.log("I am in finishing addme", newProduct)
    submitNewProduct(newProduct)
}




// this function actually calls the API method that updates the database
function submitNewProduct(newProduct) {
    // this api call will add the user object also  
    $.post("/api/v2/product", newProduct, function (newProduct) {
        console.log("My stuff has been submitted to DB!", newProduct)
    })
}


/*
Update an existing product of WARRANTY WARRIOR!!!
 updateme() pulls the data from forms and formats the object to be updated
 submitUpdateProduct() sends the object to the server so the server can update the appropriate entry
*/


// this function creates the object to update
function updateme() {
    let updateProduct = {}
    console.log('i am in the updateme function!')
    // build updateProduct object in correct format to add to database
    updateProduct.id = $("#udproductid").val().trim()
    updateProduct.purchase_date = $("#udproductdatepurchased").val().trim()
    updateProduct.product_name = $("#udproductname").val().trim()
    updateProduct.warranty_expire_date = $("#udproductwarranty").val().trim()
    updateProduct.product_price = $("#udproductprice").val().trim()
    updateProduct.store = $("#udproductstore").val().trim()
    updateProduct.receipt_URL = $("#udproductreceipturl").val().trim()
    updateProduct.warranty_URL = $("#udproductwarrantyurl").val().trim()
    updateProduct.notes = $("#udproductnotes").val().trim()
    console.log("I am in updateme", updateProduct)
    submitUpdateProduct(updateProduct)
}



// this function actually calls the API method that updates the database
function submitUpdateProduct(updateProduct) {
    // this api call will add the user object also  
    $.ajax({
        method: "PUT",
        url: "/api/v2/product",
        data: updateProduct
    }).then(function (updateProduct) {
        console.log("I have updated the file!", updateProduct)
    })
}


/*
Delete an existing product of WARRANTY WARRIOR!!!
  deleteme() creates the object t
  submitDeleteProduct submits the object to the server for deletion
*/

function deleteme() {
    let delProdID = $("#delproductid").val().trim()
    console.log("I am in delete!")
    submitDeleteProduct(delProdID)
}


// this function actually calls the API method that updates the database
function submitDeleteProduct(delProduct) {
    console.log("I am inside the submit Delete functin")
    $.ajax({
        method: "DELETE",
        url: "/api/v2/product/" + delProduct,
    }).then(function () {
        console.log("I have deleted ", delProduct)
    })
}


/*
The get functions below
*/

function getlist() {
    $.get("/api/v2/product", function (data) {
        console.log(data)
        console.log("Data is above")
        let newdata = JSON.stringify(data)
        console.log("New DAta", newdata)
        $("#resultproductlist").html(newdata)
    })
}


function getbyid() {
    productID = $("#productid").val().trim()
    let url = "/api/v2/product/" + productID
    console.log("get by id: ", productID)
    $.get(url, function (data) {
        console.log(data)
        console.log("Data is above")
        let newdata = JSON.stringify(data)
        console.log("New DAta", newdata)
        $("#resultproductid").html(newdata)
    })
}

