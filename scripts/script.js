function init() {
  loadDishes("starter-dishes");
  loadDishes("main-dishes");
  loadDishes("dessert-dishes");
}

function loadDishes(dishesElementId) {
  let contentRef = document.getElementById(dishesElementId);
  for (let i = 0; i < starterDishes.length; i++) {
    contentRef.innerHTML += getDishTemplate(i, dishesElementId);
  }
}

function addToBasket(elementId) {
  let dishObject = getDishObject(elementId);

  if (isContainedInBasket(dishObject) == true) {
    setCounterUp(dishObject);
    renderAllBasketsAndTotals();
  } else {
    basketDishes.push(dishObject);
    renderAllBasketsAndTotals();
  }
}

function renderAllBasketsAndTotals() {
  renderBasket("basket-dishes");
  renderTotals("basket-totals");
  renderSubmitBtn();
}

function getDishObject(elementId) {
  let splitElementId = elementId.split("_");
  let arrayFromElementId = getArrayByElementId(splitElementId[0]);
  let indexFromElementId = parseInt(splitElementId[1]);
  let dishObject = arrayFromElementId[indexFromElementId];
  return dishObject;
}

function isContainedInBasket(dishObject) {
  if (basketDishes.includes(dishObject) == true) {
    return true;
  } else {
    return false;
  }
}

function setCounterUp(dishObject) {
  dishObject.quantity = dishObject.quantity + 1;
}

function setCounterDown(dishObject) {
  if (dishObject.quantity > 1) {
    dishObject.quantity = dishObject.quantity - 1;
  } else {
    deleteFromBasket(dishObject);
  }
}

function addInBasket(indexBasketDish) {
  setCounterUp(basketDishes[indexBasketDish]);
  renderAllBasketsAndTotals();
}

function removeFromBasket(indexBasketDish) {
  setCounterDown(basketDishes[indexBasketDish]);
  renderAllBasketsAndTotals();
}

function deleteFromBasket(indexBasketDish) {
  basketDishes.pop(basketDishes[indexBasketDish]);
  renderAllBasketsAndTotals();
}

function renderBasket(elementId) {
  let basketContentRef = document.getElementById(elementId);
  basketContentRef.innerHTML = "";
  for (let indexDish = 0; indexDish < basketDishes.length; indexDish++) {
    basketContentRef.innerHTML += getBasketDishTemplate(indexDish);
  }
}

function renderTotals(elementId) {
  let subTotal = calculateSubtotal();
  let total = calculateTotal();
  let deliveryFee = setDisplayedDeliveryFee();

  let totalsContentRef = document.getElementById(elementId);
  totalsContentRef.innerHTML = "";
  totalsContentRef.innerHTML = getTotalsTemplate(subTotal, total, deliveryFee);
}

function calculateSubtotal() {
  let subTotal = 0;
  for (let indexDish = 0; indexDish < basketDishes.length; indexDish++) {
    subTotal =
      subTotal +
      basketDishes[indexDish].price * basketDishes[indexDish].quantity;
  }
  return subTotal;
}

function calculateTotal() {
  let total = 0;
  let subTotal = calculateSubtotal();

  if (subTotal == 0) {
    total = 0;
  } else {
    total = subTotal + deliveryFee;
  }
  return total;
}

function setDisplayedDeliveryFee() {
  let displayedDeliveryFee = deliveryFee;
  let subTotal = calculateSubtotal();

  if (subTotal == 0) {
    displayedDeliveryFee = 0;
  }

  return displayedDeliveryFee;
}

function openRespBasket() {
  contentRef = document.getElementById("content");
  contentSpanRef = document.getElementById("content-span");
  respBasketRef = document.getElementById("basket");
  respBasketBtnRef = document.getElementById("resp-basket-btn-span");
  addMoreBtnRef = document.getElementById("add-more-btn-span");

  contentRef.style.display = "none";
  contentSpanRef.style.alignItems = "center";
  respBasketRef.style.display = "block";
  respBasketBtnRef.style.display = "none";
  addMoreBtnRef.style.display = "block";
}

function backToHome() {
  contentRef = document.getElementById("content");
  contentSpanRef = document.getElementById("content-span");
  respBasketRef = document.getElementById("basket");
  respBasketBtnRef = document.getElementById("resp-basket-btn-span");

  contentRef.style.display = "block";
  contentSpanRef.style.alignItems = "";
  respBasketRef.style.display = "none";
  respBasketBtnRef.style.display = "block";
}

function renderSubmitBtn() {
  let submitBtnRef = document.getElementById("order-btn");

  if (basketDishes.length == 0) {
    submitBtnRef.style.display = "none";
  } else {
    submitBtnRef.style.display = "block";
  }
}

function placeOrder() {
  emptyBasket();
  renderAllBasketsAndTotals();
  showSuccessMessage();
}

function emptyBasket() {
  basketDishes = [];
}

function showSuccessMessage() {
  let messageRef = document.getElementById("success-message");
  messageRef.style.display = "block";
}

function closeMessage(elementId) {
  let messageRef = document.getElementById(elementId);
  messageRef.style.display = "none";
}

function getArrayByElementId(elementId) {
  let selectedArray = [];
  if (elementId == "starter-dishes") {
    selectedArray = starterDishes;
  } else if (elementId == "main-dishes") {
    selectedArray = mainDishes;
  } else if (elementId == "dessert-dishes") {
    selectedArray = dessertDishes;
  }

  return selectedArray;
}

function getPriceTemplate(priceNumber) {
  let priceNumberStr = String(priceNumber.toFixed(2));
  priceNumberStr = replaceDotWithComma(priceNumberStr);
  return priceNumberStr;
}

function roundToTowDigets(number) {
  let roundedNumber = number.toFixed(2);
  return roundedNumber;
}

function replaceDotWithComma(decimalDotsStr) {
  let decimalCommaStr = decimalDotsStr.replace(".", ",");
  return decimalCommaStr;
}
