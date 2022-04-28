const cartItems = document.getElementById("cart__items");

const totalQuantity = document.getElementById("totalQuantity");

const totalPrice = document.getElementById("totalPrice");

const   Cart = JSON.parse(localStorage.getItem("prodPanier"));

var firstnameValue= "";
var lastnameValue = "";
var addressvalue= "";
var villeValue = "";
var emailValue = "";
var totalArticles = 0;
var totalPrix = 0;
var  idProduct = "";
var colorChoix = "";
var quantityAticles = "";
var datasId = "";
var sclores = "";
var listProdArticles = [];
var productsList = [];
var listPanier = [];
var validFirstN = "";
var validaLastN = "";
var validCity = "";
var  validAdress = "";
var  validMail = "";

console.log(Cart);
/**afficher les produits dans le panier (innerHTML) */
async function panierAchat(){
  Cart.forEach((iD) =>{console.log(iD._id);
  fetch(`http://localhost:3000/api/products/${iD._id}`)
  .then (function(res){
      if(res.ok){
        return res.json();
      }
  })
  .then((data) => { 
      listProdArticles = data;
      totalArticles += iD.quantity
      totalPrix += (`${iD.quantity}`)*`${listProdArticles.price}`
      cartItems.innerHTML += `<article class="cart__item" data-id="${iD._id}" data-color="${iD.color}">
    <div class="cart__item__img">
      <img src="${listProdArticles.imageUrl}" alt="${listProdArticles.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${listProdArticles.name}</h2>
        <p>${iD.color}</p>
        <p>${listProdArticles.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${iD.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
      </article>`;
      selectTotal();
      buttonsIdPanieradd();
      buttonsDeleteProd(); 
  })
  
  
  .catch (function(err){
      return err;
  });
});
};

/** ajouter ou diminuer le nombre des articles (addeventListener)*/
async function buttonsIdPanieradd(){
  var inputsadd = document.querySelectorAll('#cart__items .itemQuantity');
  inputsadd.forEach(buttons => buttons.addEventListener('change', function(e){
    console.log("test")
    
     e.preventDefault();       
     idProduct = this.closest(".cart__item").dataset.id;
     colorChoix = this.closest(".cart__item").dataset.color;
     quantityAticles  = this.value;
     changeQuantity();
     return location.reload(Cart);
    
  })
  );
      
};
/**modification de la quantité dans localstorage */
async function  changeQuantity(){
        listPanier = Cart;
      for(i in listPanier){
          console.log(listPanier[i].quantity)
          if(listPanier[i]._id === idProduct && listPanier[i].color === colorChoix){
                  console.log("hola");
                  listPanier[i].quantity = Number(quantityAticles);
                  console.log(listPanier[i].quantity);
                  return localStorage.setItem("prodPanier", JSON.stringify(listPanier));
                 
                  
              };
             
          }; 
};

/** bouton delete des articles (addeventListener)*/
async function buttonsDeleteProd(){
 
  var btnDelete = document.querySelectorAll('#cart__items .deleteItem');

  btnDelete.forEach(buttons => buttons.addEventListener("click", function(e){
     e.stopPropagation();
     e.preventDefault();       
     datasId = this.closest(".cart__item").dataset.id;
     sclores = this.closest(".cart__item").dataset.color;
     console.log(sclores, datasId)
     deleteProduct();
     location.reload(Cart);
     return;
     
     
  })
  );
};
/**delete de product  dans localstorage */
async function deleteProduct(){
  console.log(sclores, datasId)
 var listProduct = [];
       for (i in Cart){
         listProduct.push(Cart[i]);
         console.log(i)};
  var newListProduct = listProduct.filter((item) => item._id !== datasId || item.color !== sclores );
  console.log(newListProduct);
        if(newListProduct.length === 0){
          console.log("test")
          return localStorage.removeItem("prodPanier")
        };
         return localStorage.setItem("prodPanier", JSON.stringify(newListProduct));
        
};

/** somme totale des articles et calcul du total à payer*/
async function selectTotal(){
   totalQuantity.innerText = `${totalArticles}`;
  totalPrice.innerText = `${totalPrix}`;
};

