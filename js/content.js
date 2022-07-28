
//initialized elements
const productsLists = document.getElementById('productLists');
const youMayAlsoLIke = document.getElementById('youMayAlsoLIke');
const productSpecificDetails = document.getElementById('productSpecificDetails');
const todaysDeal = document.getElementById('todaysDeal');
const categories = document.getElementById('categories');

//loading data
_initData = () =>{
    if(productsLists != null){
        productsLists.innerHTML = productsPlaceHolder(10);
    }
    if(youMayAlsoLIke != null){
        youMayAlsoLIke.innerHTML = productsPlaceHolder(12);
    }
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
    const isValid = (name) => /^\d/.test(name);

    if(isValid(details[1])){
        return "";
    }

    let product = ''+
        '<div class="col-xl-3 col-lg-4 col-md-4 g-2">'+
            '<div class="product-container">'+
                '<div class="">'+
                    '<div class="row">'+
                        '<div class="product-btns px-3 py-1">'+
                            '<div class="product-btn-item item-center float-start" onclick="addToCart('+details[3]+',1)">'+
                                '<i class="fa-solid fa-cart-plus"></i>'+
                            '</div>'+
                            '<div class="product-btn-item item-center float-end ">'+
                                '<i class="fa-solid fa-heart"></i>'+
                            '</div>'+
                        '</div>'+
                        '<a href="./productDetails.html?id=' + details[3] + '" style="text-decoration: none; color: black">' +
                        '<div class="item-center">'+
                            '<img src="' + details[0] + '" alt="" class="product-img">'+
                        '</div>'+
                    '</div>'+
                    '<div class="row product-details">'+
                        '<p class="product-name">' + details[1] + '</p>'+ 
                        '<p class="product-label-light">Price</p>'+
                        '<p class="product-price">'+
                            '<span class="product-price-now"> ' + getTotalPrice(parseInt(details[2])) + '</span> '+
                        '</p> '+
                    '</div>'+
                    '<div class="row product-details d-none">'+
                        '<a href="./productDetails.html?id=' + details[3] + '" class="btn-0 text-center p-1">Shop Now</button></a>'+
                    '</div>'+
                '</div></a>'+
            '</div>'+
        '</div>';
return product; 
}
//display the data of the specific product
getProductDetails = (details) =>{
    document.querySelector('.product-specific_img').src = details.img_url;
    document.querySelector('.product-specific-brand').innerHTML = details.specifications.Brand;
    document.querySelector('.product-specific-title').innerHTML = details.main_title;
    
    let quantity = document.querySelector('.product-specific-value');
    let price = document.querySelector('.product-specific-price');
    let counter = 1;
    let phpValue = 50;
    let finalPrice = 0;

    finalPrice = parseInt(details.price.value) * counter;
    price.innerHTML = getTotalPrice(finalPrice);

    document.querySelector('.fa-minus').onclick = function(){
        counter--;
        if(counter - 1 < 0){
            counter = 1;
        }
        quantity.innerHTML = counter;

        finalPrice = parseInt(details.price.value) * counter;
        price.innerHTML = getTotalPrice(finalPrice);
    }
    document.querySelector('.fa-plus').onclick = function(){
        counter++;
        quantity.innerHTML = counter;

        finalPrice = parseInt(details.price.value) * counter;
        price.innerHTML = getTotalPrice(finalPrice);
    }

    //review not working

    //color
    let colors = document.querySelector('.product-specific-variant-color');
    let colorCollection = ['black', 'yellow', 'white', 'blue', 'green'];
    let c = [];
    while(c.length < 3){
        let rand = Math.floor(Math.random() * colorCollection.length - 1) + 1;
        if(!c.includes(rand)){
            c.push(rand);
        }
    }

    let result = "";
    for(let i = 0; i < c.length; i++){
        result += '<button>'+ colorCollection[c[i]] +'</button>';
    }
    colors.innerHTML = result;

    //sizes
    let sizes = document.querySelector('.product-specific-variant-sizes');
    let sizeCollection = [''];
    result = "";
    for(let i = 0; i < sizeCollection.length; i++){
        result += '<button>'+ sizeCollection[i] +'</button>';
    }
    //sizes.innerHTML = result;

    //refund policy
    document.querySelector('.product-specific-refund-policy').innerHTML = details.returns;

    //shipping
    document.querySelector('.product-specific-inventory').innerHTML = details.inventory_location[0].address.city;
    document.querySelector('.product-specific-shipping').innerHTML = details.shipping.logistics.domestic_or_international == null ? "Not Available" : details.shipping.logistics.domestic_or_international;

    return;
    //more product info
    let productKeys = Object.keys(details.specifications);
    let productValues = Object.values(details.specifications);
    let productKeysHalf = Math.floor(productKeys.length / 2);
    let infoLeft = document.querySelector('.product-specific-more-info-left');
    let infoRight = document.querySelector('.product-specific-more-info-right');

   
    result = "";
    for(let i = 0; i < productKeys.length; i++){
        if(i < productKeysHalf){
           infoLeft.innerHTML += ' <h6><span class="product-specific-label">' + productKeys[i] + ' : </span>' + productValues[i] + '</h6>';
        }else{
            infoRight.innerHTML += ' <h6><span class="product-specific-label">' + productKeys[i] + ' : </span>' + productValues[i] + '</h6>';
        }
    }
    //
    sizeChange();
}

