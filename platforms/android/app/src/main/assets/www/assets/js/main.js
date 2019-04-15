function openNav() {

    document.getElementById("mySidenav").style.width = "280px";
    //document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("main").style.width = "100%";
    $('body').css({"position":"fixed","width":"100%"});
    $('.backdrop').css('display', 'block');
}

function closeNav() {
    if (event.target.id != 'asdf') {
        $("#mySidenav").attr('style', 'width=block');
        //document.getElementById("main").style.marginLeft= "0";
        $('body').css({"position":"relative","width":"100%"});
        $('.backdrop').css('display', 'none');
    }
}







//  START Banner SLIDER 

var owl = $('.owl1');
owl.owlCarousel({
    nav: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
});


//  START Category SLIDER 

var owl1 = $('.owl2');
owl1.owlCarousel({
    margin: 10,
    nav: false,
    loop: true,
    autoplay: false,
    dots: false,
    responsive: {
        0: {
            items: 5.5
        },
        600: {
            items: 5.5
        },
        1000: {
            items: 5.5
        }
    }
});


//  START Offer SLIDER 

var owl2 = $('.owl3');
owl2.owlCarousel({
    margin: 0,
    nav: false,
    loop: true,
    autoplay: false,
    dots: false,
    responsive: {
        0: {
            items: 1.2
        },
        600: {
            items: 1.2
        },
        1000: {
            items: 1.2
        }
    }
});


//  START boutique SLIDER 

var owl3 = $('.owl4');
owl3.owlCarousel({
    margin: 0,
    nav: false,
    loop: true,
    autoplay: false,
    dots: false,
    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});

//  START product view SLIDER 

var owl4 = $('.owl5');
owl4.owlCarousel({
    margin: 0,
    nav: false,
    loop: false,
    autoplay: false,
    dots: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
});



//PROFILE IMAGE EDITOR
$(document).ready(function () {
    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    };

    $("#imgInp").change(function () {
        readURL(this);
    });
});


// Cart ADd_Subs Button 




    $(".add_cart_button > button").click(function () {
        //alert();
        $(this).parents(".add_cart_button").siblings().show();
        $(this).parents(".add_cart_button").hide();
        //$(this).parents(".add_item_container").append('<div class="add_item_button"><button class="less_item">-</button><input type="text" value="1" disabled=""><button class="add_item">+</button></div>')
    });

    var incrementPlus;
    var incrementMinus;

    var buttonPlus = $(".add_item");
    var buttonMinus = $(".less_item");

    var incrementPlus = buttonPlus.click(function () {
        //alert("increment");
        var $n = $(this).siblings("input");
        $n.val(Number($n.val()) + 1);
    });

    var incrementMinus = buttonMinus.click(function () {
        //alert("decrement");
        var $n = $(this)
            .siblings("input");
        var amount = Number($n.val());
        if (amount > 1) {
            $n.val(amount - 1);
        } else if (amount == 1) {
            $(this).parents(".add_item_button").siblings().show();
            $(this).parents(".add_item_button").hide();
        }
    });
//});



// For Filter page

function openFilter() {

    document.getElementById("mySidenav-right").style.left = "0";
    //document.getElementById("filter-header").style.left = "0";
    //document.getElementById("main").style.width = "100%";
}

function closeFilter() {
    //$('input').prop('checked', false);
    document.getElementById("mySidenav-right").style.left = "100vw";

}


function addMoney1(){
    //alert()
     $(".wrap-money-all").slideToggle();
}




// Filter Accordian code

$(document).ready(function () {

});

//date picker

/* $( function() {
    $( "#datepicker" ).datepicker();
}); */


