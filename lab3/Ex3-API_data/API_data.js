let allProducts = [];

const tableBody = document.getElementById('tableBody');
const searchInput = document.querySelector('#searchInput');
const sortSelect = document.querySelector('#sortSelect');

async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=30');
        const data = await response.json();

        allProducts = data.products;

        processData();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function processData() {
    let filteredProducts = [...allProducts];

    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm));
    }

    const sortValue = sortSelect.value;
    if (sortValue === 'asc') {
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === 'desc') {
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    renderTable(filteredProducts);
}

function renderTable(data) {
    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='3'>No results found.</td></tr>";
        return;
    }

    data.forEach(product => {
        const row = document.createElement('tr');

        const imgCell = document.createElement('td');
        const imgElement = document.createElement('img');
        imgElement.src = product.thumbnail;
        imgElement.alt = product.title;
        imgElement.className = 'product-img';

        imgCell.appendChild(imgElement);
        row.appendChild(imgCell);

        const titleCell = document.createElement('td');
        titleCell.textContent = product.title;
        titleCell.style.fontWeight = "bold";
        row.appendChild(titleCell);

        const descCell = document.createElement('td');
        descCell.textContent = product.description;
        row.appendChild(descCell);

        tableBody.appendChild(row);
    });
}

searchInput.addEventListener('input', processData);
sortSelect.addEventListener('change', processData);

fetchProducts();