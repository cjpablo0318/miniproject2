//initialized elements
const productsLists = document.getElementById("productLists");
const youMayAlsoLIke = document.getElementById("youMayAlsoLIke");
const productSpecificDetails = document.getElementById(
  "productSpecificDetails"
);
const todaysDeal = document.getElementById("todaysDeal");
const categories = document.getElementById("categories");
const newProducts = document.getElementById("newProducts");

//loading data
_initData = () => {
  if (productsLists != null) {
    productsLists.innerHTML = productsPlaceHolder(10);
  }
  if (youMayAlsoLIke != null) {
    youMayAlsoLIke.innerHTML = productsPlaceHolder(12);
  }
  if (todaysDeal != null) {
    todaysDeal.innerHTML = productsPlaceHolder(12);
  }
  if (newProducts != null) {
    newProducts.innerHTML = productsPlaceHolder(6);
  }
};

//adding placeholders while waiting for the data from the api
productsPlaceHolder = (number) => {
  let product = "";

  for (let i = 0; i < number; i++) {
    product +=
      '<div class="col-xl-2 col-lg-2 col-md-3 col-sm-6 g-2">' +
      '<div class="product-container">' +
      '<div class="p-2">' +
      '<div class="row">' +
      '<div class="product-btns px-3 py-1">' +
      '<div class="product-btn-item item-center float-start placeholder-glow">' +
      "</div>" +
      '<div class="product-btn-item item-center float-end ">' +
      "</div>" +
      "</div>" +
      '<div class="item-center">' +
      '<img src="../miniproject2/img/placeholderimage.png" alt="" class="product-img" style="width: 100%; margin-top: -40px">' +
      "</div>" +
      "</div>" +
      '<div class="row product-details placeholder-glow">' +
      '<p class="product-name placeholder bg-secondary col-9"></p>' +
      '<span class="product-label-light placeholder col-7">Price</span>' +
      '<span class="product-price placeholder bg-secondary col-6 mt-2"></span> ' +
      '<span class="product-price placeholder bg-secondary col-7 mt-2 mb-2"></span> ' +
      "</div>" +
      '<div class="row product-details">' +
      '<button class="btn-0 disabled placeholder"></button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
  }

  return product;
};

//get the product container filled with data from the api
getProduct = (details) => {
  let product =
    "" +
    '<div class="col-xl-3 col-lg-4 col-md-4 g-3">' +
    '<div class="product-container">' +
    '<div class="">' +
    '<div class="row">' +
    '<div class="product-btns">' +
    '<div class="product-btn-item item-center float-start" onclick="addToCart(' +
    details.item_id +
    ',1, this)">';

  product +=
    "</div>" +
    '<div class="product-btn-item item-center float-end ">' +
    '<i class="fa-solid fa-heart d-none"></i>' +
    "</div>" +
    "</div>" +
    '<a href="./productDetails.html?id=' +
    details.item_id +
    '" style="text-decoration: none; color: black">' +
    '<div class="item-center">' +
    '<img src="' +
    details.img_url +
    '" alt="" class="product-img">' +
    "</div>" +
    "</div>" +
    '<div class="row product-details">' +
    '<p class="product-name">' +
    details.main_title +
    "</p>" +
    '<p class="product-label-light">Price</p></a>' +
    '<p class="product-price">' +
    '<span class="product-price-now"> ' +
    getTotalPrice(parseInt(details.price)) +
    '</span> <button class="add-to-cart float-end" style="color: green" onclick="addToCart(' +
    details.item_id +
    ',1, this)">';

  if (checkCart(details.item_id)) {
    product +=
      '<i class="fa-solid fa-circle-check" style="color: green"></i> View cart';
  } else {
    product += '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
  }

  product +=
    "</button>" +
    "</p> " +
    "</div>" +
    '<div class="row product-details d-none">' +
    '<a href="./productDetails.html?id=' +
    details.item_id +
    '" class="btn-0 text-center p-1">Shop Now</button></a>' +
    "</div>" +
    "</div></a>" +
    "</div>" +
    "</div>";
  return product;
};

