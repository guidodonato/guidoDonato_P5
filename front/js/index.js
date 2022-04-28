let listProduct = [];
const kanape = document.getElementById('items');


/** fuction fetch obtener les list de product */
async function productData(){
    fetch('http://localhost:3000/api/products')
    .then (function(res){
        if (res.ok){
            return res.json();
        
        }
    })
    .then((data) => { 
        listProduct = data;
        console.log(listProduct)
        afficheProduct();         

    })
   
    
    .catch (function(err){
        return err;
    });
   
};

/**bucle for affiche les product */
async function afficheProduct(){
    for (i in listProduct){
        kanape.innerHTML += `<a href="#" id="${listProduct[i]._id}" class="choix-product">
        <article>
            <img src="${listProduct[i].imageUrl}" alt="${listProduct[i].altTxt}">
            <h3 class="productName">${listProduct[i].name}</h3>
            <p class="productDescription">${listProduct[i].description}</p>
        </article>
        </a>`;
        
    };
    selctProduct();
};

/**choix Du product + eventListener */
async function selctProduct(){
    let choixDuproduct = document.querySelectorAll('.choix-product');
     console.log(choixDuproduct)
    
    choixDuproduct.forEach((boton) => 
      boton.addEventListener("click", function(e){
          e.stopPropagation();
          e.preventDefault();
          console.log(boton);
        window.location = `product.html?id=${boton.id}`;
      })
          
      
    );

};
productData();
