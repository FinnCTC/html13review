"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Review Assigment

   Shopping Cart Form Script
   
   Author: Finn Mayberry
   Date:   03/25/2025
   
   Filename: co_cart.js
   
   Function List
   =============
   
   calcCart()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/ 

window.addEventListener("load", function() {
   //Var for cart
   var cart = document.forms.cart;
   //Run the cart function
   calcCart();
   //Event handlers
   cart.elements.modelQty.onchange = calcCart;
   //Var for shipping options
   var shippingOptions = document.querySelectorAll('input[name="shipping"]');
   //Loop through shipping options
   for (var i = 0; i < shippingOptions.length; i++) {
      shippingOptions[i].onclick = calcCart;
   }
});

function calcCart() {
   //var for cart
   var cart = document.forms.cart;
   //vars for field data
   var mCost = cart.elements.modelCost.value;
   var qIndex = cart.elements.modelQty.selectedIndex;
   var quantity = cart.elements.modelQty[qIndex].value;

   var orderCost = mCost*quantity;
   cart.elements.orderCost.value = formatUSCurrency(orderCost);

   var shipCost = document.querySelector('input[name="shipping"]:checked').value*quantity;
   cart.elements.shippingCost.value = formatNumber(shipCost, 2);

   cart.elements.subTotal.value = formatNumber(orderCost + shipCost, 2);

   var salesTax = 0.05*(orderCost + shipCost);
   cart.elements.salesTax.value = formatNumber(salesTax, 2);

   cart.elements.cartTotal.value = formatUSCurrency(orderCost + shipCost + salesTax);

   cart.elements.shippingType.value =
      document.querySelector('input[name="shipping"]:checked').nextSibling.nodeValue;
}








function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}