//display the data of the specific product
getProductDetails = (details) => {
  if (checkCart(details.item_id)) {
    let cartLists = loadFromLocal("cart");
    console.log(cartLists);
    for (let i = 0; i < cartLists.length; i++) {
      if (details.item_id == cartLists[i].id) {
        details.quantity = cartLists[i].quantity;
      }
    }
  } else {
    details.quantity = 1;
  }

  document.querySelector(".product-specific_img").src = details.img_url;
  document.querySelector(".product-specific-brand").style.display = "none"; //innerHTML = details.category;
  document.querySelector(".product-specific-title").innerHTML =
    details.main_title;

  let quantity = document.querySelector(".product-specific-value");
  let price = document.querySelector(".product-specific-price");
  let counter = parseInt(details.quantity);
  let finalPrice = 0;

  quantity.innerHTML = counter;
  finalPrice = parseInt(details.price) * counter;
  price.innerHTML = getTotalPrice(finalPrice);

  document.querySelector(".fa-minus").parentElement.onclick = function () {
    counter--;
    if (counter - 1 < 0) {
      counter = 1;
    }
    quantity.innerHTML = counter;

    finalPrice = parseInt(details.price) * counter;
    price.innerHTML = getTotalPrice(finalPrice);
  };
  document.querySelector(".fa-plus").parentElement.onclick = function () {
    counter++;
    quantity.innerHTML = counter;

    finalPrice = parseInt(details.price) * counter;
    price.innerHTML = getTotalPrice(finalPrice);
  };

  //review not working

  //color
  let colors = document.querySelector(".product-specific-variant-color");
  let colorCollection = ["black", "yellow", "white", "blue", "green"];
  let c = [];
  while (c.length < 3) {
    let rand = Math.floor(Math.random() * colorCollection.length - 1) + 1;
    if (!c.includes(rand)) {
      c.push(rand);
    }
  }

  let result = "";
  for (let i = 0; i < c.length; i++) {
    result += "<button>" + colorCollection[c[i]] + "</button>";
  }
  colors.innerHTML = result;

  //sizes
  let sizes = document.querySelector(".product-specific-variant-sizes");
  let sizeCollection = [""];
  result = "";
  for (let i = 0; i < sizeCollection.length; i++) {
    result += "<button>" + sizeCollection[i] + "</button>";
  }
  //sizes.innerHTML = result;

  //refund policy
  //document.querySelector('.product-specific-refund-policy').innerHTML = details.returns;

  //shipping
  //document.querySelector('.product-specific-inventory').innerHTML = details.inventory_location[0].address.city;
  //document.querySelector('.product-specific-shipping').innerHTML = details.shipping.logistics.//domestic_or_international == null ? "Not Available" : details.shipping.logistics.domestic_or_international;

  let addCart = document.querySelector(".add-to-cart");

  if (checkCart(details.item_id)) {
    addCart.innerHTML =
      '<i class="fa-solid fa-circle-check" style="color: green"></i> View cart';
  } else {
    addCart.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
  }

  addCart.onclick = function () {
    addCart.innerHTML =
      '<i class="fa-solid fa-circle-check" style="color: green"></i> View cart';
    addToCart(details.item_id, counter, this);
  };

  let buyNowBtn = document.getElementById("product-specific-buyNow");
  if (buyNowBtn != null) {
    buyNowBtn.href = "./checkout.html?id=" + details.item_id;
  }
  return;
  //more product info
  let productKeys = Object.keys(details.specifications);
  let productValues = Object.values(details.specifications);
  let productKeysHalf = Math.floor(productKeys.length / 2);
  let infoLeft = document.querySelector(".product-specific-more-info-left");
  let infoRight = document.querySelector(".product-specific-more-info-right");

  result = "";
  for (let i = 0; i < productKeys.length; i++) {
    if (i < productKeysHalf) {
      infoLeft.innerHTML +=
        ' <h6><span class="product-specific-label">' +
        productKeys[i] +
        " : </span>" +
        productValues[i] +
        "</h6>";
    } else {
      infoRight.innerHTML +=
        ' <h6><span class="product-specific-label">' +
        productKeys[i] +
        " : </span>" +
        productValues[i] +
        "</h6>";
    }
  }
  //
  sizeChange();
};

getTotalPrice = (price) => {
  return "₱ " + price.toLocaleString("en-PH");
};
//getting the category list
getCategories = () => {
  let categoryList = [
    "Women",
    "Men",
    "Unisex",
    "Outwear",
    "Kids",
    "Swimwear"];

  for (let i = 0; i < categoryList.length; i++) {
    let category =
      "" +
      '<div class="col-lg-2 col-sm-3">' +
      '<a href="./products.html?categoryId=' + i + '" style="text-decoration: none; color: black"><div class="category-container">' +
      '<div class="row item-center pb-4" style="margin-top: 19px;"><strong class="text-center">' +
      categoryList[i] +
      "</strong></div>" +
      "</div></a>" +
      "</div>";
    categories.innerHTML += category;
  }
};

//random products as best offer
getBestOffer = (details) => {
  const bestImg = document.getElementById("best-img");
  const bestTitle = document.getElementById("best-title");
  const bestPrice = document.getElementById("best-price");
  const bestLink = document.getElementById("best-link");

  bestImg.src = details.img_url;
  bestTitle.innerHTML = details.main_title;

  let quantity = document.querySelector(".product-specific-value");
  let counter = 1;
  let finalPrice = 0;

  finalPrice = parseInt(details.price) * counter;
  bestPrice.innerHTML = getTotalPrice(finalPrice);

  document.querySelector(".fa-minus").onclick = function () {
    counter--;
    if (counter - 1 < 0) {
      counter = 1;
    }
    quantity.innerHTML = counter;

    finalPrice = parseInt(details.price) * counter;
    bestPrice.innerHTML = getTotalPrice(finalPrice);
  };
  document.querySelector(".fa-plus").onclick = function () {
    counter++;
    quantity.innerHTML = counter;

    finalPrice = parseInt(details.price) * counter;
    bestPrice.innerHTML = getTotalPrice(finalPrice);
  };

  //create a function to save to cart
  if (!checkCart(details.item_id)) {
    bestLink.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
    bestLink.onclick = function () {
      addToCart(details.item_id, counter, this);
    };
  } else {
    bestLink.innerHTML =
      '<i class="fa-solid fa-circle-check" style="color: green"></i> View cart';
    bestLink.onclick = function () {
      addToCart(details.item_id, counter, this);
    };
  }

  //bestLink.href = "productDetails.html?id=" + details.item_id;
};

//saving data to the local storage
saveToLocal = (key, value) => {
  localStorage[key] = JSON.stringify(value);
};
//getting data from the local storage
loadFromLocal = (key) => {
  let result = localStorage[key] || "";
  if (result == "") {
    return "";
  }
  return JSON.parse(result);
};