getTotalPrice = (price) =>{
    return "₱" + Math.floor((price * 50));
}
//getting the category list
getCategories = () =>{
    let categoryList = ['Men', 'Women', 'Kids', 'Swim', 'Outerwear', 'Home'];
    for(let i = 0; i < categoryList.length; i++){
        let category = '' +
        '<div class="col-lg-2 col-sm-3">' + 
            '<div class="category-container">' + 
                '<div class="row item-center py-3">' + 
                    '<img src="./img/—Pngtree—white t-shirt_2005822.png" alt="" class="img-fluid">' + 
                '</div>' + 
                '<div class="row item-center pb-4"><strong class="text-center">' + categoryList[i] +
                '</strong></div>' + 
            '</div>' + 
        '</div>';
        categories.innerHTML += category;
    }
   
}
//random products as best offer
getBestOffer = (details) =>{
    const bestImg = document.getElementById('best-img');
    const bestTitle = document.getElementById('best-title');
    const bestPrice = document.getElementById('best-price');
    const bestLink = document.getElementById('best-link')

    bestImg.src = details.img_url;
    bestTitle.innerHTML = details.main_title;

    let quantity = document.querySelector('.product-specific-value');
    let counter = 1;
    let phpValue = 50;
    let finalPrice = 0;

    finalPrice = parseInt(details.price.value) * counter;
    bestPrice.innerHTML = getTotalPrice(finalPrice);

    document.querySelector('.fa-minus').onclick = function(){
        counter--;
        if(counter - 1 < 0){
            counter = 1;
        }
        quantity.innerHTML = counter;

        finalPrice = parseInt(details.price.value) * counter;
        bestPrice.innerHTML = getTotalPrice(finalPrice);
    }
    document.querySelector('.fa-plus').onclick = function(){
        counter++;
        quantity.innerHTML = counter;

        finalPrice = parseInt(details.price.value) * counter;
        bestPrice.innerHTML = getTotalPrice(finalPrice);
    }

    //create a function to save to cart
    if(!checkCart(details.item_id)){
        bestLink.children[0].innerHTML = "Add to cart";
        bestLink.onclick = function() {
            addToCart(details.item_id, counter);
        }
    }else{
        bestLink.children[0].innerHTML = "View cart";
        bestLink.onclick = function() {
            bestLink.href = './mycart.html';
        }
    }

    //bestLink.href = "productDetails.html?id=" + details.item_id;
}

