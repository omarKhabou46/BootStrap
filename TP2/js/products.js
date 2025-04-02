let cart = document.querySelector('.cart');
let objectChoices = JSON.parse(window.localStorage.getItem('choices'));
let total = 0;
let cartLenght = 0;

Object.keys(objectChoices).forEach((ele) => {
    let data = JSON.parse(window.localStorage.getItem(ele));
    let arrayProducts = objectChoices[ele];
    cartLenght += arrayProducts.length;
    for (let i = 0; i < arrayProducts.length; i++) {
        data.forEach(function (e) {
                if (e.id == arrayProducts[i]) {
                    showData(e);
                }
        })
    }
})

function showData(produit) {
    console.log(produit);
    total += +produit.price;
    let reviews = document.createElement("div");
    reviews.className = "reviews";
    let divGlobal = document.createElement('div');
    divGlobal.className = "global-div";
    let divLeft = document.createElement('div');
    divLeft.className = "left-div";
    let divImage = document.createElement('div');
    divImage.className = "image-div";
    let img = document.createElement("img");
    let p = document.createElement("p");
    let price = document.createTextNode(produit.price + " $");
    let h2 = document.createElement("h2");
    let title = document.createTextNode(produit.title);
    img.src = produit.thumbnail;
    divImage.appendChild(img);
    h2.appendChild(title);
    p.appendChild(price);
    divLeft.appendChild(divImage);
    divLeft.appendChild(h2);
    divLeft.appendChild(p);

    let divRight = document.createElement("div");
    divRight.className = "right-div"
    let desc = document.createElement("p");
    let text = document.createTextNode(produit.description);
    let button = document.createElement("button");
    let textButton = document.createTextNode("remove");
    button.appendChild(textButton);
    desc.appendChild(text);
    divRight.appendChild(desc);
    
    produit.reviews.forEach(function (ele) {
        let review = document.createElement("div");
        review.className = "review";
        let comment = document.createElement("div");
        let pComment = document.createElement("p");
        let pDate = document.createElement("p");
        let textComment = document.createTextNode(ele.comment);
        let date = document.createTextNode(ele.date);
        let img = document.createElement("img");
        img.src = "../images/user.jpg";
        pDate.appendChild(date);
        pComment.appendChild(textComment);
        comment.className = "comment";
        comment.appendChild(pComment);
        comment.appendChild(pDate);
        review.appendChild(img);
        review.appendChild(comment);

        reviews.appendChild(review);
    })
    
    
    divRight.appendChild(reviews);
    divRight.appendChild(button);

    

    divGlobal.appendChild(divLeft);
    divGlobal.appendChild(divRight);
    cart.appendChild(divGlobal);

    button.addEventListener('click', function () {
        let price = produit.price.toFixed(2);
        total =  total.toFixed(2) 
        total -= price
        divGlobal.remove();
        objectChoices[produit.category].splice(objectChoices[produit.category].indexOf(produit.id.toString()), 1)
        console.log(objectChoices);
        window.localStorage.setItem('choices', JSON.stringify(objectChoices));
        let divAchter = document.querySelector(".acheter-div");
        let pTotal = divAchter.querySelector("p");
        pTotal.textContent = "";
        pTotal.append(total.toFixed(4) + " $");
        if (total == 0.00) {
            cartLenght = 0;
            divAchter.remove();
            afficherNoProduct();
        }
        
    })
}

function afficherNoProduct() {
    if (cartLenght > 0) {
        let divAchter = document.createElement("div");
        divAchter.className = "acheter-div";
        let buttonAchter = document.createElement("button");
        buttonAchter.append("buy");
        let pTotal = document.createElement("p");
        pTotal.append(total.toFixed(4) + " $");
        divAchter.appendChild(pTotal);
        divAchter.appendChild(buttonAchter);
        cart.appendChild(divAchter);
    }else {
        let divNproduct = document.createElement("div");
        divNproduct.className = "no-product";
        let pNproduct = document.createElement("p");
        let textNproduct = document.createTextNode("no product has been selected");
        pNproduct.appendChild(textNproduct);
        divNproduct.appendChild(pNproduct);
        cart.appendChild(divNproduct);
    }
}

afficherNoProduct();