//GetStarted
let getStarted = document.getElementById("getStartedContent");
loggedInUserID = () => {
  let userID = loadFromLocal("userLoggedIn")
    ? loadFromLocal("userLoggedIn").userID
    : -1;
  saveToLocal("cart", []);
  if (userID > -1) {
    let user = loadFromLocal("users")[userID];
    let orderCount = document.querySelector(".orderCount");
    let cartCount = document.querySelector(".cartCount");
    let profileName = document.querySelector(".profile-name");

    profileName.innerHTML =
      user.name.charAt(0).toUpperCase() + user.name.slice(1);
    orderCount.innerHTML = "(" + user.orders + ")";
    cartCount.innerHTML = "(" + user.cart.length + ")";

    console.log(user);
    if (user.cart != null) {
      saveToLocal("cart", user.cart);
    }
  }
  return userID;
};
logOut = () => {
  saveToLocal("userLoggedIn", "");
  location.replace("./getStarted.html");
};
showError = (message) => {
  let alertErr = document.querySelector(".alert");
  if (alertErr == null) {
    return;
  }

  alertErr.innerHTML = message;
  alertErr.classList.remove("d-none");
  setTimeout(() => {
    alertErr.classList.add("d-none");
  }, 5000);
};

validateInput = (name, email, pass, cpass) => {
  if (
    name.trim().length == 0 ||
    email.trim().length == 0 ||
    pass.trim().length == 0 ||
    cpass.trim().length == 0
  ) {
    showError("Required field is/are missing!");
    return false;
  }

  if (name.trim().length < 4) {
    showError("Name must be at least 4 characters!");
    return false;
  }
  const pattern = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );
  if (pattern.test(pass) == false || pattern.test(cpass) == false) {
    showError(
      "Password must contains at least 6 characters, including UPPERCASE/lowercase and numbers"
    );
    return false;
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
    showError("You have entered an invalid email address!");
    return false;
  }

  if (pass != cpass) {
    showError("Password mismatch");
    return false;
  }
  return true;
};

checkUser = (email, password) => {
  let users = loadFromLocal("users") || [];
  if (users.length < 1) {
    return -1;
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      return i;
    }
  }
  return -1;
};
logIn = () => {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;

  if (email.trim().length <= 0 || pass.trim().length <= 0) {
    showError("Required field is/are missing!");
    return;
  }

  if (checkUser(email, pass) > -1) {
    saveToLocal("userLoggedIn", { userID: checkUser(email, pass) });
    location.replace("./index.html");
    return;
  }
  showError("User not found");
};

signUp = () => {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  let cpass = document.getElementById("cpassword").value;

  if (!validateInput(name, email, pass, cpass)) {
    return;
  }

  let newUser = {
    name: name,
    email: email,
    password: pass,
    email: email,
    cart: [],
    orders: 0,
  };

  let users = loadFromLocal("users") || [];

  users[users.length] = newUser;

  if (checkUser(email, pass) > -1) {
    showError("Email already exist!");
    return;
  }

  saveToLocal("users", users);
  saveToLocal("userLoggedIn", { userID: checkUser(email, pass) });
  location.replace("./index.html");
};

