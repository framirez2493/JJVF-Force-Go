let picker, picker2
const CLAUDINARY_URL = 'https://api.cloudinary.com/v1_1/fr7/upload';
const CLAUDINARY_UPLOAD_PRESET = "xewk1otu"

$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.email);
    });

    var fileUpload = document.getElementById('file-upload');

    if (fileUpload != null) {
        attachListener(fileUpload);

    }

    const picker = datepicker('#purchase');
    const picker2 = datepicker("#lengtWarranty");


    $("#add-pic-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var url = $("#receipt").val().trim();
        var date = moment($("#purchase").val().trim()).format("YYYY-MM-DD HH:mm:ss");
        var namepic = $("#name").val().trim();
        var price = $("#price").val().trim()
        var warrantyl = moment($("#lengtWarranty").val().trim()).format("YYYY-MM-DD HH:mm:ss");
        var storename = $("#store").val().trim();


        // Creates local "temporary" object for holding employee data
        var products = {
            dateOfpurchase: date,
            Product: namepic,
            price: price,
            Warranty: warrantyl,
            store: storename,
            info: url
        };
        console.log(products);
    });

});


// picture preview tool

function attachListener(fileUpload) {
    var imgPreview = document.getElementById('img-preview');
  
  
    fileUpload.addEventListener('change', function (event) {
      var file = event.target.files[0];
      var formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLAUDINARY_UPLOAD_PRESET);
      //console.log(file);
      axios({
        url: CLAUDINARY_URL,
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
      }).then(function (res) {
        imgPreview.src = res.data.secure_url;
        //append(imgPreview.src);
  
        console.log(imgPreview.src);
  
        $("#receipt").val(imgPreview.src);
        console.log(imgPreview.src);
  
  
      }).catch(function (err) {
        console.log(err);
  
      });
    });
  }
  
  

// this is the function for the main table as well.    
function showListModal(data) {

    $("#prodcreate").html(data.createdAt)
    $("#produpdate").html(data.updatedAt)
    $("#purchasedate").html(data.purchase_date)
    $("#prodname").html(data.product_name)
    $("#warrantyexp").html(data.warranty_expire_date)
    $("#prodprice").html(data.product_price)
    $("#store").html(data.store)
    $("#receipturl").attr("src", data.receipt_URL)
    $("#warranty").attr("src", data.warranty_URL)
    $("#notes").html(data.notes)


    $("#listModal").modal("show")
}



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

