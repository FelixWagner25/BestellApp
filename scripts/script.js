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
    renderBasket();
    calculateSums();
  } else {
    basketDishes.push(dishObject);
    renderBasket();
    calculateSums();
  }
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
  renderBasket();
}

function removeFromBasket(indexBasketDish) {
  setCounterDown(basketDishes[indexBasketDish]);
  renderBasket();
}

function deleteFromBasket(indexBasketDish) {
  basketDishes.pop(basketDishes[indexBasketDish]);
  renderBasket();
}

function renderBasket() {
  let basketContentRef = document.getElementById("basket-dishes");
  basketContentRef.innerHTML = "";
  for (let indexDish = 0; indexDish < basketDishes.length; indexDish++) {
    basketContentRef.innerHTML += getBasketDishTemplate(indexDish);
  }
}

function calculateSums() {}