logInForm = () => {
  if (getStarted != null) {
    let result = "";
    result +=
      ' <div class="container mt-5">' +
      '<div class="row item-center">' +
      '<div class="col-lg-6 col-sm-12 content-container">' +
      '<h3 class="item-center" style="color: green"><strong>Welcome back</strong></h3>' +
      '<p class="item-center">Log in to your account</p>' +
      '<div class="row item-center mt-5 d-none">' +
      '<div class="col-3 social-container item-center">' +
      '<button class="d-flex item-center">' +
      '<i class="fa-brands fa-facebook-square pe-2" style="color: blue"></i>' +
      "facebook" +
      "</button>" +
      "</div>" +
      '<div class="col-3 social-container item-center">' +
      '<button class="d-flex item-center">' +
      '<i class="fa-brands fa-google-plus-square pe-2" style="color: rgb(213, 0, 0)"></i>' +
      "google" +
      "</button>" +
      "</div>" +
      '<div class="col-3 social-container item-center">' +
      '<button class="d-flex item-center">' +
      '<i class="fa-brands fa-twitter-square pe-2" style="color: rgb(2, 138, 150)"></i>' +
      "twitter" +
      "</button>" +
      "</div>" +
      "</div>" +
      '<div class="row mt-3 d-none">' +
      '<p class="item-center">or</p>' +
      "</div>" +
      '<div class="row mt-5 mb-5 item-center">' +
      '<div class="col-8">' +
      '<div class="form">' +
      '<div class="alert alert-danger d-none p-2 my-3" style="font-size: 14px" role="alert">' +
      "</div>" +
      "<div>" +
      '<label for="email">Email/phone number</label>' +
      '<input type="text" id="email" name="username" required>' +
      "</div>" +
      '<div class="mt-3">' +
      '<label for="password">Password</label>' +
      '<input type="password" id="password" name="password" required>' +
      "</div>" +
      '<div class="d-flex mt-3">' +
      '<div class="col">' +
      '<div class="form-check form-switch">' +
      '<input class="form-check-input" type="checkbox" role="switch" id="rememberme">' +
      '<label class="form-check-label" for="rememberme">Remember me</label>' +
      '<a href="" class="float-end" style="font-size: 14px;">Forgot Password</a>' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="row mt-5">' +
      '<button class="checkout py-2" name="login" onClick="logIn()">Log in</button>' +
      '<button class="cancel py-2 mt-3" onclick="signUpForm()">Sign up</button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    getStarted.innerHTML = result;
  }
};
signUpForm = () => {
  if (getStarted != null) {
    let result = "";
    result +=
      ' <div class="container">' +
      '<div class="row item-center">' +
      '<div class="col-lg-6 col-sm-12 content-container">' +
      '<h3 class="item-center" style="color: green"><strong>Get Started</strong></h3>' +
      '<p class="item-center">Create your account</p>' +
      '<div class="row item-center mt-5 d-none">' +
      '<div class="col-3 social-container item-center">' +
      '<button class="d-flex item-center">' +
      '<i class="fa-brands fa-facebook-square pe-2" style="color: blue"></i>' +
      "facebook" +
      "</button>" +
      "</div>" +
      '<div class="col-3 social-container item-center">' +
      '<button class="d-flex item-center">' +
      '<i class="fa-brands fa-google-plus-square pe-2" style="color: rgb(213, 0, 0)"></i>' +
      "google" +
      "</button>" +
      "</div>" +
      '<div class="col-3 social-container item-center">' +
      '<button class="d-flex item-center">' +
      '<i class="fa-brands fa-twitter-square pe-2" style="color: rgb(2, 138, 150)"></i>' +
      "twitter" +
      "</button>" +
      "</div>" +
      "</div>" +
      '<div class="row mt-3 d-none">' +
      '<p class="item-center">or</p>' +
      "</div>" +
      '<div class="row mt-3 mb-5 item-center">' +
      '<div class="col-8">' +
      '<div class="form">' +
      '<div class="alert alert-danger d-none p-2 my-3" style="font-size: 13px" role="alert">' +
      "</div>" +
      "<div>" +
      '<label for="name">Display name</label>' +
      '<input type="text" id="name" name="name" required>' +
      "</div>" +
      '<div class="mt-3">' +
      '<label for="password">Password</label>' +
      '<input type="password" id="password" name="password" required>' +
      "</div>" +
      '<div class="mt-3">' +
      '<label for="cpassword">Confirm password</label>' +
      '<input type="password" id="cpassword" name="cpassword" required>' +
      "</div>" +
      '<div class="mt-3 mb-5 d-flex align-items-end">' +
      '<div class="col">' +
      '<label for="email">Email Address</label>' +
      '<input type="email" id="email" name="email" required>' +
      "</div>" +
      "</div>" +
      '<div class=" mt-5 mb-5 code text-center d-none" id="code">' +
      '<p style="font-size: 14px">Enter code sent to +6300000000</p>' +
      '<div class="item-center">' +
      '<input type="text"/>' +
      '<input type="text"/>' +
      '<input type="text"/>' +
      '<input type="text"/>' +
      '<input type="text"/>' +
      "</div>" +
      "</div>" +
      '<div class="d-flex text-center">' +
      '<p style="font-size: 14px">By creating an account, you agree to the Terms and condition and Privacy Policy of the app.</p>' +
      "</div>" +
      '<div class="row mt-5">' +
      '<button class="checkout py-2" name="signUp" onClick="signUp()">Sign up</button>' +
      '<button class="cancel py-2 mt-3" onclick="logInForm();">Log in</button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      " </div>" +
      "</div>";

    getStarted.innerHTML = result;
  }
};

signUpForm();

//adding to cart function
loadCart = () => {
  if (loggedInUserID() < 0) {
    return;
  }

  let cartListFromLocal = loadFromLocal("cart");
  let cartBadge = document.getElementById("cart-badge");
  let cartValue = document.querySelectorAll(".cart-value");
  cartBadge.style.display = "none";

  if (cartListFromLocal != "") {
    cartBadge.style.display = "block";
  } else {
    cartBadge.style.display = "none";
  }

  let finalPrice = 0;

  for (let i = 0; i < cartListFromLocal.length; i++) {
    finalPrice += parseInt(
      cartListFromLocal[i].price * cartListFromLocal[i].quantity
    );
  }

  cartValue.forEach((element) => {
    element.innerHTML = getTotalPrice(finalPrice);
  });

  //load cart
  let cart = document.getElementById("cart-list");
  if (cart != null) {
    cartList();
    let checkoutBtn = document.querySelector(".checkout");
    if (checkoutBtn != null) {
      if (cartListFromLocal != "") {
        checkoutBtn.style.backgroundColor = "green";
        checkoutBtn.removeAttribute("disabled");
      } else {
        checkoutBtn.style.backgroundColor = "gray";
      }
    }
  }
  getOrders();
};
addToCart = (id, quantity, element = null) => {
  let cartListFromLocal = loadFromLocal("cart") || [];
  if (loggedInUserID() < 0) {
    location.replace("./getStarted.html");
    return;
  }

  if (checkCart(id)) {
    location.replace("./mycart.html");
    return;
  }

  if (element != null) {
    let myAlert = document.querySelector(".toast");
    let bsAlert = new bootstrap.Toast(myAlert);

    element.innerHTML =
      '<span class="spinner-border text-success" style="height: 15px; width: 15px"></span> Adding...';
    setTimeout(() => {
      element.innerHTML =
        '<i class="fa-solid fa-circle-check" style="color: green"></i> View cart';
      bsAlert.show();
    }, 1000);

    setTimeout(() => {
      bsAlert.hide();
    }, 900);
  }

  if (cartListFromLocal != "") {
    for (let i = 0; i < cartListFromLocal.length; i++) {
      cartListFromLocal[i] = {
        id: cartListFromLocal[i].id,
        quantity: cartListFromLocal[i].quantity,
      };
    }
  }

  cartListFromLocal[cartListFromLocal.length] = {
    id: id,
    quantity: quantity,
  };

  let featuredProducts = loadFromLocal("products");

  for (let i = 0; i < cartListFromLocal.length; i++) {
    for (let j = 0; j < featuredProducts.data.length; j++) {
      if (cartListFromLocal[i].id == featuredProducts.data[j].item_id) {
        cartListFromLocal[i]["url"] = featuredProducts.data[j].img_url;
        cartListFromLocal[i]["title"] = featuredProducts.data[j].main_title;
        cartListFromLocal[i]["price"] = parseInt(
          featuredProducts.data[j].price
        );
      }
    }
  }

  //save item to cart
  saveToLocal("cart", cartListFromLocal);
  let users = loadFromLocal("users") || [];

  for (let i = 0; i < users.length; i++) {
    if (i === loggedInUserID()) {
      users[i]["cart"] = cartListFromLocal;
      saveToLocal("users", users);
    }
  }
  loadCart();
};
checkCart = (id) => {
  let cartListFromLocal = loadFromLocal("cart");
  for (let i = 0; i < cartListFromLocal.length; i++) {
    if (id == cartListFromLocal[i].id) {
      return true;
    }
  }
  return false;
};

