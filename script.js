
let productsCart = []
productsCart = JSON.parse(localStorage.getItem('productsC')) || [];
JSON.parse(localStorage.getItem('store-cart-number'))
let count = 0;


function deleteItemcart(inId) {
    let temp = JSON.parse(localStorage.getItem('productsC')) || [];
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == inId) {
            temp.splice(i, 1);
            productsCart = temp;
            localStorage.setItem('productsC', JSON.stringify(productsCart))
        }
    }
    productsCart = temp;
    location.reload();
}

function addItemCart(inId) {
    let temp = JSON.parse(localStorage.getItem('productsC')) || [];

    for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == inId) {
            temp[i].qt += 1;
            temp[i].totalPrice = temp[i].price * temp[i].qt;
            productsCart = temp;
            localStorage.setItem('productsC', JSON.stringify(productsCart))
        }
    }
    productsCart = temp;
    location.reload();
}

function removeItemcart(inId) {
    let temp = JSON.parse(localStorage.getItem('productsC')) || [];
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == inId) {
            if (temp[i].qt > 1) {
                temp[i].qt -= 1;
                temp[i].totalPrice = temp[i].price * temp[i].qt;
                productsCart = temp;
                localStorage.setItem('productsC', JSON.stringify(productsCart))
            } else {
                deleteItemcart(temp[i].id);
            }
        }
    }
    productsCart = temp;
    location.reload();
}


function removeAllProducts() {
    let temp = JSON.parse(localStorage.getItem('productsC')) || [];
    temp.splice(0, temp.length);
    productsCart = temp;
    localStorage.setItem('productsC', JSON.stringify(productsCart))

    location.reload();
}


function total() {
    let total = 0;
    let temp = JSON.parse(localStorage.getItem('productsC')) || [];
    for (let i in temp) {
        total += temp[i].totalPrice;
    }
    productsCart = temp
    document.getElementById('total').innerHTML = 'Total: $' + total.toFixed(2)
    localStorage.setItem('total', total);
}






fetch('https://fakestoreapi.com/products')
    .then(res => {
        return res.json();
    })
    .then(data => {
        data.forEach(product => {
            let description = product.description;
            let title = product.title;
            let pId = product.id;

            const markup = `
        <div class="col h-100"   
        <div class="product">
        <div class="product-content">
        <img src="${product.image}" alt="" class="product-img">
        <h5 class="product-title">${title.length > 20 ? title.substring(0, 20).concat('...') : title}</h5>
        <p class="product-category">${product.category}</p>
        <p class="product-description">${description.length > 20 ? description.substring(0, 20).concat('<a href class="more" data-productId=' + product.id + '  data-bs-toggle="modal" data-bs-target="#modal">..more</a>') : description}</p>
        <div class="procuct-price-container">
        <div class="row" id="pricecon">
        <div class="col-md-6">
            <h5 class="product-price">$${product.price}</h5>
            </div>
            <div class="col-md-6">
            <button type="button" data-productId=${pId}  class="add-to-cart" 
            data-bs-toggle="modal" data-bs-target="#modalForm">Add to Cart</button>
            </div>
            </div>
            </div>
        </div>
    </div>
        </div>
    `


            const productCol = document.createElement('div');
            productCol.classList.add('col-md-3');
            productCol.innerHTML = markup;

            document.querySelector('#product-row').appendChild(productCol)
            const moreLink = productCol.querySelector('.more');
            moreLink.addEventListener('click', () => {
                fetch(`https://fakestoreapi.com/products/${product.id}`)
                    .then(res => {
                        return res.json();
                    })
                    .then(product => {
                        const modalBody = document.querySelector('.modal-body');
                        modalBody.innerHTML = `
                <div class="product-details">
                <img src="${product.image}" alt="" class="product-img">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-description">${product.description}</p>
                <h5 class="product-price">$${product.price}</h5>
              </div>
                `

                        const productModal = new bootstrap.Modal(document.querySelector('modal'))
                        productModal.show();

                    })
                    .catch(error => {
                        console.error(error);
                    })
            })


    //---------------LÄGGER PRODUKTER I LISTA NÄR MAN TRYCKER PÅ BESTÄLL------------------------
            const addToCartBtn = productCol.querySelector('.add-to-cart');
            addToCartBtn.addEventListener('click', () => {
                fetch(`https://fakestoreapi.com/products/${product.id}`)
                    .then(res => {
                     
                        return res.json();
                    })
                    .then(product => {
                        const imageUrl = product.image;
                        product = {
                            img: imageUrl,
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            qt: 1,
                            totalPrice: product.price
                        };

                        const duplicate = productsCart.find(p => p.id
                            === product.id);
                        if (duplicate) {
                            productsCart = productsCart.map(p => {
                                if (p === duplicate) {
                                    p.qt += 1;
                                    p.totalPrice = p.price * p.qt;
                                }
                                return p;
                            });
                        } else {
                            productsCart.push(product)
                        }
                        localStorage.setItem('productsC', JSON.stringify(productsCart));
                    })
            })
        });

    })

