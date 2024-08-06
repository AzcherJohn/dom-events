console.log("hello world!");

//---------Seleccionar elementos
const title = document.getElementById("txt");
//console.log(title);

const image = document.getElementsByClassName("logo");
//console.log(image[1]);

const tags = document.getElementsByTagName("section");
//console.log(tags[6]);

const elem = document.querySelectorAll(".logo")
//console.log(elem);


//--------Crear elemento y agregar attribute
const parent = document.querySelector(".products");
const newElem = document.createElement("section");
newElem.setAttribute("class","new");

parent.append(newElem);


//------Attributes
const logo = document.querySelector(".logo");
//logo.setAttribute("src", "img/mexico.jpeg");
console.log(logo.getAttribute("src"));
console.log(logo.hasAttribute("src"));
//logo.removeAttribute("src");

if(logo.hasAttribute("src")) {
    //alert("tiene src!")
}


//-------CSS Classes
const parent2 = document.querySelector(".products");
const parent3 = parent2.firstElementChild;
const price = parent3.lastElementChild;

price.classList.add("red");
price.classList.replace("red","blue");
price.classList.remove("blue");

//----- Modificar Texto
const button = document.getElementsByTagName("button");
console.log(button[0].innerText);

button[0].innerText = "Añadir al carrito";

//-----Modificar Style
console.log(button[0].style);
//button[0].style.backgroundColor = "gray";


//--------Eventos 

const elemButton = button[0];
elemButton.addEventListener('click', () => {
    elemButton.classList.toggle("toggle");
});

const iconRemove = document.querySelectorAll(".remove");
console.log(iconRemove);

iconRemove.forEach(elem => {
    elem.addEventListener("click", () => {
        const elemParent = elem.parentElement;
        elemParent.remove();
    })
});

const header = document.querySelector("header");
const cartIcon = header.lastElementChild;
const cart = document.querySelector(".cart");

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("show");
});

const product = document.querySelector(".mouse");

product.addEventListener("mouseenter", () => {
    product.style.opacity = ".5";
})

product.addEventListener("mouseleave", () => {
    product.style.opacity = "1";
})

//----- Añadir producto al carrito


const countProducts = () => {
    const numberProducts = document.querySelector(".header__number-products");

    const totalProducts = carrito.reduce((total, prod) => 
    total + prod.quantiy,
    0);

    numberProducts.innerText = totalProducts;
}

const carrito = JSON.parse(sessionStorage.getItem("cart")) ?? [];

const addCarritoButtons = document.querySelectorAll(".products__btn-primary");

let ids = carrito.length;

countProducts();

addCarritoButtons.forEach(btn => {
   btn.addEventListener("click", () => {

      const index = carrito.findIndex(val => val.name === btn.parentElement.children[1].innerText);

      if (index == -1) {
         const newIndex = carrito.push({
            id: ids + 1,
            img:btn.parentElement.children[0].getAttribute("src"),
            name:btn.parentElement.children[1].innerText,
            price:btn.parentElement.children[2].innerText,
            quantiy: 1
         })
         ids++;
         showInCart(carrito[newIndex - 1]);
      } else {
         carrito[index].quantiy += 1;
         editCart(carrito[index].id, carrito[index].quantiy);
      }

      sessionStorage.setItem("cart", JSON.stringify(carrito));      
      countProducts();
      if (!cart.classList.contains("show")) {
        cart.classList.add("show");
      }
   });
});

const cartElement = document.getElementById("cart__products");

const showInCart = (obj) => {
    const cartElement = document.getElementById("cart__products");

    const newElement = document.createElement("section");
    newElement.setAttribute("id", `product-${obj.id}`);

    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", obj.img);
    const headerElement = document.createElement("h3");
    headerElement.innerText = obj.name;
    const priceElement = document.createElement("p");
    priceElement.innerText = obj.price;
    const quantiyElement = document.createElement("span");
    quantiyElement.innerText = obj.quantiy;
    const deleteElement = document.createElement("i");
    deleteElement.classList.add("remove");
    
    const iconElement = document.createElement("img");
    iconElement.setAttribute("src", "assets/img/delete.png");
    iconElement.addEventListener("click", () => { 
        
        const index = carrito.findIndex(prod => prod.id == obj.id);
        carrito.splice(index, 1);
        sessionStorage.setItem("cart", JSON.stringify(carrito));
        countProducts();
        newElement.remove();

    })

    deleteElement.append(iconElement);

    newElement.append(imgElement);
    newElement.append(headerElement);
    newElement.append(priceElement);
    newElement.append(quantiyElement);
    newElement.append(deleteElement);

    cartElement.append(newElement);
}

const editCart = (id, quantiy) => {
    const productElement = document.getElementById(`product-${id}`);
    productElement.children[3].innerText = quantiy;
}


if (carrito.length > 0) {
    carrito.forEach(product => showInCart(product));
}


//----------- Menu

const menuIcon = document.getElementById("header__menu--icon");
const menuElement = document.querySelector(".menu");
const closeIcon = document.getElementById("menu__close-icon");

menuIcon.addEventListener("click", () => {
    menuElement.classList.add("menu__show");
})

closeIcon.addEventListener("click", () => {
    menuElement.classList.remove("menu__show");
})