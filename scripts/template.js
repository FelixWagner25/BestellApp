function getDishTemplate(indexDish, arrayElementId) {
  let dishesArray = getArrayByElementId(arrayElementId);
  return `
    <div class="dish-tile-span pd-l-deflt margin-tb-16px">
       <div class="dish-tile pd-tb-16px">
            <p class="dish-title">${dishesArray[indexDish].name}</p>
            <p class="dish-description">
                ${dishesArray[indexDish].description}
            </p>
            <p class="dish-price">${getPriceTemplate(
              dishesArray[indexDish].price
            )} EUR</p>
        </div>
        <button class="add-btn pd" onclick='addToBasket("${
          arrayElementId + "_" + indexDish
        }")'>
        <img
            src="./assets/icons/add.png"
            alt="Add"
            class="add-dish-img"
        />
        </button>
    </div>
    `;
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

function getBasketDishTemplate(dishObject) {
  return `
    <section class="basket-dish pd-lr-small">
        <h3 class="pd-b-8px pd-t-16px">${dishObject.name}</h3>
        <div class="basket-content">
        <div class="basket-add-remove">
            <button class="basket-btn">
            <img
                src="./assets/icons/add.png"
                alt="plus"
                class="basket-btn-img"
            />
            </button>
            <span class="basket-counter">${dishObject.quantity} x</span>
            <button class="basket-btn">
            <img
                src="./assets/icons/remove.png"
                alt="minus"
                class="basket-btn-img"
            />
            </button>
        </div>
        <div class="basket-dish-sum">${getPriceTemplate(
          dishObject.price
        )} €</div>
        <button class="basket-btn">
            <img
            src="./assets/icons/delete.png"
            alt="trash"
            class="basket-btn-img"
            />
        </button>
        </div>
    </section>
`;
}
