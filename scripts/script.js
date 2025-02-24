// Funktionalitäten
// Gerichte hinzufügen durch klicken auf Plus Symbol am rechten oberen Rand
// Gerichte hinzufügen, wenn sie im Warenkorb sind
// Gerichtemenge reduzieren, wenn sie im Warenkorb sind
// Mengengerechte Preisberechnung
// Gericht löschen im Warenkorb
// Berechnung Zwischensumme
// Berechnung Lieferkosten
// Berechnung Gesamtsumme
// Schalter mit Lieferung oder Selbstabholung
// Bestellen-Button: Meldung, dass Bestellung vorgenommen wurde; kein Alert!. Leerung des Warenkorbs.
// Auch wenn alle Gerichte ausgewählt werde, darf der Warenkorb nicht "überlaufen"
// Der Desktop-Warenkorb sollte immer oben an der Seite angeheftet sein, außer wenn man ganz oben oder zanb unten auf der Seite ist.
// Meine Präferenz: Warenkorb bekommt eigene Datenstruktur.
//
// Code
// Aussagekräftige Namen für Fkt und Variablen
// camelCase
// Formatierung
// Höchstens 14 Zeilen pro Fkt.
// Gleicher Abstand zwischen Fkt (1 oder 2 Leerzeichen).
// Lange HTML-templates ind extra Funktionen

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
  renderBasket("resp-basket-dishes");
  renderTotals("resp-basket-totals");
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
  contentRef = document.getElementById("content-span");
  respBaketRef = document.getElementById("resp-basket");
  contentRef.style.display = "none";
  respBaketRef.style.display = "block";
  renderBasket("resp-basket-dishes");
  renderTotals("resp-basket-totals");
}

function backToHome() {
  contentRef = document.getElementById("content-span");
  respBaketRef = document.getElementById("resp-basket");
  contentRef.style.display = "flex";
  respBaketRef.style.display = "none";
}