cartList = () => {
  let cartListFromLocal = loadFromLocal("cart");
  let cart = document.getElementById("cart-list");

  if (cart == null) {
    return;
  }

  cart.innerHTML = "";

  if (cartListFromLocal == "") {
    cart.innerHTML =
      '<div class="item-center my-5"><a href="./products.html" style="text-decoration: none; color: black"><div class="empty-cart text-center"><span><i class="fa-solid fa-cart-plus" style="font-size:40px"></i></span><br><span style="font-size: 14px">Add item/s </span></div></a></div>';
  }

  for (let i = cartListFromLocal.length - 1; i >= 0; i--) {
    cart.innerHTML +=
      '<div class="row my-cart" >' +
      '<div class="col-md-6 d-flex">' +
      '<div class="row">' +
      '<img src="' +
      cartListFromLocal[i].url +
      '" alt="">' +
      '<div class="col mt-1">' +
      '<div class="row">' +
      '<p class="product-name" style="font-size: 16px;"><a href="./productDetails.html?id=' +
      cartListFromLocal[i].id +
      '">' +
      cartListFromLocal[i].title +
      "</a></p>" +
      '<div class="col">' +
      '<div class="col-6 d-flex align-items-center product-specific-quantity">' +
      '<span style="display: none">' +
      i +
      "</span>" +
      '<button class="minus"><i class="fa-solid fa-minus"></i></button>' +
      '<button style="border: none; color: rgb(46, 46, 46); cursor: default; font-size: 16px; background-color: transparent" class="value">' +
      cartListFromLocal[i].quantity +
      "</button>" +
      '<button class="plus"><i class="fa-solid fa-plus"></i></i></button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="col d-flex my-cart-variation product-specific-variant">' +
      '<label class="" style="font-size: 15px">Color/Size: </label>' +
      '<div class = "" style="margin-left: 3px; margin-top: 0px; font-size: 14px">' +
      " <span>Blue / L</span>" +
      "</div>" +
      "</div>" +
      '<div class="col text-end">' +
      '<div class="row">' +
      '<h5 class="px-3"><strong class="price-value">' +
      getTotalPrice(
        parseInt(cartListFromLocal[i].price * cartListFromLocal[i].quantity)
      ) +
      "</strong></h5>" +
      "</div>" +
      '<div class="row text-end">' +
      '<div class="col-12 my-cart-button-delete-one ">' +
      '<span style="display: none">' +
      i +
      "</span>" +
      '<button class="removeItem"><i class="fa-solid fa-trash"></i>Remove</button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
  }

  let countCart = document.querySelector(".product-specific-brand");
  if (countCart != null) {
    countCart.innerHTML = cartListFromLocal.length;
  }
  quantityEditor();

  document.querySelector(".btn-delete-all").onclick = function () {
    saveToLocal("cart", "");
    let users = loadFromLocal("users") || [];
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      if (i === loggedInUserID()) {
        user["cart"] = "";
      }
      users[i] = user;
    }

    saveToLocal("users", users);

    console.log(users);
    location.replace("./mycart.html");
  };
};

