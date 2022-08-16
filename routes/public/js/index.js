function enviarProducto() {
    let titulo = document.getElementById("tituloInput1");
    let precio = document.getElementById("precioInput1");
    let url = document.getElementById("urlInput1");
    let producto = {
        "titulo": titulo.value,
        "precio": precio.value,
        "url": url.value
    };

    fetch('/api/productos', {
        method: 'POST', 
        body: JSON.stringify(producto),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            console.log('Success:', response);
            titulo.value = '';
            precio.value = '';
            url.value = '';
         });
}