let productInfo = "";
sizeChange = () => {
    //console.log('here');
    let getBrowserWidth = function(){
        if(window.innerWidth < 768){
            // Extra Small Device
            return "xs";
        } else if(window.innerWidth < 991){
            // Small Device
            return "sm"
        } else if(window.innerWidth < 1199){
            // Medium Device
            return "md"
        } else {
            // Large Device
            return "lg"
        }
    };

    if(productInfo == ""){

    }

    if(getBrowserWidth() == 'xs'){
        document.querySelector('.product-specific-more-info-lg').innerHTML = document.querySelector('.product-specific-more-info').innerHTML;
        document.querySelector('.product-specific-more-info').innerHTML = "";
    }else{
        
    }
}

//saving data to the local storage
saveToLocal = (key, value) =>{
    localStorage[key] = JSON.stringify(value);
}
//getting data from the local storage
loadFromLocal = (key) => {
    let result = localStorage[key]  || "";
    if(result == ""){
        return "";
    }
    return JSON.parse(result);
}

//log in
let getStarted = document.getElementById("getStartedContent");
logIn = () => {
    if(getStarted != null){
        let result = '';
        result += ' <div class="container">' +
                '<div class="row item-center">' +
                    '<div class="col-lg-6 col-sm-12 content-container">' +
                        '<h3 class="item-center"><strong>Welcome back</strong></h3>' +
                        '<p class="item-center">Log in to your account</p>' +
                        '<div class="row item-center mt-5">' +
                            '<div class="col-3 social-container item-center">' +
                               '<button class="d-flex item-center">' +
                                '<i class="fa-brands fa-facebook-square pe-2" style="color: blue"></i>' +
                                   'facebook' +
                               '</button>' +
                            '</div>' +
                            '<div class="col-3 social-container item-center">' +
                                '<button class="d-flex item-center">' +
                                 '<i class="fa-brands fa-google-plus-square pe-2" style="color: rgb(213, 0, 0)"></i>' +
                                    'google' +
                                '</button>' +
                             '</div>' +
                             '<div class="col-3 social-container item-center">' +
                                '<button class="d-flex item-center">' +
                                 '<i class="fa-brands fa-twitter-square pe-2" style="color: rgb(2, 138, 150)"></i>' +
                                    'twitter' +
                                '</button>'+ 
                             '</div>' +
                        '</div>' +
                        '<div class="row mt-3">' +
                            '<p class="item-center">or</p>' +
                        '</div>' +
                        '<div class="row mt-3 mb-5 item-center">' +
                            '<div class="col-8">' +
                                '<form action="" class="">' +
                                    '<div>' +
                                        '<label for="email">Email/phone number</label>' +
                                        '<input type="email" id="email">' +
                                    '</div>' +
                                    '<div class="mt-3">' +
                                        '<label for="password">Password</label>' +
                                        '<input type="password" id="password">' +
                                    '</div>' +
                                    '<div class="d-flex mt-3">' +
                                        '<div class="col">' +
                                            '<div class="form-check form-switch">' +
                                                '<input class="form-check-input" type="checkbox" role="switch" id="rememberme">' +
                                                '<label class="form-check-label" for="rememberme">Remember me</label>' +
                                                '<a href="" class="float-end" style="font-size: 14px;">Forgot Password</a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="row mt-5">' +
                                        '<button class="checkout py-2">Log in</button>' +
                                        '<button class="cancel py-2 mt-3" onclick="signUp()">Sign up</button>'+ 
                                    '</div>' +
                                '</form>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        getStarted.innerHTML = result;
    }
}
signUp = () =>{
    if(getStarted != null){
        let result = '';
        result += ' <div class="container">' +
        '<div class="row item-center">' +
            '<div class="col-lg-6 col-sm-12 content-container">' +
                '<h3 class="item-center"><strong>Get Started</strong></h3>' +
                '<p class="item-center">Create your account</p>' +
                '<div class="row item-center mt-5">' +
                    '<div class="col-3 social-container item-center">' +
                       '<button class="d-flex item-center">' +
                        '<i class="fa-brands fa-facebook-square pe-2" style="color: blue"></i>' +
                           'facebook' +
                       '</button>' +
                   '</div>' +
                    '<div class="col-3 social-container item-center">' +
                        '<button class="d-flex item-center">' +
                         '<i class="fa-brands fa-google-plus-square pe-2" style="color: rgb(213, 0, 0)"></i>' +
                            'google' +
                        '</button>' +
                     '</div>' +
                     '<div class="col-3 social-container item-center">' +
                        '<button class="d-flex item-center">' +
                         '<i class="fa-brands fa-twitter-square pe-2" style="color: rgb(2, 138, 150)"></i>' +
                            'twitter' +
                        '</button>' +
                     '</div>' +
                '</div>' +
                '<div class="row mt-3">' +
                    '<p class="item-center">or</p>' +
                '</div>' +
                '<div class="row mt-3 mb-5 item-center">' +
                    '<div class="col-8">' +
                        '<form action="" class="">' +
                            '<div>' +
                                '<label for="name">Display name</label>' +
                                '<input type="text" id="name">' +
                            '</div>' +
                            '<div class="mt-3">' +
                                '<label for="password">Password</label>' +
                                '<input type="password" id="password">' +
                            '</div>' +
                            '<div class="mt-3">' +
                                '<label for="cpassword">Confirm password</label>' +
                                '<input type="password" id="cpassword">' +
                            '</div>' +
                            '<div class="mt-3 d-flex align-items-end">' +
                                '<div class="col-10">' +
                                    '<label for="number">Phone number</label>' +
                                    '<input type="number" id="number">' +
                                '</div>' +
                                '<div class="col d-flex justify-content-end">' +
                                    '<button class="btn-send-code">send</button>' +
                                '</div>' +
                            '</div>' +
                            '<div class=" mt-5 mb-5 code text-center" id="code">' +
                                '<p style="font-size: 14px">Enter code sent to +6300000000</p>' +
                                '<div class="item-center">' +
                                    '<input type="text"/>' +
                                    '<input type="text"/>' +
                                    '<input type="text"/>' +
                                    '<input type="text"/>' +
                                    '<input type="text"/>' +
                                '</div>' +
                            '</div>' +
                            '<div class="d-flex text-center">' +
                                '<p style="font-size: 14px">By creating an account, you agree to the Terms and condition and Privacy Policy of the app.</p>' +
                            '</div>' +
                        '</form>' +
                        '<div class="row mt-5">' +
                            '<button class="checkout py-2">Sign up</button>' +
                            '<button class="cancel py-2 mt-3" onclick="logIn();">Log in</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
       ' </div>' +
    '</div>';
    
    getStarted.innerHTML = result;

    }
}