getOrders = () => {
  let cartList = loadFromLocal("cart");
  let order = document.getElementById("order-history");
  let finalPrice = 0;
  if (order == null) {
    return;
  }
  let url = window.location;
  let searchParams = new URLSearchParams(url.search);
  let id = searchParams.get("id");

  if (id != null) {
    let product = loadFromLocal("products");
    cartList = new Array();
    for (let i = 0; i < product.data.length; i++) {
      if (product.data[i].item_id == id) {
        let itemToBuy = new Array();
        itemToBuy.id = product.data[i].item_id;
        itemToBuy.url = product.data[i].img_url;
        itemToBuy.title = product.data[i].main_title;
        itemToBuy.quantity = 1;
        itemToBuy.price = product.data[i].price;
        cartList.push(itemToBuy);
        break;
      }
    }
  }
  for (let i = cartList.length - 1; i >= 0; i--) {
    order.innerHTML +=
      "" +
      '<div class="row order-details-item">' +
      '<div class="col-9">' +
      '<div class="d-flex order-details">' +
      '<img src="' +
      cartList[i].url +
      '" ' +
      'alt="">' +
      "<div>" +
      '<h6 class="product-name">' +
      cartList[i].title +
      "</h6>" +
      "<p>x" +
      cartList[i].quantity +
      "</p>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="col order-details-price">' +
      "" +
      getTotalPrice(
        parseInt(cartList[i].price) * parseInt(cartList[i].quantity)
      ) +
      "" +
      "</div>" +
      "</div>";

    finalPrice += parseInt(cartList[i].price) * parseInt(cartList[i].quantity);
  }
  document.getElementById("subtotal").innerHTML = getTotalPrice(finalPrice);
  document.getElementById("discount").innerHTML = getTotalPrice(0);
  document.getElementById("total").innerHTML = getTotalPrice(finalPrice);

  document.getElementById("payment-received").onclick = function () {
    saveToLocal("cart", "");
    let users = loadFromLocal("users") || [];
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      if (i === loggedInUserID()) {
        user["cart"] = "";
        user["orders"] = parseInt(user.orders) + parseInt(cartList.length);
      }
      users[i] = user;
    }

    saveToLocal("users", users);
    location.replace("./index.html");
  };
};

quantityEditor = () => {
  document.querySelectorAll(".minus").forEach((button) => {
    button.onclick = function () {
      let cartListFromLocal = loadFromLocal("cart") || [];
      let index = this.parentElement.children[0].innerText;
      let quantityValue = parseInt(this.parentElement.children[2].innerText);
      let quantityContainer = this.parentElement.children[2];
      let price = document.querySelectorAll(".price-value");

      quantityValue--;

      if (quantityValue < 1) {
        quantityValue = 1;
      }

      quantityContainer.innerText = quantityValue;
      cartListFromLocal[index].quantity = quantityValue;
      console.log(cartListFromLocal);
      price[index].innerHTML = getTotalPrice(
        parseInt(
          cartListFromLocal[index].price * cartListFromLocal[index].quantity
        )
      );
      saveToLocal("cart", cartListFromLocal);

      let users = loadFromLocal("users") || [];
      for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (i === loggedInUserID()) {
          user["cart"] = cartListFromLocal;
        }
        users[i] = user;
      }

      saveToLocal("users", users);

      loadCart();
    };
  });
  document.querySelectorAll(".plus").forEach((button) => {
    button.onclick = function () {
      let cartListFromLocal = loadFromLocal("cart") || [];
      let index = this.parentElement.children[0].innerText;
      let quantityValue = parseInt(this.parentElement.children[2].innerText);
      let quantityContainer = this.parentElement.children[2];
      let price = document.querySelectorAll(".price-value");

      quantityValue++;

      quantityContainer.innerText = quantityValue;
      cartListFromLocal[index].quantity = quantityValue;
      console.log(cartListFromLocal);
      price[index].innerHTML = getTotalPrice(
        parseInt(
          cartListFromLocal[index].price * cartListFromLocal[index].quantity
        )
      );
      saveToLocal("cart", cartListFromLocal);

      let users = loadFromLocal("users") || [];
      for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (i === loggedInUserID()) {
          user["cart"] = cartListFromLocal;
        }
        users[i] = user;
      }

      saveToLocal("users", users);

      loadCart();
    };
  });

  document.querySelectorAll(".removeItem").forEach((button) => {
    button.onclick = function () {
      let cartListFromLocal = loadFromLocal("cart") || [];
      let index = this.parentElement.children[0].innerText;

      let newList = [];
      let newIndex = 0;
      for (let i = 0; i < cartListFromLocal.length; i++) {
        if (i != index) {
          newList[newIndex] = cartListFromLocal[i];
          newIndex++;
        }
      }
      //saveToLocal('cart', newList);

      let users = loadFromLocal("users") || [];
      for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (i === loggedInUserID()) {
          user["cart"] = newList;
        }
        users[i] = user;
      }

      saveToLocal("users", users);

      console.log(users);

      if (cartListFromLocal.length == 1) {
        location.replace("./mycart.html");
        return;
      }

      loadCart();
      cartList();
    };
  });
};

//search function
let containerWidth = 0;
showSearchContainer = (element) => {
  let container = document.querySelector(".search-container");
  let offset = getOffset(element);
  container.style.display = "block";
  container.style.left = parseInt(offset.left - 15) + "px";
  container.style.top = parseInt(offset.top + 40) + "px";

  if (containerWidth == 0) {
    containerWidth = parseInt(container.offsetWidth + 50);
  }
  container.style.width = containerWidth + "px";
};
getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
};

hideSearchContainer = () => {
  let container = document.querySelector(".search-container");
  setTimeout(() => {
    container.style.display = "none";
    //container.style.width = container.offsetWidth + "px";
  }, 500);
};

