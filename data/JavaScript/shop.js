document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, title: 'McDonnell Douglas F/A-18 Hornet', description: '3D Render von einer McDonnell Douglas F/A-18 Hornet für eine YouTube Video', price: 6.99, image: 'F-18_rgb.png', file: 'F-18_rgb.png', category: 'Flugzeuge' },
        /*{ id: 2, title: 'Lockheed Martin F-22 Raptor', description: '3D Modell der Lockheed Martin F-22 Raptor', price: 9.99, image: 'F-22_rgb.png', file: 'F-22_rgb.png', category: 'Flugzeuge' },*/
        /*{ id: 3, title: 'F-16 Fighting Falcon', description: '3D Render eines F-16 Fighting Falcon', price: 16.99, image: 'F-16_rgb.png', file: 'F-16_rgb.png', category: 'Flugzeuge' },*/
        /*{ id: 4, title: 'Bell UH-1 Iroquois', description: '3D Render eines Bell UH-1 Iroquois', price: 0, image: 'UH-1_rgb.png', file: 'UH-1_rgb.png', category: 'Hubschrauber' },*/
        /*{ id: 5, title: 'Boeing AH-64 Apache', description: '3D Render eines Boeing AH-64 Apache', price: 19.99, image: 'AH-64_rgb.png', file: 'AH-64_rgb.png', category: 'Hubschrauber' },*/
        /*{ id: 6, title: 'USS Gerald R. Ford', description: `3D Render des Flugzeugträgers Gerald R.Ford`, price: 19.99, image: 'USS-Gerald-R-Ford_rgb.png', file: 'USS-Gerald-R-Ford_rgb.png', category: 'Schiffe'},*/
    ];

    const categories = [...new Set(products.map(product => product.category))];
    const cart = [];
    const discount = 1.0;

    const productContainer = document.getElementById('product-list');

    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category;
        categoryElement.appendChild(categoryTitle);

        const categoryProductList = document.createElement('div');
        categoryProductList.classList.add('category-product-list');
        categoryElement.appendChild(categoryProductList);

        products.filter(product => product.category === category).forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.dataset.id = product.id;

            productElement.innerHTML = `
                <img src="produkte/vorschau/${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p style="color: black; font-family: Arial, Helvetica, sans-serif; font-weight: lighter;">${product.description}</p>
                <p style="font-weight: bold; color: black;">Preis: ${product.price}€</p>
                <button class="add-to-cart">Kaufen</button>
            `;

            categoryProductList.appendChild(productElement);
        });

        productContainer.appendChild(categoryElement);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const productId = parseInt(event.target.closest('.product').dataset.id);
            const product = products.find(p => p.id === productId);
            cart.push(product);
            updateCart();
        });
    });

    document.getElementById('buy-button').addEventListener('click', () => {
        cart.forEach((item, index) => {
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = `produkte/${item.file}`;
                link.download = item.title;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, index * 1000); 
        });

        setTimeout(() => {
            cart.length = 0; 
            updateCart(); 
        }, cart.length * 1000 + 1000); 
    });
    
    document.getElementById('displaydiscount').textContent = 'Rabatt: ' + discount * 100 + '%';

    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';

        let totalPrice = 0;

        cart.forEach((item, index) => {
            totalPrice += item.price;

            const li = document.createElement('li');
            li.innerHTML = `<img src="produkte/vorschau/${item.image}" alt="${item.title}"><span>${item.title} - ${item.price}€</span>`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Entfernen';
            removeButton.classList.add('remove');
            removeButton.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });

            li.appendChild(removeButton);
            cartItems.appendChild(li);
        });

        const discountedPrice = totalPrice * (1 - discount);
        document.getElementById('displaydiscount2').textContent = `Gesamtpreis: ${discountedPrice.toFixed(2)}€ (Preis ohne Rabatt: ${(totalPrice.toFixed(2))}€ | Rabatt: ${(discount * 100)}%)`;
        console.log('Cart: ' + cart + ' | ' + 'Cart Price: ' + totalPrice + '€' + ' | ' + 'Discounted Price: ' + discountedPrice.toFixed(2) + '€');
    };
    
    console.log('Discount: ' + discount + '%' + ' | ' + 'Type of Discount: ' + typeof discount);
    console.log('Categories: ' + categories)
});
