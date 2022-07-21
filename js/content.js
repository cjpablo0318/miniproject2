$(document).ready(function() {
    $(".product-container").click(function() {
        let img = $(this).children('.product-details')
        .children('.row').children('.item-center').children('img'); 
        img.animate({
            position : 'absolute',
            left: '100px',
        },'slow');
        //createImgElement(img, this);

    });

    createImgElement = (img, parent) => {
        let newImg = document.createElement('img');
        
        $(newImg)
            .attr('src', img.attr('src'))
            .css('position', 'absolute')
            .css('height', img.css('height'))
            .css('width', img.css('width'))
            .css('left', getElementPosition(parent).left + 40)
            .css('top', getElementPosition(parent).top + 20)
            .appendTo('body');
    }
});

//initialized elements
const productsLists = document.getElementById('productLists');

//loading data
_initData = () =>{
    productsLists.innerHTML = productsPlaceHolder(10);
}

getElementPosition = (element) => {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
}

//adding placeholders while waiting for the data from the api
productsPlaceHolder = (number) =>{
    let product = '';
    
    for(let i = 0; i < number; i++){
        product += 
                '<div class="col-xl-2 col-lg-2 col-md-3 col-sm-6 g-2">'+
                        '<div class="product-container">'+
                            '<div class="p-2">'+
                                '<div class="row">'+
                                    '<div class="product-btns px-3 py-1">'+
                                        '<div class="product-btn-item item-center float-start placeholder-glow">'+

                                        '</div>'+
                                        '<div class="product-btn-item item-center float-end ">'+
                                            
                                        '</div>'+
                                    '</div>'+
                                    '<div class="item-center">'+
                                        '<img src="../miniproject2/img/placeholderimage.png" alt="" class="product-img" style="width: 100%; margin-top: -40px">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="row product-details placeholder-glow">'+
                                    '<p class="product-name placeholder bg-secondary col-9"></p>'+
                                    '<span class="product-label-light placeholder col-7">Price</span>'+
                                    '<span class="product-price placeholder bg-secondary col-6 mt-2"></span> '+
                                    '<span class="product-price placeholder bg-secondary col-7 mt-2 mb-2"></span> '+
                                '</div>'+
                                '<div class="row product-details">'+
                                    '<button class="btn-0 disabled placeholder"></button>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
    }

    return product; 
}

//get the product container filled with data from the api
getProduct = (...details) =>{
    let product = ''+
        '<div class="col-xl-2 col-lg-2 col-md-3 col-sm-6 g-2">'+
            '<div class="product-container">'+
                '<div class="">'+
                    '<div class="row">'+
                        '<div class="product-btns px-3 py-1">'+
                            '<div class="product-btn-item item-center float-start">'+
                                '<i class="fa-solid fa-cart-plus"></i>'+
                            '</div>'+
                            '<div class="product-btn-item item-center float-end ">'+
                                '<i class="fa-solid fa-heart"></i>'+
                            '</div>'+
                        '</div>'+
                        '<div class="item-center">'+
                            '<img src="' + details[0] + '" alt="" class="product-img">'+
                        '</div>'+
                    '</div>'+
                    '<div class="row product-details">'+
                        '<p class="product-name">' + details[1] + '</p>'+
                        '<p class="product-label-light">Price</p>'+
                        '<p class="product-price">'+
                            '<span class="product-price-now">Php ' + (parseInt(details[2]) * 50) + '</span> '+
                            '<span class="product-price-orig"><del>Php 500</del></span>'+
                        '</p> '+
                    '</div>'+
                    '<div class="row product-details">'+
                        '<button class="btn-0">Shop Now</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';
return product; 
}

//fetch data 
apiResponse = async (url, method = "GET", ...values) =>{
    let options = {};

     switch(method){
         case 'GET': {
             options = {
                 method: 'GET',
                 headers: {
                     'X-RapidAPI-Key': 'abb1494fe4msh22d35c579ba0b72p1eba2ajsn5dd3bf5cdfbc',
                     'X-RapidAPI-Host': 'ebay-scraper.p.rapidapi.com'
                 }
             };
             break;
         }
         case 'POST' :{
             options = {
                 method: 'POST',
                 headers: {
                     'content-type': 'application/json',
                     'X-RapidAPI-Key': 'abb1494fe4msh22d35c579ba0b72p1eba2ajsn5dd3bf5cdfbc',
                     'X-RapidAPI-Host': 'ebay-scraper.p.rapidapi.com'
                 },
                 body: '{"product_id":'+ values[0] +'}'
             };
         }
     }
    
    

    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}

//call each api
apiCall = async () =>{
    //const categories = await apiResponse("https://amazon-scraper-api.p.rapidapi.com/products/B07CRG94G3/offers?api_key=e6a3883029196b05bf63ac3db146b22c");
    //console.log(categories);

    //const todayDeals = await apiResponse("https://ebay-scraper.p.rapidapi.com/product-details", 'POST', '314027101165');
    //console.log(todayDeals);
    //return;
    const products = await apiResponse("https://fakestoreapi.com/products");
    //const currentLogIn = await apiResponse('./php/ennea.api.php?email=fsdfsdf&password=asdasd');
    //console.log(currentLogIn);
    

    //load all products after fetching the data
    productsLists.innerHTML = "";
    for(let i = 0; i < products.length; i++){
        productsLists.innerHTML += getProduct(products[i].image, products[i].title, products[i].price);
    }
    
}

_initData();
apiCall();

console.log(getElementPosition(document.getElementById('productLists')));