searchItem = (element) => {
  const products = loadFromLocal("products");
  const container = document.querySelector(".search-container");
  let result = document.querySelector(".results");
  let value = element.value.trim();

  result.innerHTML = "";

  if (value == "") {
    result.innerHTML = "<p class='text-center'><i>Try dress...</i></p>";
    return;
  }

  let ul = document.createElement("ul");
  let isResult = false;

  products.data.forEach(function (product) {
    if (product.main_title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
      let li = document.createElement("li");
      let link = "./productDetails.html?id=" + parseInt(product.item_id);
      console.log(link);
      li.innerHTML =
        "<a href='" +
        link +
        "' style='text-decoration: none; color: green'>" +
        product.main_title +
        "</a>";
      ul.appendChild(li);
      isResult = true;

      console.log(product.item_id);
    }
  });

  result.appendChild(ul);

  if (!isResult) {
    result.innerHTML =
      "<p class='text-center'>'<b>" + value + "</b>'" + " not found </p>";
  }

  console.log(products);
};

//filter
applyFilter = (allProductsList, filterIndex, featuredProducts, minValue, maxValue) => {
    console.log(minValue);
    console.log(maxValue);
  allProductsList.innerHTML = "";
  filterIndex.forEach((index) => {
    for (let i = 0; i < featuredProducts.data.length; i++) {
      if (parseInt(index) + 1 == featuredProducts.data[i].category) {
        if (maxValue != 0) {
          if (
            parseInt(featuredProducts.data[i].price) >= minValue &&
            parseInt(featuredProducts.data[i].price) <= maxValue
          ) {
            allProductsList.innerHTML += getProduct(featuredProducts.data[i]);
          }
        } else {
          allProductsList.innerHTML += getProduct(featuredProducts.data[i]);
        }
      }
    }
  });

  if (filterIndex.length > 0) {
    return;
  }

  //display records
  for (let i = 0; i < featuredProducts.data.length; i++) {
    if (maxValue != 0) {
      if (
        parseInt(featuredProducts.data[i].price) >= minValue &&
            parseInt(featuredProducts.data[i].price) <= maxValue
      ) {
        allProductsList.innerHTML += getProduct(featuredProducts.data[i]);
      }
    } else {
      allProductsList.innerHTML += getProduct(featuredProducts.data[i]);
    }
  }
};

//profile function
let isProfileContainerVisible = false;
showProfileContainer = (element) => {
  let container = document.querySelector(".profile-container");
  let offset = getOffset(element);

  if (isProfileContainerVisible) {
    container.style.display = "none";
  } else {
    container.style.display = "block";
  }

  container.style.left = parseInt(offset.left - 15) + "px";
  container.style.top = parseInt(offset.top + 40) + "px";

  if (containerWidth == 0) {
    containerWidth = parseInt(container.offsetWidth + 50);
  }
  container.style.width = containerWidth + "px";

  let logout = document.querySelector(".logOut");
  logout.onclick = function () {
    logOut();
  };

  isProfileContainerVisible = !isProfileContainerVisible;
};
//waiting for data
apiResponse = async (url) => {
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

  const response =
    options != null ? await fetch(url, options) : await fetch(url);
  const result = await response.json();
  return result;
};