signUp();

loggedInUserID = () =>{
    return loadFromLocal('userId');
}

//adding to cart function
loadCart = () =>{
    let cartListFromLocal = loadFromLocal('cart');
    let cartBadge = document.getElementById('cart-badge');
    let cartValue = document.getElementById('cart-value');

    if(cartListFromLocal != ''){
        cartBadge.style.display = 'block';
    }else{
        cartBadge.style.display = 'none';
    }

    let finalPrice = 0;

    for(let i = 0; i < cartListFromLocal.length; i++){
        finalPrice += parseInt(cartListFromLocal[i].price * cartListFromLocal[i].quantity);
    }
    cartValue.innerHTML = getTotalPrice(finalPrice);
}
addToCart = (id, quantity) => {
    let cartListFromLocal = loadFromLocal('cart') || [];
    if(loggedInUserID() != ''){
        //save to database
    }

    if(checkCart(id)){
        location.replace("./mycart.html");
        return;
    }

    if(cartListFromLocal != ''){
        for(let i = 0; i < cartListFromLocal.length; i++){
            cartListFromLocal[i] = {
                id : cartListFromLocal[i].id,
                quantity: quantity
            };
        }
    }
    
    cartListFromLocal[cartListFromLocal.length] = {
        id : id,
        quantity: quantity
    }
    console.log(cartListFromLocal);

    let featuredProducts = loadFromLocal('featuredProducts');
    let featuredDaily = loadFromLocal('featuredDaily');

    for(let i = 0; i < cartListFromLocal.length; i++){
        for(let j = 0; j < featuredDaily.results.length; j++){
            if(cartListFromLocal[i].id == featuredDaily.results[j].item_id){
                cartListFromLocal[i]['url'] = featuredDaily.results[j].images.url;
                cartListFromLocal[i]['title'] = featuredDaily.results[j].title;
                cartListFromLocal[i]['price'] = parseInt(featuredProducts.results[j].display_price.value);
            }
        }
        for(let j = 0; j < featuredProducts.results.length; j++){
            if(cartListFromLocal[i].id == featuredProducts.results[j].item_id){
                cartListFromLocal[i]['url'] = featuredProducts.results[j].images.url;
                cartListFromLocal[i]['title'] = featuredProducts.results[j].title;
                cartListFromLocal[i]['price'] = parseInt(featuredProducts.results[j].display_price.value);
            }
        }
    }
    console.log(cartListFromLocal);
    //save item to cart
    saveToLocal('cart', cartListFromLocal);
    loadCart();
}
checkCart = (id) =>{
    let cartListFromLocal = loadFromLocal('cart');
    for(let i = 0; i < cartListFromLocal.length; i++){
        if(id == cartListFromLocal[i].id){
            return true;
        }
    }
    return false;
}

