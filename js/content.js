
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
getProduct = (details) =>{
    let product = ''+
        '<div class="col-xl-3 col-lg-4 col-md-4 g-2">'+
            '<div class="product-container">'+
                '<div class="">'+
                    '<div class="row">'+
                        '<div class="product-btns px-4 py-2 ">'+
                            '<div class="product-btn-item item-center float-start" onclick="addToCart('+details.item_id+',1, this)">';
                                if(checkCart(details.item_id)){
                                    product += '<i class="fa-solid fa-circle-check" style="color: green"></i>';
                                }else{
                                    product += '<i class="fa-solid fa-cart-plus"></i>';
                                }
                                
    product +=              '</div>'+
                            '<div class="product-btn-item item-center float-end ">'+
                                '<i class="fa-solid fa-heart"></i>'+
                            '</div>'+
                        '</div>'+
                        '<a href="./productDetails.html?id=' + details.item_id + '" style="text-decoration: none; color: black">' +
                        '<div class="item-center">'+
                            '<img src="' + details.img_url + '" alt="" class="product-img">'+
                        '</div>'+
                    '</div>'+
                    '<div class="row product-details">'+
                        '<p class="product-name">' + details.main_title + '</p>'+ 
                        '<p class="product-label-light">Price</p>'+
                        '<p class="product-price">'+
                            '<span class="product-price-now"> ' + getTotalPrice(parseInt(details.price)) + '</span> '+
                        '</p> '+
                    '</div>'+
                    '<div class="row product-details d-none">'+
                        '<a href="./productDetails.html?id=' + details.item_id + '" class="btn-0 text-center p-1">Shop Now</button></a>'+
                    '</div>'+
                '</div></a>'+
            '</div>'+
        '</div>';
return product; 
}
//display the data of the specific product
getProductDetails = (details) =>{
    document.querySelector('.product-specific_img').src = details.img_url;
    document.querySelector('.product-specific-brand').innerHTML = details.category;
    document.querySelector('.product-specific-title').innerHTML = details.main_title;
    
    let quantity = document.querySelector('.product-specific-value');
    let price = document.querySelector('.product-specific-price');
    let counter = 1;
    let finalPrice = 0;

    finalPrice = parseInt(details.price) * counter;
    price.innerHTML = getTotalPrice(finalPrice);

    document.querySelector('.fa-minus').onclick = function(){
        counter--;
        if(counter - 1 < 0){
            counter = 1;
        }
        quantity.innerHTML = counter;

        finalPrice = parseInt(details.price) * counter;
        price.innerHTML = getTotalPrice(finalPrice);
    }
    document.querySelector('.fa-plus').onclick = function(){
        counter++;
        quantity.innerHTML = counter;

        finalPrice = parseInt(details.price) * counter;
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
    //document.querySelector('.product-specific-refund-policy').innerHTML = details.returns;

    //shipping
    //document.querySelector('.product-specific-inventory').innerHTML = details.inventory_location[0].address.city;
    //document.querySelector('.product-specific-shipping').innerHTML = details.shipping.logistics.//domestic_or_international == null ? "Not Available" : details.shipping.logistics.domestic_or_international;

    let addCart = document.querySelector('.add-to-cart');

    if(checkCart(details.item_id)){
        addCart.innerHTML = "View cart";
    }else{
        addCart.innerHTML = "Add to cart";
    }

    addCart.onclick = function(){
        addCart.innerHTML = "View cart"; 
        addToCart(details.item_id, counter);
    }
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
    return "₱ " + price.toLocaleString('en-PH');
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
    let finalPrice = 0;

    finalPrice = parseInt(details.price) * counter;
    bestPrice.innerHTML = getTotalPrice(finalPrice);

    document.querySelector('.fa-minus').onclick = function(){
        counter--;
        if(counter - 1 < 0){
            counter = 1;
        }
        quantity.innerHTML = counter;

        finalPrice = parseInt(details.price) * counter;
        bestPrice.innerHTML = getTotalPrice(finalPrice);
    }
    document.querySelector('.fa-plus').onclick = function(){
        counter++;
        quantity.innerHTML = counter;

        finalPrice = parseInt(details.price) * counter;
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
    let cartValue = document.querySelectorAll('.cart-value');

    if(cartListFromLocal != ''){
        cartBadge.style.display = 'block';
    }else{
        cartBadge.style.display = 'none';
    }

    let finalPrice = 0;

    for(let i = 0; i < cartListFromLocal.length; i++){
        finalPrice += parseInt(cartListFromLocal[i].price * cartListFromLocal[i].quantity);
    }
   
    cartValue.forEach(element => {
        element.innerHTML = getTotalPrice(finalPrice);
    });

    //load cart
    let cart = document.getElementById('cart-list');
    if(cart != null){
        cartList();
    }

    let checkoutBtn = document.querySelector('.checkout');
    if(checkoutBtn != null){
        if(cartListFromLocal != ''){
            checkoutBtn.style.backgroundColor = "green";
            checkoutBtn.removeAttribute('disabled');
        }else{
            checkoutBtn.style.backgroundColor = "gray";
        }
    }
}
addToCart = (id, quantity, element = null) => {
    let cartListFromLocal = loadFromLocal('cart') || [];
    if(loggedInUserID() != ''){
        //save to database
    }

   if(element != null){
        element.innerHTML = '<i class="fa-solid fa-circle-check" style="color: green"></i>';
   }

    if(checkCart(id)){
        location.replace("./mycart.html");
        return;
    }

    if(cartListFromLocal != ''){
        for(let i = 0; i < cartListFromLocal.length; i++){
            cartListFromLocal[i] = {
                id : cartListFromLocal[i].id,
                quantity: cartListFromLocal[i].quantity
            };
        }
    }
    
    cartListFromLocal[cartListFromLocal.length] = {
        id : id,
        quantity: quantity
    }

    let featuredProducts = loadFromLocal('products');

    for(let i = 0; i < cartListFromLocal.length; i++){
        for(let j = 0; j < featuredProducts.data.length; j++){
            if(cartListFromLocal[i].id == featuredProducts.data[j].item_id){
                cartListFromLocal[i]['url'] = featuredProducts.data[j].img_url;
                cartListFromLocal[i]['title'] = featuredProducts.data[j].main_title;
                cartListFromLocal[i]['price'] = parseInt(featuredProducts.data[j].price);
            }
        }
    }
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

    cart.innerHTML = "";

    if(cartListFromLocal == ''){
        cart.innerHTML = '<p class="lead p-5 text-center">Add some product</p>';
    }

    for(let i = 0; i < cartListFromLocal.length; i++){
        cart.innerHTML += '<div class="row my-cart" >' +
        '<div class="col-md-6 d-flex">' +
            '<div class="row">' +
                '<img src="'+ cartListFromLocal[i].url + '" alt="">' +
                '<div class="col mt-1">' +
                    '<div class="row">' +
                    '<p class="product-name" style="font-size: 16px;"><a href="">' + cartListFromLocal[i].title + '</a></p>' +
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
    
    let countCart = document.querySelector('.product-specific-brand');
    if(countCart != null){
        countCart.innerHTML = cartListFromLocal.length;
    }
    quantityEditor();

    document.querySelector('.btn-delete-all').onclick = function(){
        saveToLocal('cart', '');
        location.replace("./mycart.html");
    }
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
            loadCart();
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
            loadCart();
        }
    });

    document.querySelectorAll(".removeItem").forEach(button => {
        button.onclick = function (){
            let cartListFromLocal = loadFromLocal('cart') || [];
            let index = this.parentElement.children[0].innerText;

            let newList = [];
            let newIndex = 0;
            for(let i = 0; i < cartListFromLocal.length; i++){
                if(i != index){
                    newList[newIndex] = cartListFromLocal[i];
                    newIndex++;
                }
            }
            saveToLocal('cart', newList);

            if(cartListFromLocal.length == 1){
                location.replace("./mycart.html");
                return;
            }

            loadCart();
            cartList();

           
        }
    });
}
//waiting for data
apiResponse = async (url, method = "GET", ...values) =>{
    let options = {};

    //  switch(method){
    //      case 'GET': {
    //          options = {
    //              method: 'GET',
    //              headers: {
    //                  'X-RapidAPI-Key': 'abb1494fe4msh22d35c579ba0b72p1eba2ajsn5dd3bf5cdfbc',
    //                  'X-RapidAPI-Host': 'ebay-scraper.p.rapidapi.com'
    //              }
    //          };
    //          break;
    //      }
    //      case 'POST' :{
    //          options = {
    //              method: 'POST',
    //              headers: {
    //                  'content-type': 'application/json',
    //                  'X-RapidAPI-Key': 'abb1494fe4msh22d35c579ba0b72p1eba2ajsn5dd3bf5cdfbc',
    //                  'X-RapidAPI-Host': 'ebay-scraper.p.rapidapi.com'
    //              },
    //              body: '{"product_id":'+ values[0] +'}'
    //          };
    //      }
    //  }

    const response = options != null ? await fetch(url, options) : await fetch(url);
    const result = await response.json();
    return result;
}

