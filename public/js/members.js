
const cloudName = 'fr7';
const unsignedUploadPreset = 'xewk1otu';

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
});
//var cloudinary = require("cloudinary-core"); // If your code is for ES5
//import cloudinary from “cloudinary-core”;    // If your code is for ES6 or higher

//var cl = new cloudinary.Cloudinary({cloud_name: "demo", secure: true});