//** comprobando formulario */
async function firstnameForm(){
  var FirstName = document.getElementById("firstName");
  var expValider = new RegExp("[A-Za-z]{3,}$");
  FirstName.addEventListener("input",function(e){
     e.preventDefault();
     e.stopPropagation();
       validFirstN = expValider.test(this.value);  
       firstnameValue = this.value;    
      document.getElementById('firstNameErrorMsg').hidden = validFirstN;      
      document.getElementById('firstNameErrorMsg').textContent = "mesanje de error "; 
       
  })

};
async function lastnameForm(){
  var LastName = document.getElementById("lastName");
  var expValiderLastN = new RegExp("[a-zA-Z]{3,}$");
  LastName.addEventListener("input",function(e){
       e.preventDefault();
       e.stopPropagation();
      validaLastN = expValiderLastN.test(this.value); 
      lastnameValue = this.value;     
      document.getElementById('lastNameErrorMsg').hidden = validaLastN;      
      document.getElementById('lastNameErrorMsg').innerText = "message d'erreur ";    
      console.log(validaLastN);
      
  })

};
async function addressOrder(){
  var AddresOder = document.getElementById("address");
  var expValidAdress= new RegExp("[a-z A-Z 0-9]{5,}$");
  AddresOder.addEventListener("input",function(e){
       e.preventDefault();
       e.stopPropagation();
      validAdress = expValidAdress.test(this.value);
      addressvalue = this.value;
      document.getElementById('addressErrorMsg').hidden = validAdress;
      document.getElementById('address').textContent = "error"
      document.getElementById('addressErrorMsg').textContent = "message d'erreur";

        
    
      console.log(validAdress);
      
  })

}
async function addressVille(){
  var AddressCity = document.getElementById("city");
  var expValidCity= new RegExp("[A-Z a-z]{5,}$");
  AddressCity.addEventListener("input",function(e){
        e.preventDefault();
        e.stopPropagation();
      validCity = expValidCity.test(this.value);  
      villeValue = this.value;    
      document.getElementById('cityErrorMsg').hidden = validCity;
      document.getElementById('cityErrorMsg').textContent = "message d'erreur";
      console.log(validCity);
      
  })

}
async function addressEmail(){
  var AddressEmail = document.getElementById("email");
  var expValidEmail= new RegExp("[a-z0-9]{3,}[@]{1}[a-z0-9]{3,}[.]{1}[a-zA-Z]{2,4}$");
  AddressEmail.addEventListener("input",function(e){
       e.preventDefault();
       e.stopPropagation();
      validMail = expValidEmail.test(this.value);    
      emailValue = this.value;  
      document.getElementById('emailErrorMsg').hidden = validMail;
      document.getElementById('emailErrorMsg').textContent = "message d'erreur ";
     
        
    
      console.log(validMail);
      
  })

}
/**function de submit la comand */
async function btnComand(){
 var btnSubmit = document.getElementById('order')
  btnSubmit.addEventListener("click", function(e){
    e.stopPropagation();
    e.preventDefault();
    console.log("holaaa");
    if(validFirstN !== true || validaLastN !== true || validAdress !== true
       || validCity !== true || validMail !== true){
                      return alert("message d'erreur");
    };
     var conFirme = confirm("confirme la commande");
    if(conFirme == true){
    postOrder();
    
  };console.log("test")
        
    }); 
};

/**funtion fetch avec method Post */
async function postOrder(){
  Cart.forEach((e)=> {
    
    productsList.push(e._id);
    console.log(productsList)
  });
 
  fetch('http://localhost:3000/api/products/order',{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {contact: {
        firstName: firstnameValue,
        lastName: lastnameValue,
        address: addressvalue,
        city: villeValue,
        email: emailValue
      }, products: productsList }
    )
  })

    .then(function(res) {
      if(res.ok){ return res.json();}
      
    })
    .then(function(data){
      orderii = data;
      console.log(data.orderId);      
      window.location = `confirmation.html?id=${data.orderId}`;
      localStorage.clear();
    })
};

addressEmail();
addressVille();
addressOrder();
lastnameForm();
firstnameForm();
btnComand();
panierAchat();
