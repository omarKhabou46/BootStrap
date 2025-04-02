let urlApi = "https://api.daaif.net/products";
let divCategory = document.querySelector('.category');
let cart = document.querySelector('.cart');
let countProducts = cart.querySelector(".count-products");



window.localStorage.setItem('choices', JSON.stringify({}));
async function getData(urlApi) {
    let response = await fetch(urlApi);
    let data = await response.json();
    sortData(data);
}

getData(urlApi);

function sortData(data) {
    let arrayBeauty = [];
    let arrayGroceries = [];
    let arrayFragrances = [];
    let arrayFurniture = [];
    data.products.forEach(
        (product) => {
            // console.log(product);
            switch(product.category) {
                case "beauty" : arrayBeauty.push(product);
                break;

                case "groceries" : arrayGroceries.push(product);
                break;

                case "fragrances" : arrayFragrances.push(product);
                break;
                case "furniture" : arrayFurniture.push(product);
                break;
            }
        }
    )
    window.localStorage.setItem("beauty", JSON.stringify(arrayBeauty));
    window.localStorage.setItem("groceries", JSON.stringify(arrayGroceries));
    window.localStorage.setItem("furniture", JSON.stringify(arrayFurniture));
    window.localStorage.setItem("fragrances", JSON.stringify(arrayFragrances));
}

let listCategory = document.querySelectorAll('.list-category li');
let defaultLi = document.querySelector(".default");
showProducts(defaultLi.textContent);
listCategory.forEach((li) => {
        li.addEventListener('click', function () {
            listCategory.forEach((li) => {
                if (li.className === "default") {
                    li.className = "";
                }
            })
            li.className = "default";
            showProducts(li.textContent);
        })
    }
);


function showProducts(category) {
    let products = window.localStorage.getItem(category.toLowerCase());
    products = JSON.parse(products);

    // clear category div
    if (divCategory.children.length === 2) {
        divCategory.lastElementChild.remove();
    }

    let divProducts = document.createElement('div');
    divProducts.className = "product";
    products.forEach((ele) => {
        // console.log(ele);
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let div3 = document.createElement('div');
        let img = document.createElement("img");
        let button = document.createElement("button");
        let p = document.createElement("p");
        let price = document.createTextNode(ele.price + " $");
        let h2 = document.createElement("h2");
        let title = document.createTextNode(ele.title);
        button.textContent = "add to cart";
        img.src = ele.thumbnail;
        div2.appendChild(img);
        div2.className = "div-img"
        p.appendChild(price);
        h2.appendChild(title);
        div3.appendChild(p);
        div3.appendChild(button);
        div3.className = "div-price";
        div1.appendChild(div2);
        div1.appendChild(h2);
        div1.appendChild(div3);
        div1.className = "content";
        div1.id = ele.id;
        divProducts.appendChild(div1);    
        });
    divCategory.appendChild(divProducts);
    addCart(divProducts);
}

function addCart(divProducts) {
    let ulCategory = document.querySelectorAll(".list-category li");
    let defaultCategory = "";
    ulCategory.forEach((e) => {
        if (e.className === "default") {
            defaultCategory = e.textContent;
        }
    })
    divProducts.childNodes.forEach((ele) => {
        let button = ele.querySelector(".div-price button");
        button.addEventListener('click', function () {
            let id = ele.id;
            let choices = JSON.parse(window.localStorage.getItem("choices"));
            if (choices[defaultCategory] === undefined) {
                choices[defaultCategory] = [id];
            }else {
                if (choices[defaultCategory].includes(id)) {
                    createToast();
                    return;
                }else {
                    choices[defaultCategory].push(id);
                }
                
            }
            countProducts.textContent = +countProducts.textContent + 1;
            window.localStorage.setItem('choices', JSON.stringify(choices));
    })
})
}


function createToast() {
   if (!document.body.contains(document.querySelector(".div-toast"))) {
    let divToast = document.createElement('div');
    divToast.className = "div-toast";
    let annuler = document.createElement('button');
    let img = document.createElement('img');
    let p = document.createElement("p");
    let text = document.createTextNode("Cet élément a déjà été ajouté.");
    p.appendChild(text)
    img.src = "../images/close.png";
    annuler.appendChild(img);
    divToast.appendChild(annuler);
    divToast.appendChild(p);
    document.body.appendChild(divToast);
    document.body.style.cssText = "opacity: 0.7";
    annuler.addEventListener('click', function () {
        divToast.remove();
        document.body.style.cssText = "opacity: 1";
    })
   }else {
    return;
   }
    

}