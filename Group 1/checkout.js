document.addEventListener('DOMContentLoaded', function() {
    var sameBillingCheckbox = document.getElementById('same_billing_address');
    sameBillingCheckbox.addEventListener('change', function() {
        var shippingName = document.getElementsByName('shipping_name')[0].value;
        var shippingAddress = document.getElementsByName('shipping_address')[0].value;
        var shippingCity = document.getElementsByName('shipping_city')[0].value;
        var shippingState = document.getElementsByName('shipping_state')[0].value;
        var shippingZip = document.getElementsByName('shipping_zip')[0].value;
        var shippingCountry = document.getElementsByName('shipping_country')[0].value;

        if (this.checked) {
            document.getElementById('billing_name').value = shippingName;
            document.getElementById('billing_address').value = shippingAddress;
            document.getElementById('billing_city').value = shippingCity;
            document.getElementById('billing_state').value = shippingState;
            document.getElementById('billing_zip').value = shippingZip;
            document.getElementById('billing_country').value = shippingCountry;
        } else {
            document.getElementById('billing_name').value = '';
            document.getElementById('billing_address').value = '';
            document.getElementById('billing_city').value = '';
            document.getElementById('billing_state').value = '';
            document.getElementById('billing_zip').value = '';
            document.getElementById('billing_country').value = '';
        }
    });
});
function updateCartCount(cart) {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').innerText = cartCount;
}
