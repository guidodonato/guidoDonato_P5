let optionKanape = [];
var n = 0;

class objProduct {
    constructor( _id, color,  quantity){
        this._id = _id;
        this.color = color;                
        this.quantity = Number(quantity);
       
    };    
};
var listProduct = [];
colores = [];
const eltClass = document.querySelector(".item__img");
const eltDescription= document.getElementById("description");
const eltSelectColor = document.getElementById("colors");
const eltNameProduct = document.getElementById("title");
const eltPrixProduct = document.getElementById("price")
const eltQuantity = document.getElementById("quantity");
const addToCart = document.getElementById("addToCart");
const urlId = window.location.search.split("?id=").join("");


console.log(urlId);
/** fonction pour obtenir des données sur le produit*/
async function productSelect(){
    await fetch(`http://localhost:3000/api/products/${urlId}`)
    .then (function(res){
        if (res.ok){
            return res.json();       
        }
    })

    .then((data) => {
        optionKanape = data; 
        console.log(optionKanape.colors);
        console.log(optionKanape);        
    })
    
    
};

/**ajout d'un élément img */
async function newImg (){

    const newImg = document.createElement("img");
    newImg.setAttribute('alt', `${optionKanape.altTxt}`);
    newImg.setAttribute('src',  `${optionKanape.imageUrl}`);
    eltClass.appendChild(newImg);
    };

/**afficher les options du produit (couleur, prix et description) */
async function optKanape(){
        await productSelect();
        newImg();
        eltNameProduct.innerText = `${optionKanape.name}`;
        eltPrixProduct.innerText  = `${optionKanape.price}`;
        eltDescription.innerText = `${optionKanape.description}`;
        optColors();
        clickBtnaddCart();
    };

/**ajouter des éléments d'option */
async function optColors(){
    colores = optionKanape.colors;
        for(i of colores){
            eltSelectColor.innerHTML += `<option value="${i}">${i}</option>`;
        };
};
/**addeventListener pour le bouton de quantité */
async function clickBtnQuantity(){
eltQuantity.addEventListener("click",function(e){
           e.stopPropagation();
           e.preventDefault();          
           console.log("test")          
  
   
});

};

/**addeventListener pour le bouton de sélection des couleurs */
async function clickBtnColors(){
    eltSelectColor.addEventListener("click",function(e){
        e.stopPropagation();
        e.preventDefault();
         console.log("test")
    });
    
    };
/**addeventListener pour le bouton d'ajout au panier*/
async function clickBtnaddCart(){
            addToCart.addEventListener("click",function(e){
                e.stopPropagation();
                e.preventDefault();
            if(eltSelectColor.value == " " || eltQuantity.value == 0){
                return alert("Les champs sont vides")
            };
             const Pid = `${urlId}`;
             const Scolor = `${eltSelectColor.value}`;
            var qtaSelect = `${eltQuantity.value}`;
           
                    console.log(Pid);
                    console.log(Scolor);
                    console.log (qtaSelect);
            var conFirme = confirm("Le produit sera ajouté à votre panier");
            if(conFirme == true){     
            panierProduct();};
            return;
        });
        
    };
/**fonction qui ajoute des données au localstorage */
async function panierProduct(){
       console.log(localStorage.getItem("prodPanier"));
    if(localStorage.getItem("prodPanier") != null && localStorage.getItem("prodPanier") != ""){
        listProduct = JSON.parse(localStorage.getItem("prodPanier"));
        console.log(listProduct);//vérifier les données dans localstorage//
    };
        for(i in listProduct){
            console.log(listProduct[i].quantity)
            if(listProduct[i]._id === `${urlId}` && listProduct[i].color === `${eltSelectColor.value}`){
                    console.log("hola");
                     n = `${quantity.value}`;                     
                     listProduct[i].quantity += Number(n);
                    console.log(listProduct[i].quantity);
                    return localStorage.setItem("prodPanier", JSON.stringify(listProduct))   
                };
            };
   var pedido = new objProduct( `${urlId}`, `${eltSelectColor.value}`,  `${quantity.value}`);
console.log(objProduct);
   listProduct.push(pedido);
   console.log(listProduct);//vérifier si de nouvelles données ont été ajoutées dans localstorage//
   localStorage.setItem("prodPanier", JSON.stringify(listProduct));

};   


optKanape();
clickBtnColors();
clickBtnQuantity();
