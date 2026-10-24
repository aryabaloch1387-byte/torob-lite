async function loadData() {
    const res = await fetch("./data.json");
    return await res.json();
}

async function searchProducts(query) {
    const data = await loadData();
    const results = data.products.filter(p =>
        p.name.includes(query)
    );

    const box = document.getElementById("results");
    box.innerHTML = "";

    results.forEach(p => {
        box.innerHTML += `
            <div class="item">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <button onclick="go(${p.id})">مشاهده قیمت‌ها</button>
            </div>
        `;
    });
}

function go(id) {
    window.location.href = `product.html?id=${id}`;
}

async function loadProduct(id) {
    const data = await loadData();
    const p = data.products.find(x => x.id == id);

    const box = document.getElementById("productBox");
    box.innerHTML = `
        <img src="${p.image}">
        <h2>${p.name}</h2>
        <h4>فروشندگان:</h4>
    `;

    p.offers.forEach(o => {
        box.innerHTML += `
            <div class="offer">
                <p>${o.shop}</p>
                <p>${o.price.toLocaleString()} تومان</p>
                <a href="${o.url}" target="_blank">خرید</a>
            </div>
        `;
    });
}