//call each api
apiCall = async () =>{
    const today = new Date().getMonth() + 1 + "" + new Date().getDate() + "" + new Date().getFullYear();
    let featuredProducts = loadFromLocal('products');
    //localStorage.clear();
    //load cart first
    loadCart();

    //cart.html
    cartList();

     //set placeholders
     if(todaysDeal != null){
         todaysDeal.innerHTML = productsPlaceHolder(5);
     }
    //const currentLogIn = await apiResponse('./php/ennea.api.php?email=email&password=dadas');
    //console.log(currentLogIn);

    if(featuredProducts == ''){
        featuredProducts = await apiResponse('./php/ennea.api.php?products=1');
        saveToLocal('products', featuredProducts);
    }

    if(categories != null){
        getCategories();

        let bestOffer = loadFromLocal('bestOffer');

        if(bestOffer == ''){
            let rand = Math.floor(Math.random() * featuredProducts.data.length - 1) + 1;
            bestOffer = featuredProducts.data[rand];
            saveToLocal('bestOffer', bestOffer);
            getBestOffer(bestOffer);
            console.log('save today');
        }
        else{
            getBestOffer(bestOffer);
            console.log('save from previous');
        }
        console.log(bestOffer);
    }

    if(todaysDeal != null){
        todaysDeal.innerHTML = "";

        let items = [];
        while(items.length < 8){
            let rand = Math.floor(Math.random() * featuredProducts.data.length-1) + 1;
            if(!items.includes(rand)){
                items.push(rand);
                console.log(rand);
                todaysDeal.innerHTML += getProduct(featuredProducts.data[rand]);
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
        let id = searchParams.get('id');
        
        let details = featuredProducts.data[id - 1];
        // if(details == "" && id != null){
        //     //saveToLocal(id, details);
        // }

        let cartList = document.getElementById('cart-list');
        if(cartList == null){
            getProductDetails(details);
        }
        
        //random products for "also you may like"
        let randLikes = [];
        let total = 5;
        while(randLikes.length < total){
            let rand = Math.floor(Math.random() * featuredProducts.data.length -1) + 1;
            if(!randLikes.includes(rand)){
                randLikes.push(rand);
            }
        }
        
        randLikes.forEach(i => {
            youMayAlsoLIke.innerHTML += getProduct(featuredProducts.data[i]);
        });
    }

}

_initData();
apiCall();

