const PRODUCT_CARD_TPL = `<div class="product_item">
        <div class="item_name_image">
            <h4>{{item.name}}</h4>
            <img src="{{item.image}}" class="item_image">
        </div>
        <div class="price_container">
            <h4 class="current_price">{{item.price}}</h4>
            <h4 class="old_price">{{item.oldPrice}}</h4>
        </div>

        <div class="actions {{cart_item}}">
            <div class="buy_now" p_id="{{item.id}}">Order now</div>
            <div class="add_to_cart" p_id="{{item.id}}">Add to cart</div>
        </div>
        <div class="delete_from_cart {{cart_only}}" p_id="{{item.id}}">Remove</div>
    </div>`;

let ITEMS_IN_CART = [];

const productsEl = document.getElementById('products_content');

let productsUI = '';
for (let i = 0; i < products.length; i++) {
    let item = products[i];

    let itemUI = PRODUCT_CARD_TPL.replaceAll('{{item.name}}', item.name).replaceAll('{{item.image}}', item.image).replaceAll('{{item.price}}', item.price).replaceAll('{{item.oldPrice}}', item.oldPrice).replaceAll('{{item.id}}', item.id).replaceAll('{{cart_item}}', '').replaceAll('{{cart_only}}', 'hide');

    productsUI += itemUI
}
productsEl.innerHTML = productsUI;

// Add to cart functionality
const addToCart = Array.from(document.getElementsByClassName('add_to_cart'));
addToCart.forEach(button => {
    button.addEventListener('click', addToCartHandler)
})

function addToCartHandler(event) {
    let productID = event.target.getAttribute('p_id');

    let index = products.findIndex(item => item.id == productID);

    ITEMS_IN_CART.unshift(products[index]);
    renderCart();
}

const cartEl = document.getElementById('cart_content');
const itemValueEL = document.getElementById('item-value');
const priceValueEl = document.getElementById('price-value')
const savingsValueEl = document.getElementById('savings-value')
const emptyCartEl = document.getElementById('empty_cart')
const cartActionsEl = document.getElementById('cart_actions')

function renderCart() {

    let cartUI = '';
    let totalPrice = 0;
    let totalSavings = 0;
    let totalItems = ITEMS_IN_CART.length;

    for (let i = 0; i < ITEMS_IN_CART.length; i++) {
        let item = ITEMS_IN_CART[i];

        totalPrice += Number(item.price.slice(1));
        totalSavings += Number(item.oldPrice.slice(1) - item.price.slice(1));

        let itemUI = PRODUCT_CARD_TPL.replaceAll('{{item.name}}', item.name).replaceAll('{{item.image}}', item.image).replaceAll('{{item.price}}', item.price).replaceAll('{{item.oldPrice}}', item.oldPrice).replaceAll('{{item.id}}', item.id).replaceAll('{{cart_item}}', 'cart_item').replaceAll('{{cart_only}}', '');

        cartUI += itemUI;
    }

    cartEl.innerHTML = cartUI;
    itemValueEL.innerHTML = totalItems;
    priceValueEl.innerHTML = '$' + Number(totalPrice).toFixed(2);
    savingsValueEl.innerHTML = '$' + Number(totalSavings).toFixed(2);

    if (ITEMS_IN_CART.length <= 0) {
        emptyCartEl.classList.remove('hide');
        emptyCartEl.classList.add('show');

        cartActionsEl.classList.remove('show');
        cartActionsEl.classList.add('hide');
        return
    } else {
        emptyCartEl.classList.add('hide');
        emptyCartEl.classList.remove('show');

        cartActionsEl.classList.add('show');
        cartActionsEl.classList.remove('hide');
    }
    
    bindRemoveEvent();
}
renderCart();


// Remove from cart functionality
function bindRemoveEvent() {
    const removeFromCartEls = Array.from(document.getElementsByClassName('delete_from_cart'))
    removeFromCartEls.forEach(el => {
        el.addEventListener('click', removeFromCart)
    })
}

function removeFromCart(event) {
    let productID = event.target.getAttribute('p_id');

    ITEMS_IN_CART = ITEMS_IN_CART.filter(item => item.id != productID);

    renderCart();
}