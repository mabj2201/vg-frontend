document.getElementById('confirmed-name').innerHTML = "<b>Name: </b>" + localStorage.getItem("name");
document.getElementById('confirmed-street').innerHTML = "<b>Street: </b>" + localStorage.getItem("street");
document.getElementById('confirmed-zip').innerHTML = "<b>Zip code: </b>" + localStorage.getItem("zip");
document.getElementById('confirmed-city').innerHTML = "<b>City: </b>" + localStorage.getItem("city");
document.getElementById('confirmed-email').innerHTML = "<b>E-mail: </b>" + localStorage.getItem("email");
document.getElementById('confirmed-phone').innerHTML = "<b>Phone: </b>" + localStorage.getItem("phone");

shoppingCart2()

function shoppingCart2() {
    let total = parseFloat(localStorage.getItem('total'));
    let temp = JSON.parse(localStorage.getItem('productsC'));
    let outputhtml = "";
    for (let i = 0; i < temp.length; i++) {
        outputhtml += `<div class="col h-30 d-flex align-items-center " id="col-cart">
        <img src="${temp[i].img}" alt="" class="img">
        <p><b>${temp[i].title}</b></p>
        <p><b>Pris:</b> $${temp[i].price}</p>
        <p><b>Totalsumma:</b> $${temp[i].totalPrice}</p>
        <p>${temp[i].qt}st</p>
        <div class="col-6">
        <div class="float-right">
        </div>
        </div>
        </div>
        <hr>
        `
        document.getElementById('cart-item').innerHTML = outputhtml;
        
    }
    document.getElementById('totPrice').innerHTML = '$' + total.toFixed(2);

}

localStorage.clear()

