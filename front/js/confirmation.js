/**récupérer l'id de la commande et afficher sur la page */
var order_Id = window.location.search.split("?id=").join("");
document.getElementById("orderId").innerText = order_Id;
