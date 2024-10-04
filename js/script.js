function getIndividualValue(button) {
  console.log("Add");
  
  const cardsInfo = JSON.parse(localStorage.getItem("cardInfo")) || [];
  const closeParent = button.closest(".best_shoes");
  const heading = closeParent.querySelector(".best_text").innerHTML;
  const shoesPrice = parseFloat(
    closeParent.querySelector(".shoes-price").innerHTML
  );
  const img = closeParent.querySelector("#img").src;

  const itemExists = cardsInfo.some((item) => item.text === heading);

  if (!itemExists) {
    const cardDetails = {
      img: img,
      text: heading,
      price: shoesPrice,
      currentQty: 1,
      totalPrice: shoesPrice,
    };
    cardsInfo.push(cardDetails);
    localStorage.setItem("cardInfo", JSON.stringify(cardsInfo));
    offcanvasDiv();
  } else {
    console.log("Item already exists in the cart");
  }
 
}

function saleShoesValue(button) {
  const cardsInfo = JSON.parse(localStorage.getItem("cardInfo")) || [];
  const closestParent = button.closest(".racing_shoes");
  const saleShoesPrice = parseFloat(
    closestParent.querySelector(".sale-price").innerHTML
  );
  const img = closestParent.querySelector("#img").src;

  const shoesPriceObj = {
    text: "Sale Shoes",
    img: img,
    price: saleShoesPrice,
    currentQty: 1,
    totalPrice: saleShoesPrice,
  };
  cardsInfo.push(shoesPriceObj);
  localStorage.setItem("cardInfo", JSON.stringify(cardsInfo));
}

function buyNow(button) {
  console.log("Buy now");
  const cardsInfo = JSON.parse(localStorage.getItem("cardInfo")) || [];

  const closestParent = button.closest(".carousel-item");
  const shoesText = closestParent.querySelector(".mens_taital").innerHTML;
  const img = closestParent.querySelector("#img").src;

  const shoesPriceObj = {
    img: img,
    text: shoesText,
    price: 500,
    currentQty: 1,
    totalPrice: 500,
  };
  cardsInfo.push(shoesPriceObj);
  localStorage.setItem("cardInfo", JSON.stringify(cardsInfo));
}

function decreaseQuantity(index) {
  let cardInfo = JSON.parse(localStorage.getItem("cardInfo"));
  const qtyInput = document.getElementById(`qty-input-${index}`);

  let currentQty = parseInt(qtyInput.value);
  if (currentQty > 1) {
    currentQty -= 1;
    qtyInput.value = currentQty;

    let itemPrice = parseFloat(cardInfo[index].price);
    let totalItemPrice = itemPrice * currentQty;

    cardInfo[index].currentQty = currentQty;
    cardInfo[index].totalPrice = totalItemPrice;

    localStorage.setItem("cardInfo", JSON.stringify(cardInfo));
    document.querySelector(`#price-${index}`).innerHTML = totalItemPrice;
    refrshFunction();
    console.log(`Quantity: ${currentQty}, Total Price: ${totalItemPrice}`);
  } else {
    alert("Quantity cannot be less than 1");
  }
}

function increaseQuantity(index) {
  let cardInfo = JSON.parse(localStorage.getItem("cardInfo")) || [];
  const qtyInput = document.getElementById(`qty-input-${index}`);

  let currentQty = parseInt(qtyInput.value);
  currentQty += 1;
  qtyInput.value = currentQty;

  let itemPrice = parseFloat(cardInfo[index].price);
  let totalItemPrice = itemPrice * currentQty;

  cardInfo[index].currentQty = currentQty;
  cardInfo[index].totalPrice = totalItemPrice;

  localStorage.setItem("cardInfo", JSON.stringify(cardInfo));
  document.querySelector(`#price-${index}`).innerHTML = totalItemPrice;
  refrshFunction();
  console.log(`Quantity: ${currentQty}, Total Price: ${totalItemPrice}`);
}