//call each api
apiCall = async () => {
  //const today = new Date().getMonth() + 1 + "" + new Date().getDate() + "" + new Date().getFullYear();

  //nav
  //localStorage.clear();
  if (loggedInUserID() > -1) {
    const navItems = document.querySelector(".nav-items");
    for (
      let i = navItems.childElementCount - 1;
      i >= navItems.childElementCount - 3;
      i--
    ) {
      navItems.children[i].classList.add("d-none");
    }
    let li = document.createElement("li");
    let link = document.createElement("a");

    li.classList.add("nav-item");
    link.classList.add("nav-link", "ps-3", "pe-3");
    link.innerHTML = "My Account";

    link.onclick = function () {
      showProfileContainer(this);
    };

    li.appendChild(link);

    navItems.appendChild(li);
  }

  let featuredProducts = loadFromLocal("products");
  //localStorage.clear();

  //load cart first
  loadCart();

  //cart.html
  cartList();

  //set placeholders
  if (todaysDeal != null) {
    todaysDeal.innerHTML = productsPlaceHolder(5);
  }

  featuredProducts = await apiResponse("./php/ennea.api.php?products=1");
  saveToLocal("products", featuredProducts);

  if (categories != null) {
    getCategories();

    let bestOffer = loadFromLocal("bestOffer");

    if (bestOffer == "") {
      let rand =
        Math.floor(Math.random() * featuredProducts.data.length - 1) + 1;
      bestOffer = featuredProducts.data[rand];
      saveToLocal("bestOffer", bestOffer);
      getBestOffer(bestOffer);
    } else {
      getBestOffer(bestOffer);
    }
  }

  if (todaysDeal != null) {
    newProducts.innerHTML = "";
    for (
      let i = featuredProducts.data.length - 1;
      i >= parseInt(featuredProducts.data.length - 1 - 3);
      i--
    ) {
      console.log(featuredProducts.data[i]);
      newProducts.innerHTML += getProduct(featuredProducts.data[i]);
    }

    todaysDeal.innerHTML = "";
    let items = [];
    while (items.length < 8) {
      let rand =
        Math.floor(Math.random() * featuredProducts.data.length - 1) + 1;
      if (!items.includes(rand)) {
        items.push(rand);
        todaysDeal.innerHTML += getProduct(featuredProducts.data[rand]);
      }
    }
  }

  if (youMayAlsoLIke != null) {
    youMayAlsoLIke.innerHTML = "";

    let url = window.location;
    let searchParams = new URLSearchParams(url.search);
    let id = searchParams.get("id");

    let details = featuredProducts.data[id - 1];
    // if(details == "" && id != null){
    //     //saveToLocal(id, details);
    // }

    let cartList = document.getElementById("cart-list");
    if (cartList == null) {
      getProductDetails(details);
    }

    //random products for "also you may like"
    let randLikes = [];
    let total = 8;
    while (randLikes.length < total) {
      let rand =
        Math.floor(Math.random() * featuredProducts.data.length - 1) + 1;
      if (!randLikes.includes(rand)) {
        randLikes.push(rand);
      }
    }

    randLikes.forEach((i) => {
      youMayAlsoLIke.innerHTML += getProduct(featuredProducts.data[i]);
    });
  }

  //all products
  let allProductsList = document.getElementById("products");
  if (allProductsList != null) {
    //display records
    for (let i = 0; i < featuredProducts.data.length; i++) {
      allProductsList.innerHTML += getProduct(featuredProducts.data[i]);
    }

    let categoryItemContainer = document.getElementById(
      "item-options-container"
    );
    let categoryCollection = [
      "Women",
      "Men",
      "Unisex",
      "Outwear",
      "Kids",
      "Swim",
    ];
    let categoryCollectionCounts = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < featuredProducts.data.length; i++) {
      if (featuredProducts.data[i].category == 1) {
        categoryCollectionCounts[0] = parseInt(categoryCollectionCounts[0]) + 1;
      } else if (featuredProducts.data[i].category == 2) {
        categoryCollectionCounts[1] = parseInt(categoryCollectionCounts[1]) + 1;
      } else if (featuredProducts.data[i].category == 3) {
        categoryCollectionCounts[2] = parseInt(categoryCollectionCounts[2]) + 1;
      } else if (featuredProducts.data[i].category == 4) {
        categoryCollectionCounts[3] = parseInt(categoryCollectionCounts[3]) + 1;
      }
    }

    if (categoryItemContainer != null) {
        categoryItemContainer.innerHTML = "";

        categoryItemContainer.innerHTML +=
            '<h6 class="mb-3"><strong>By Category</strong></h6>';
        for (let i = 0; i < categoryCollection.length; i++) {
            categoryItemContainer.innerHTML +=
            '<div class="item">' +
            '<input type="checkbox" class="form-check-input me-3" id="' +
            categoryCollection[i] +
            '">' +
            '<label for="' +
            categoryCollection[i] +
            '"><span> ' +
            categoryCollection[i] +
            '</span> <span style="color: gray">(' +
            categoryCollectionCounts[i] +
            ")</span></label>" +
            "</div>";
        }

        categoryItemContainer.innerHTML +=
            ' <h6 class="mt-3 mb-3"><strong>By Price</strong></h6>';
        categoryItemContainer.innerHTML +=
            '<div class="item-center">' +
            "<span>Min</span>" +
            '<input type="number" class="form-control mx-2 min-price">' +
            "<span>Max</span>" +
            '<input type="number" class="form-control mx-2 max-price">' +
            "</div>";

        let filterItemContainer = document.getElementById("filter-collection");
        let filterSelects = new Array();
        let filterIndex = new Array();
        filterItemContainer.innerHTML = "";

        const minPrice = document.querySelector(".min-price");
        const maxPrice = document.querySelector(".max-price");

        let maxValue = Number.MAX_VALUE;
        let minValue = 0;

        //on text change
        minPrice.onkeyup = function () {
            minValue = !minPrice.value ? 0 : minPrice.value.trim();
            maxValue = !maxPrice.value ? Number.MAX_VALUE : maxPrice.value.trim();

            if (minValue > maxValue) {
                this.value = "";
                this.value = maxValue;
            }
            applyFilter(allProductsList, filterIndex, featuredProducts, minValue, maxValue);
        };
        maxPrice.onkeyup = function () {
            minValue = !minPrice.value ? 0 : minPrice.value.trim();
            maxValue = !maxPrice.value ? Number.MAX_VALUE : maxPrice.value.trim();

            if (minValue > maxValue) {
                this.value = "";
                this.value = minValue;
            }
            applyFilter(allProductsList, filterIndex, featuredProducts, minValue, maxValue);
        };

        //from url
        let url = window.location;
        let searchParams = new URLSearchParams(url.search);
        let categoryId = searchParams.get("categoryId");

        if(categoryId != null){
            filterIndex.push(categoryId);
           document.getElementById( categoryCollection[categoryId]).checked = true;
            console.log(categoryCollection[categoryId]);
            applyFilter(allProductsList, filterIndex, featuredProducts, minValue, maxValue);
        }

        for (let i = 0; i < categoryCollection.length; i++) {
            document.getElementById(categoryCollection[i]).onclick = function () {
            let category = this.parentElement.children[1].children[0].innerHTML;
            if (this.checked) {
                filterSelects.push(category);
                filterIndex.push(i);
            } else {
                for (let i = 0; i < filterSelects.length; i++) {
                if (category === filterSelects[i]) {
                    filterSelects.splice(i, 1);
                    filterIndex.splice(i, 1);
                }
                }
            }

            filterItemContainer.innerHTML = "";
            filterSelects.forEach((item) => {
                filterItemContainer.innerHTML +=
                '<span class="filter">' + item + "</span>";
            });
            applyFilter(allProductsList, filterIndex, featuredProducts, minValue, maxValue);
            };
        }
        }
  }
};

_initData();
apiCall();
