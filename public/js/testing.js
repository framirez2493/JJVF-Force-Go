$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.email);
    });

    $(document).on("click", "#addme", function(event){
        event.preventDefault();
        console.log("---------------  Add was clicked---------")
        addme();
    })

    $(document).on("click", "#updateme", function(event){
        event.preventDefault();
        console.log("---------------  Update was clicked---------")
        updateme();
    })

  });


// this function creates the object to add  
function addme(){
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
    submitProduct(newProduct)
}


// this function creates the object to update
function updateme(){
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
function submitProduct(newProduct) {
    // this api call will add the user object also  
    $.post("/api/v2/product", newProduct, function(newProduct){
        console.log("My stuff has been submitted to DB!", newProduct)
    })
}


// this function actually calls the API method that updates the database
function submitUpdateProduct(updateProduct) {
    // this api call will add the user object also  
    $.ajax({
        method: "PUT",
        url: "/api/v2/product",
        data: updateProduct
    }).then(function(updateProduct){
        console.log("I have updated the file!", updateProduct)
    })
/*
    $.put("/api/v2/product", updateProduct, function(updateProduct){
        console.log("My stuff has been submitted to DB!", updateProduct)
    })
*/
}