cartList = () =>{
    let cartListFromLocal = loadFromLocal('cart');
    let cart = document.getElementById('cart-list');

    if(cart == null){
        return;
    }

    if(cartListFromLocal == ''){
        cart.innerHTML = '<p class="lead p-5 text-center">Add some product</p>';
    }

    for(let i = 0; i < cartListFromLocal.length; i++){
        cart.innerHTML += '<div class="row my-cart">' +
        '<div class="col-md-6 d-flex">' +
            '<div class="row">' +
                '<img src="'+ cartListFromLocal[i].url + '" alt="">' +
                '<div class="col mt-1">' +
                    '<p class="product-name" style="font-size: 16px;"><a href="">' + cartListFromLocal[i].title + '</a></p>' +
                    '<div class="row">' +
                        '<div class="col">' +
                            '<div class="col-6 d-flex align-items-center product-specific-quantity">' +
                                '<span style="display: none">' + i + '</span>' + 
                                '<button class="minus"><i class="fa-solid fa-minus"></i></button>' +
                                '<button style="border: none; color: rgb(46, 46, 46); cursor: default; font-size: 16px; background-color: transparent" class="value">' + cartListFromLocal[i].quantity + '</button>' +
                                '<button class="plus"><i class="fa-solid fa-plus"></i></i></button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="col d-flex my-cart-variation product-specific-variant">' +
            '<label class="">variation</label>' +
            '<div class = "my-cart-variation-btn" style="margin-left: 3px; margin-top: -5px">' +
                '<button class="">blue</button>' +
                '<button class="">XL</button>' +
            '</div>' +
        '</div>' +
        '<div class="col text-end">' +
            '<div class="row">' +
                '<h5 class="px-3"><strong class="price-value">'+ getTotalPrice(parseInt(cartListFromLocal[i].price * cartListFromLocal[i].quantity)) +'</strong></h5>' +
            '</div>' +
            '<div class="row text-end">' +
                '<div class="col-12 my-cart-button-delete-one ">' +
                    '<span style="display: none">' + i + '</span>' + 
                    '<button class="removeItem"><i class="fa-solid fa-trash"></i>Remove</button>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>'; 
    }
    quantityEditor();
}

