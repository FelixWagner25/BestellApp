function getDishesTemplate(indexDish, arrayElementId) {
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
        <button class="add-btn pd">
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