function shoppingCart() {
    let temp = JSON.parse(localStorage.getItem('productsC'));
    let outputhtml = "";
    for (let i = 0; i < temp.length; i++) {
        let title = temp[i].title;
        outputhtml += `    <div class="col-1" id="col-cart">
        <img src="${temp[i].img}" alt="" class="img" style="width:60px">
    </div>
    <div class="col" id="col-title">
        <p id="cart-title"><b>${title.length > 20 ? title.substring(0,20).concat('..') : title}</b></p>
    </div>
    <div class="col-auto" id="qt-col">
        <div class="row">
            <div class="col-3" id="col-plus">
                <button type="button" data-productId=${temp[i].id} class="btn btn-dark btn-sm"
                    onclick=" addItemCart(${temp[i].id})" id="addB">+</button>
            </div>
            <div class="col-1" id="col-qt">
                <p>${temp[i].qt}</p>
            </div>
            <div class="col-2" id="col-minus">
                <button type="button" data-productId=${temp[i].id} class="btn btn-dark btn-sm"
                    onclick="removeItemcart(${temp[i].id})">-</button>
            </div>
            <div class="col-1" id="col-delete">
                <button type="button" data-productId=${temp[i].id} class="btn btn-danger btn-sm" 
                    onclick="deleteItemcart(${temp[i].id})"><i class="bi bi-trash"></i></button>
            </div>
        </div>
    </div>
    <div class="col" id="col-price">
        <p> $${temp[i].price}</p>
    </div>
    <div class="col" id="col-price2">
        <p>
            <b:</b> $${temp[i].totalPrice}
            
        </p>
    </div>

    </div>
    <hr>

        `
        document.getElementById('testing').innerHTML = outputhtml;
        total()
    }

}
shoppingCart()




function validate() {
    let name = document.getElementById('name').value;
    let street = document.getElementById('street').value;
    let zip = document.getElementById('zip').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    const zipPattern = /^\d{3}\s\d{2}$/;
    const phonePattern = /^\(?(\d{3})?\)?[-]?\s?(\d{7})$/;
    let valid = 0;


    if (name.length < 2 || name.length > 50) {
        document.getElementById('name-text').innerHTML = "Name too short or too long or blank";
    } else {
        document.getElementById('name-text').innerHTML = "";
        localStorage.setItem("name", name);
        valid++;
    }

    if (street.length <= 0 || street.length > 50) {
        document.getElementById('street-text').innerHTML = "Too many letters";
    } else {
        document.getElementById('street-text').innerHTML = "";
        localStorage.setItem("street", street);
        valid++;
    }

    if (!zipPattern.test(zip)) {
        document.getElementById('zip-text').innerHTML = "Incorrect format";
    } else {
        document.getElementById('zip-text').innerHTML = "";
        localStorage.setItem("zip", zip);
        valid++;
    }

    if (city.length <= 0 || city.length > 50) {
        document.getElementById('city-text').innerHTML = "Too many letters";
    } else {
        document.getElementById('city-text').innerHTML = "";
        localStorage.setItem("city", city);
        valid++;
    }

    if (!email.includes('@') || email.length > 50) {
        document.getElementById('email-text').innerHTML = "Incorrect format";
    } else {
        document.getElementById('email-text').innerHTML = "";
        localStorage.setItem("email", email);
        valid++;
    }

    if (phone <= 0 || !phonePattern.test(phone)) {
        document.getElementById('phone-text').innerHTML = "Incorrect format";
    } else {
        document.getElementById('phone-text').innerHTML = "";
        localStorage.setItem("phone", phone);
        valid++;
    }
    console.log(valid)
    if (valid == 6) {
        window.location.href = "confirmed.html";
    }
}