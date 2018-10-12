$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.email);
    });
    $(document).on("click", "#addme", function(event){
        event.preventDefault();
        console.log("---------------  I was clicked---------")
        alert("see me?")
    })
  });


function addme(){
   
    let newProduct = {}
    // build newProduct object in correct format to add to database
    newProduct.purchase_date = $("#datepurchased").val().trim()
    newProduct.product_name = $("#productname").val().trim()
    newProduct.warranty_expire_date = $("#warrantylength").val().trim()
    console.log("------------->\n",newProduct)
    // submitProduct(newProduct)
}


function submitProduct(newProduct) {
    $.post("/api/v2/product", newProduct, function(){
        console.log("My stuff has been submitted to DB!")
    })
}




