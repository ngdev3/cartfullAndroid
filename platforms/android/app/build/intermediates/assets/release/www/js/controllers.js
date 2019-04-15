$(document).ready(function () {
    if (localStorage.getItem("device_uniques") == "" || localStorage.getItem("device_uniques") == null || typeof (Storage) == "undefined") {

        var text = "Aamari_" + Math.floor(+new Date() / 1000);
        //alert("first");
        // Store
        localStorage.setItem("device_uniques", text);
        // Retrieve
        // var abc = localStorage.getItem("lastname");
    }//else{
    var abc2 = localStorage.getItem("device_uniques");
    window.value = abc2;
    sessionStorage.u_ids = abc2;

});