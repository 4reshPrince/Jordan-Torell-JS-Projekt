function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

let counter = document.querySelector("#counter");

var i = 1;

function openNav() {
  document.getElementById("cart").style.width = "1000px";
}
function closeNav() {
  document.getElementById("cart").style.width = "0";
}

// Cart Toggle
let cartToggle = document.getElementById('cart-button');
let cartToggleCount = 0;
let cartWrapper = document.getElementById('cart-wrapper');
let cartElement = document.getElementById('cart');
let subtotal = document.getElementById('subtotal');
let total = document.getElementById('total');
let addToCartButton = document.querySelectorAll('.add-to-cart');



let cartProductQuantity = "<input name='quantity' id='quantity-value' type='number' value='1'>";

let productRemove = "<button class='remove' onclick='removeFromCart(this)'>X</button>";

let updatedPrice;
let added = [], itemClass = {};

 // Capture HTML cart body
var cartTableBody = document.getElementById('cart-table-body');

// Cart object model
let cart = {
    'items': [],
    "subtotal": 0,
	  "finalDis": 0,
    'total': 0
};

for (let button of addToCartButton) {
    button.addEventListener('click', addToCart);
}

// Adding products to the shopping cart
function addToCart(event) {
    
    if (added.includes(event.target.parentElement.id)) {
        duplicateId = '#' + event.target.parentElement.id;
        
        cartTableBody.querySelector(duplicateId).querySelector('#quantity-value').value++;
        return;
    }
    
    // Capture product
    let product = event.target.parentNode;
    let productId = product.id;
    added.unshift(productId);
    let productName = product.querySelector('.product-name').innerHTML;
    let productPrice = product.querySelector('.product-price').innerHTML.replace(/[^\d.-]/g, '');
    productPrice = Number(productPrice);
    let productUpdatedPrice = productPrice;
    
    thisClass = product.classList.value.split(' ');
/*
    thisClass = thisClass.replace('products ', '');
*/
    
    itemClass[productId] = thisClass;
    
    // Add item to cart javascript model
    cart.items.push({
		'product': productId,
		'productName': productName,
		'productPrice': productPrice,
		'productUpdatedPrice': productUpdatedPrice,
	});
    
    
    // Add a new row for each product
    let productRow = document.createElement('tr');
    productRow.setAttribute('id', productId);
    cartTableBody.appendChild(productRow);
    
    // Add five columns to product row
    for (let num = 0; num <= 6; num++) {
        let newColumn = document.createElement('td');
        productRow.appendChild(newColumn);
    }
            
    // Build HTML cart
    productRow.childNodes[0].innerHTML = productName;
    productRow.childNodes[1].innerHTML = cartProductQuantity;
    productRow.childNodes[1].setAttribute('id', 'quantity');
    productRow.childNodes[2].innerHTML = productPrice;
    productRow.childNodes[2].setAttribute('id', 'product-price');
    productRow.childNodes[2].setAttribute('class', 'cart-product-price');
    productRow.childNodes[3].innerHTML = productPrice;
    productRow.childNodes[3].setAttribute('id', 'updated-product-price');
    productRow.childNodes[3].setAttribute('class', 'cart-updated-product-price');
    productRow.childNodes[4].innerHTML = "<button id='update' onclick='updateQuantity(this)'>Update</button>"
    productRow.childNodes[5].innerHTML = productRemove;
    
    
    
    updateSubtotal();
    updateTotal();
    

    
}

function removeFromCart(event) {
    let parentRow = event.parentNode.parentNode;
    let parentBody = parentRow.parentNode;
    let parentRowId = parentRow.id;
    parentBody.removeChild(parentRow);
    
    total.value = (Number(total.value) - parentRow.querySelector('#updated-product-price').innerHTML).toFixed(2);
    
    var index = added.indexOf(parentRowId);
    if (index !== -1) {
        added.splice(index, 1);
    }
    
    for (let item of cart.items) {
        if (item.product === parentRowId) cart.items.splice(item, 1);
    }
    
    var subtotalRow = document.getElementById("subtotal");
	var subtotalRowParent = subtotalRow.parentNode;
	for (let node of subtotalRowParent.childNodes) {
		if (node.id === "discountRow") {
            var discountRow = document.getElementById("discountRow");
            
            subtotalRowParent.removeChild(discountRow);
        }

	}

    cart.finalDis = 0;
	updateSubtotal();
	updateTotal();

}

function updateQuantity(event) {
    let parentRow = event.parentNode.parentNode;
    let parentRowId = parentRow.id;
    var inputQuantity,productPrice,updatedPrice,totalPrice;
    
    for (let node of parentRow.childNodes) {
        switch (node.id) {
            case 'quantity':
                inputQuantity = node.firstChild;
                break;
                
            case 'product-price':
                productPrice = Number(node.innerHTML);
                break;
                
            case 'updated-product-price':
                updatedPrice = node;
                totalPrice = Number(node.innerHTML);
                console.log(totalPrice);
        }
    }
    
    let inputQuantityValue = (Number(inputQuantity.value)).toFixed(2);
    
    if (inputQuantityValue <= 0) removeFromCart(event);
    
    totalPrice = inputQuantity.value * productPrice;
    updatedPrice.innerHTML = totalPrice;
    
    for (let item of cart.items) {
        if (item.product === parentRowId) item.productUpdatedPrice = totalPrice;
    }
    
    updateSubtotal();
    updateTotal();
    console.log(cart);
}

function updateSubtotal() {
    cart.subtotal = 0;
    
    for (let item of cart.items) {
        cart.subtotal += item.productUpdatedPrice;
    }
    
    subtotal.innerHTML = cart.subtotal.toFixed(2);
}

function updateTotal() {
    cart.total = 0;
    cart.total += (cart.subtotal - cart.finalDis);
    total.innerHTML = cart.total.toFixed(2);
}


document.getElementById('add-new').onclick = function() {
  i++;
  var list = document.getElementById('list');
  var newEl = document.createElement('li');
  newEl.setAttribute("id", "item" + i + "");
  newEl.innerHTML = 'Item ' + i;
  newEl.setAttribute("onclick", "remove(this)");
  list.appendChild(newEl);

  let tempCounter = parseInt(counter.innerHTML);
  tempCounter += 1;
  counter.innerHTML = tempCounter;
}

document.querySelector("#remove").addEventListener("click", () => {
  document.querySelector("li:last-child").remove();

  let tempCounter = parseInt(counter.innerHTML);
  tempCounter -= 1;
  counter.innerHTML = tempCounter;
});