quantityEditor = () =>{
    document.querySelectorAll(".minus").forEach(button => {
        button.onclick = function (){
            let cartListFromLocal = loadFromLocal('cart') || [];
            let index = this.parentElement.children[0].innerText;
            let quantityValue = parseInt(this.parentElement.children[2].innerText);
            let quantityContainer = this.parentElement.children[2];
            let price = document.querySelectorAll(".price-value");

            quantityValue--;
            
            if(quantityValue < 1){
                quantityValue = 1;
            }

            quantityContainer.innerText = quantityValue;
            cartListFromLocal[index].quantity = quantityValue;
            price[index].innerHTML = getTotalPrice(parseInt(cartListFromLocal[index].price * cartListFromLocal[index].quantity));
            saveToLocal('cart', cartListFromLocal);
        }
    });
    document.querySelectorAll(".plus").forEach(button => {
        button.onclick = function (){
            let cartListFromLocal = loadFromLocal('cart') || [];
            let index = this.parentElement.children[0].innerText;
            let quantityValue = parseInt(this.parentElement.children[2].innerText);
            let quantityContainer = this.parentElement.children[2];
            let price = document.querySelectorAll(".price-value");
           
            quantityValue++;

            quantityContainer.innerText = quantityValue;
            cartListFromLocal[index].quantity = quantityValue;
            price[index].innerHTML = getTotalPrice(parseInt(cartListFromLocal[index].price * cartListFromLocal[index].quantity));
            saveToLocal('cart', cartListFromLocal);
        }
    });

    document.querySelectorAll(".removeItem").forEach(button => {
        button.onclick = function (){
            let cartListFromLocal = loadFromLocal('cart') || [];
            let index = this.parentElement.children[0].innerText;

            console.log(cartListFromLocal);
            cartListFromLocal.splice(index, 1);
            console.log(cartListFromLocal);
        }
    });
}

localApiResponce = () =>{
}
localApiCall = () =>{
}

//waiting for data
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
    
    

    const response = options != null ? await fetch(url, options) : await fetch(url);
    const result = await response.json();
    return result;
}