function tableFun() {
  const cardInfo = JSON.parse(localStorage.getItem("cardInfo")) || [];
  const CheckOutList = document.querySelector(".check-out-list");
  const table = document.createElement("table");
  table.classList.add("table-style");
  table.innerHTML = `
    <thead class="thead-dark">
      <tr>
        <th scope="col">Sr no.</th>
        <th scope="col">Images</th>
        <th scope="col">Quantity</th>
        <th scope="col">Actual Price</th>
        <th scope="col">Total Price</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector("tbody");
  cardInfo.forEach((item, index) => {
    const { totalPrice, text, price, img, currentQty } = item;
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td><img src="${img}" width="50" /></td>
      <td>${currentQty}</td>
      <td>${price}</td>
      <td>${totalPrice}</td>
    `;
    tbody.appendChild(row);
  });
  CheckOutList.appendChild(table);
}
window.onload = tableFun();

function offcanvasDiv() {
  console.log("offcanvasDivfun");
  // const existingOffcanvas = document.getElementById("offcanvasRight");
  // if (existingOffcanvas) {
  //   existingOffcanvas.remove();
  // }
  
  let cardsInfo = JSON.parse(localStorage.getItem("cardInfo")) || [];
  console.log(cardsInfo,"cardsInfo");
  let totalPriceResult = cardsInfo?.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.totalPrice);
  }, 0);


  const newdiv = document.createElement("div");
  newdiv.innerHTML = `
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header" style="background:#c14e59; color:white;">
        <h5 class="offcanvas-title fw-bold text-white" id="offcanvasRightLabel">Shopping Cart</h5>
        <button type="button" class="btn-close fw-bold" style="color:white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body" style="background:#fd4d5a"></div>
      <div class="d-flex justify-content-around align-items-center my-2">
        <h4 class="my-auto">Total</h4>
        <h4 class="my-auto" id="total-price">${totalPriceResult}</h4>
      </div>
      <a href="contact.html" type="button" class="btn btn-danger mx-5 my-2">Checkout</a>
    </div>
  `;

  const offcanvasBody = newdiv.querySelector(".offcanvas-body");
  cardsInfo?.map((item, index) => {
    const itemHTML = `
      <div class=" container mt-2 rounded-3 py-3" id="items-card-${index}" style="background:white; height:auto;">
        <div class="d-flex justify-content-between align-items-center">
          <div class="p-2 w-25">
            <img src=${item.img} class="img-fluid" alt="Shoes Image" style="max-height: 80px; object-fit: cover;" />
          </div>
          <div class="px-3">
            <div class="d-flex flex-column">
              <h6 class="mb-2">${item.text}</h6>
              <div class="increment-decrement d-flex align-items-center">
                <button class="minus-button btn btn-sm btn-outline-secondary fw-bold px-2" id="minus-button-${index}" onclick="decreaseQuantity(${index})">-</button>
                <input type="number" id="qty-input-${index}" class="qty-input form-control mx-2 text-center" step="1" min="1" max="1000" value="${item.currentQty}" style="width: 60px;">
                <button class="plus-button btn btn-sm btn-outline-secondary fw-bold px-2" id="plus-button-${index}" onclick="increaseQuantity(${index})">+</button>
              </div>
            </div>
          </div>
          <div class="text-end">
            <div class="mb-2" onclick="deleteFunction(${index})">
              <i class="material-icons" style="cursor: pointer; font-size: 24px; color: red;">delete</i>
            </div>
            <div class="fs-5 fw-bold" id="price-${index}">
              ${item.totalPrice}
            </div>
          </div>
        </div>
      </div>
    `;
    offcanvasBody.innerHTML += itemHTML;
  });
  document.body.appendChild(newdiv);
}

function deleteFunction(id) {
  console.log(id,"id");
  
  const cardInfo = JSON.parse(localStorage.getItem("cardInfo")) || [];

  const filteredArray = cardInfo.filter((items, index) => {
    return id !== index;
  });

  localStorage.setItem("cardInfo", JSON.stringify(filteredArray));
  // deleteIndividualCard(id);
  refrshFunction();
  offcanvasDiv();
  // window.location.reload();
}
function refrshFunction() {
  const cardInfo = JSON.parse(localStorage.getItem("cardInfo")) || [];
  const newValue = cardInfo.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.totalPrice);
  }, 0);
  const totalPrice = document.querySelector("#total-price");
  console.log((totalPrice.innerHTML = newValue), "totlePriceValuee");
}

function deleteIndividualCard(id) {
  const card = document.querySelector(`#items-card-${id}`);
  if (card) {
    card.remove();
  }
}
