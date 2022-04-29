// T-shirts info
let products = {
    'white': {
        
        'plain': {
            'unit_price': 5.12,
            'photo': 'v-white.jpg' 
        },
        'printed': {
            'unit_price': 8.95,
            'photo': 'v-white-personalized.jpg' 
        }
    },
    
    'colored': {
        'plain': {
            'unit_price': 6.04,
            'photo': 'v-color.jpg' 
        },
        'printed': {
            'unit_price': 9.47,
            'photo': 'v-color-personalized.png' 
        }
    }
}


// Search params

let search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
}



$(function(){
    
    
    // function number1 * getting older details
    function update_params(){
        search_params.color = $("#color .color-option.option-button.selected").attr('id');
        
        
        search_params.quality = $("#quality .quality-option.option-button.selected").attr('id');
        
        
        search_params.style = $("#style").val();
        
        search_params.quantity = parseInt($("#quantity").val());
        
        
        
        console.log(search_params);
        update_older_details();
    }
    
    
    
    // function number2 * update older details
    
    function update_older_details() {
        
        $(".refresh-loader").show();
        
        //0
        $("#result-quantity").html(search_params.quantity);
        
        //1
        let colorId = "#" + search_params.color;
        $("#result-color").html( $(colorId).text() );
        
        //2
        let qualityId = "#" + search_params.quality;
        $("#result-quality").html( $(qualityId).text() );
        
        //3
        let styleSelector = "#style option[value=" + search_params.style + "]";
        $("#result-style").html( $(styleSelector).text() );
        
        //4
        let older_Totel = totel_Price;
        $("#total-price").text( older_Totel );
        
        //5
        let photoUrl = "img/" + products[search_params.color][search_params.style].photo;
        $("#photo-product").attr("src", photoUrl)
        
        
        $(".refresh-loader").hide();
    };
    
    
    // function number3 * counting the totel price and return it
    function totel_Price() {
        
        let unitPrice = products[search_params.color][search_params.style].unit_price;
        
        
        
        if (search_params.quality == "q190") {
            unitPrice *= 1.12;
        }
        
        let totel_price0 = unitPrice * search_params.quantity;
        
        if (search_params.quantity >= 1000) {
            totel_price0 *= 0.08;
        } else if (search_params.quantity >= 100) {
            totel_price0 *= 0.95;
        } else if (search_params.quantity >= 500) {
            totel_price0 *= 0.88;
        }
        
        return totel_price0.toLocaleString('en-US', {style:'currency', currency:'USD'});
        update_older_details();
    };
    
    $("#quantity").change(function(){
        search_params.quantity = parseInt($("#quantity").val());
        update_older_details();
    });
    
    $("#style").change(function(){
        search_params.style = $("#style").val();
        update_older_details();
    });
    
    $(".option-button").click(function(){
        let clickedParam = $(this).parent().attr("id");
        let childSelctor = "#" + clickedParam + " .option-button";
        let selectedChild = "#" + clickedParam + " .option-button.selected";
        
        $(childSelctor).removeClass("selected");
        $(this).addClass("selected");
        search_params[clickedParam] = $(selectedChild).attr("id");
        
        update_older_details();
    });

    update_params();
    
})
