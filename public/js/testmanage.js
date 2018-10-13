let picker, picker2

$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.email);
    });


    // this is the TABLE for the main web page 
    // product list display    see testlist.html
    var maintable = $('#productlisttable').DataTable({
        "select": "on",
        "ajax": {
            url: "/api/v2/productdata",
            get: 'GET'
        },
        "columns": [
            { data: 'warranty_expire_date' },
            { data: 'purchase_date' },
            { data: 'product_name' },
            { data: 'product_price' },
            {
                'data': null,
                "defaultContent": "<button class='productdelete'> X </button> <button class='productedit'> E </button>"
            },
        ],
        "scrollY": '50vh',
        "scrollCollapse": true,
        "paging": false,
        "order": [
            [0, "asc"]
        ]
    })


    // create calendar input with the popout calendar
    const picker = datepicker('#up_purchasedate');
    const picker2 = datepicker("#up_warrantyexp");

    // act on delete button on table
    $('#productlisttable tbody').on("click", "button.productdelete", function () {
        let data = maintable.row($(this).parents('tr')).data();
        console.log(data)
        showDeleteModal("DELETE REQUEST", "Are you sure you want to delete this record?", data)
    })


    // delete confirmation
    $(document).on("click", "#confirmdelete", function () {
        let idinfo = $(this).data("id")
        console.log("Before you delete: ", idinfo)
        submitDeleteProduct(idinfo)
    })

    // act on edit button on table
    $('#productlisttable tbody').on("click", "button.productedit", function () {
        let data = maintable.row($(this).parents('tr')).data();
        console.log(data)
        showUpdateModal("UPDATE REQUEST", "Stuff inside here to update", data)
        // alert("Update Operation: " + data['product_name'] + "'s ID is: " + data['id'])
    })

    // update confirmation
    $(document).on("click", "#confirmupdate", function () {
        // capture updated information
        captureDataAndUpdate()
    })



});

function captureDataAndUpdate(data) {
    //disable button while processing request
    // $("#confirmupdate").prop("disabled", true)

    // Grabs user input
    let updateProduct = {}
    console.log('i am in the updateme function!')
    // build updateProduct object in correct format to add to database
    updateProduct.id = $("#confirmupdate").data()
    updateProduct.purchase_date = moment($("#up_purchasedate").val().trim()).format("YYYY-MM-DD HH:mm:ss");
    updateProduct.product_name = $("#up_prodname").val().trim()
    updateProduct.warranty_expire_date = moment($("#up_warrantyexp").val()).trim().format("YYYY-MM-DD HH:mm:ss");
    updateProduct.product_price = $("#up_prodprice").val().trim()
    updateProduct.store = $("#up_store").val().trim()
    //updateProduct.receipt_URL = $("#udproductreceipturl").val().trim()
    //updateProduct.warranty_URL = $("#udproductwarrantyurl").val().trim()
    updateProduct.notes = $("#up_notes").val().trim()
    console.log("I am in updateme", updateProduct)
    // submitUpdateProduct(updateProduct)

}


// this is the function for the main table as well.    
function showUpdateModal(status, statusmessage, data) {

    $("#confirmupdate").attr('data-id', data.id)

    $("#up_status").val(status)
    $("#up_statusmessage").val(statusmessage)
    $("#up_purchasedate").val(data.purchase_date)
    $("#up_prodname").val(data.product_name)
    $("#up_warrantyexp").val(data.warranty_expire_date)
    $("#up_prodprice").val(data.product_price)
    $("#up_store").val(data.store)
    $("#up_receipturl").attr("src", data.receipt_URL)
    $("#up_warrantyurl").attr("src", data.warranty_URL)
    $("#up_notes").val(data.notes)


    $("#updateModal").modal("show")
}


// this is the function for the main table as well.    
function showDeleteModal(status, statusmessage, data) {

    $("#confirmdelete").attr('data-id', data.id)

    $("#status").html(status)
    $("#statusmessage").html(statusmessage)

    $("#prodcreate").html(data.createdAt)
    $("#produpdate").html(data.updatedAt)
    $("#purchasedate").html(data.purchase_date)
    $("#prodname").html(data.product_name)
    $("#warrantyexp").html(data.warranty_expire_date)
    $("#prodprice").html(data.product_price)
    $("#store").html(data.store)
    $("#receipturl").attr("src", data.receipt_URL)
    $("#warrantyurl").attr("src", data.warranty_URL)
    $("#notes").html(data.notes)


    $("#deleteModal").modal("show")
}





/*
Update an existing product of WARRANTY WARRIOR!!!
 updateme() pulls the data from forms and formats the object to be updated
 submitUpdateProduct() sends the object to the server so the server can update the appropriate entry
*/



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


// this function actually calls the API method that updates the database
function submitDeleteProduct(delProduct) {
    console.log("I am inside the submit Delete functin")
    $.ajax({
        method: "DELETE",
        url: "/api/v2/product/" + delProduct,
    }).then(function () {
        console.log("I have deleted ", delProduct)
        location.reload()
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