//call each api
apiCall = async () =>{
    const today = new Date().getMonth() + 1 + "" + new Date().getDate() + "" + new Date().getFullYear();
    let featuredProducts = null;
    let featuredDaily = null;

    //load cart first
    loadCart();
    //cart.html
    cartList();

    //set placeholders
    if(todaysDeal != null){
        todaysDeal.innerHTML = productsPlaceHolder(5);
    }


    if(today != loadFromLocal('today')){
        featuredProducts = await apiResponse("https://ebay-scraper.p.rapidapi.com/featured");
        featuredDaily = await apiResponse("https://ebay-scraper.p.rapidapi.com/featured-deals?type=daily");
        
        //clear the local storage first
        //but don't clear the user data

        //saving to local storage
        saveToLocal('today', today);
        saveToLocal('featuredProducts', featuredProducts);
        saveToLocal('featuredDaily', featuredDaily);
        saveToLocal('bestOffer', '');
        saveToLocal('cart', '');
        console.log('Daily update');
    }else{
        featuredProducts = loadFromLocal('featuredProducts');
        featuredDaily = loadFromLocal('featuredDaily');
        console.log('from local storage');

        //if featured products anf/or featured daily is empty then call api
        if(featuredProducts == null || featuredDaily == ""){
            featuredProducts = await apiResponse("https://ebay-scraper.p.rapidapi.com/featured"); //all product
            featuredDaily = await apiResponse("https://ebay-scraper.p.rapidapi.com/featured-deals?type=daily"); //specific product
        
            //saving to local storage
            saveToLocal('today', today);
            saveToLocal('featuredProducts', featuredProducts);
            saveToLocal('featuredDaily', featuredDaily);
            console.log('Update products');
        }
    }

    //const productDetails = await apiResponse("https://ebay-scraper.p.rapidapi.com/product-details", 'POST', '294951491676');
    //saveToLocal('294951491676', productDetails);

    console.log(featuredProducts);
    console.log(featuredDaily);

    //const currentLogIn = await apiResponse('./php/ennea.api.php?email=fsdfsdf&password=asdasd');
    //console.log(currentLogIn);

    if(categories != null){
        getCategories();

        let bestOffer = loadFromLocal('bestOffer');
        //console.log(bestOffer);
        if(bestOffer == ''){
            let rand = Math.floor(Math.random() * featuredProducts.results.length - 1);
            alert(rand);
            let id = featuredProducts.results[rand].item_id;
            const productDetails = await apiResponse("https://ebay-scraper.p.rapidapi.com/product-details", 'POST', id);
            let details = productDetails;
            let img_url = '';

            for(let i = 0; i < featuredProducts.results.length; i++){
                if(id == featuredProducts.results[i].item_id){
                    img_url = featuredProducts.results[i].images.url;
                }
            }
            details['img_url'] = img_url;
            saveToLocal('bestOffer', details);
            getBestOffer(details);
            
        }
        else{
            getBestOffer(bestOffer);
        }
       
    }
    
    if(todaysDeal != null){
        todaysDeal.innerHTML = "";
        for(let i = 0; i < featuredDaily.results.length; i++){
            if(i < 5){
                let rand = Math.floor(Math.random() * featuredDaily.results.length - 1) + 1;
                todaysDeal.innerHTML += getProduct(featuredDaily.results[rand].images.url, featuredDaily.results[rand].title, featuredDaily.results[rand].display_price.value, featuredDaily.results[rand].item_id);
            }
        }
    }

    //display the products
    if(productsLists != null){
        productsLists.innerHTML = "";
        for(let i = 0; i < featuredProducts.results.length; i++){
            productsLists.innerHTML += getProduct(featuredProducts.results[i].images.url, featuredProducts.results[i].title, featuredProducts.results[i].display_price.value, featuredProducts.results[i].item_id);
        }
    }

    if(youMayAlsoLIke != null){
        youMayAlsoLIke.innerHTML = "";

        let url = window.location;
        let searchParams = new URLSearchParams(url.search);
        const id = searchParams.get('id');
        let details = loadFromLocal(id);
        let img_url = "";

        if(details == "" && id != null){

            const productDetails = await apiResponse("https://ebay-scraper.p.rapidapi.com/product-details", 'POST', id);
            details = productDetails;
            
            //search item in daily
            for(let i = 0; i < featuredDaily.results.length; i++){
                if(id == featuredDaily.results[i].item_id){
                    img_url = featuredDaily.results[i].images.url;
                }
            }
            //search item in featured
            if(img_url == ""){
                for(let i = 0; i < featuredProducts.results.length; i++){
                    if(id == featuredProducts.results[i].item_id){
                        img_url = featuredProducts.results[i].images.url;
                    }
                }
            }

            details['img_url'] = img_url;

            saveToLocal(id, details);
        }

        let cartList = document.getElementById('cart-list');
        if(cartList == null){
            getProductDetails(details);
        }
        
        //random products for "also you may like"
        let randLikes = [];
        let total = 12;
        while(randLikes.length < total){
            let rand = Math.floor(Math.random() * featuredProducts.results.length -1) + 1;
            if(!randLikes.includes(rand)){
                randLikes.push(rand);
            }
        }
        
        randLikes.forEach(i => {
            youMayAlsoLIke.innerHTML += getProduct(featuredProducts.results[i].images.url, featuredProducts.results[i].title, featuredProducts.results[i].display_price.value, featuredProducts.results[i].item_id);
        });
    }

}

_initData();
apiCall();

