const stockProductos = [
    {
      id: 1,
      nombre: "FENDER JAZZ-BASS-S",
      cantidad: 1,
      desc: "BAJO ELÉCTRICO DE CUATRO CUERDAS JAZZ BASS DELUXE COLOR SUNBURST",
      precio: 162691,
      img: "imagenes/fender.jpg",
    },
    {
      id: 2,
      nombre: "Spector Nspulse",
      cantidad: 1,
      desc: "EURO 4 RST TURQUOISE TIDE MATTE",
      precio: 596359,
      img: "imagenes/spector.jpg",
    },
    {
      id: 3,
      nombre: "Schecter Stiletto",
      cantidad: 1,
      desc: "Bajo Eléctrico 5 Cuerdas Deluxe ",
      precio: 231163,
      img: "imagenes/Schecter.jpg",
    },
    {
      id: 4,
      nombre: "Bajo EpiPhone",
      cantidad: 1,
      desc: "oby Standard Iv Negro Outlet",
      precio: 89000,
      img: "imagenes/epifone.jpg",
    },
    {
      id: 5,
      nombre: "Bajo Electrico Warwick",
      cantidad: 1,
      desc: "Streamer Std 5 Black Hp Chrome",
      precio: 155000,
      img: "imagenes/warmick.jpg",
    },
    {
      id: 6,
      nombre: "Bajo Ibanez",
      cantidad: 1,
      desc: "Sdgr Sr300ebwk Weathered Black",
      precio: 144000,
      img: "imagenes/ibanez.jpg",
    },
    {
      id: 7,
      nombre: "Bajo Cort",
      cantidad: 1,
      desc: "Action Dlx Plus Micrófonos Activos 4 Cuerdas",
      precio: 195000,
      img: "imagenes/cort.jpg",
    },
    {
      id: 8,
      nombre: "Bajo Epiphone",
      cantidad: 1,
      desc: "ESP LTD F-155DX",
      precio: 480000,
      img: "imagenes/5cuerdas.jpg",
    },
    {
      id: 9,
      nombre: "Bajo Ibanez",
      cantidad: 1,
      desc: "Sr1805ntf Bajo Electrico 5 Cuerdas Serie Sr Premium",
      precio: 5250000,
      img: "imagenes/rosewood.jpg",
    },
    {
      id: 10,
      nombre: "Bajo Yamaha",
      cantidad: 1,
      desc: "TRBJP2 JOHN PATITUCCI AM",
      precio: 985000,
      img: "imagenes/yamaha.jpg",
    },

    {
        id: 11,
        nombre: "Bajo Gibson",
        cantidad: 1,
        desc: "Flying V Cherry",
        precio: 11252000,
        img: "imagenes/gibson.jpg",
      },
    
      {
        id: 12,
        nombre: "Bajo Epiphone",
        cantidad: 1,
        desc: "Ripper Bass Bajo 4 Cuerdas Negro",
        precio: 205000,
        img: "imagenes/epi2.jpg",
      },  




  ];
  let carrito = [];
  
  const contenedor = document.querySelector("#contenedor");
  const carritoContenedor = document.querySelector("#carritoContenedor");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const precioTotal = document.querySelector("#precioTotal");
  const activarFuncion = document.querySelector("#activarFuncion");
  const procesarCompra = document.querySelector("#procesarCompra");
  const totalProceso = document.querySelector("#totalProceso");
  const formulario = document.querySelector('#procesar-pago')
  
  if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
  });
  if(formulario){
    formulario.addEventListener('submit', enviarCompra)
  }
  
  
  if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      carrito.length = [];
      mostrarCarrito();
    });
  }
  
  if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
      if (carrito.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacio!",
          text: "Compra algo para continuar con la compra",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        location.href = "compra.html";
      }
    });
  }
  
  stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem;">
      <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
      </div>
    </div>
      `;
    }
  });
  
  const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)
  
    if(existe){
      const prod = carrito.map(prod => {
        if(prod.id === id){
          prod.cantidad++
        }
      })
    } else {
      const item = stockProductos.find((prod) => prod.id === id)
      carrito.push(item)
    }
    mostrarCarrito()
  
  };
  
  const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        
    
        `;
      });
    }
  
    if (carrito.length === 0) {
      console.log("Nada");
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
      `;
    } else {
      console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;
  
    if (precioTotal) {
      precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
  
    guardarStorage();
  };
  
  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  function eliminarProducto(id) {
    const juegoId = id;
    carrito = carrito.filter((juego) => juego.id !== juegoId);
    mostrarCarrito();
  }
  function procesarPedido() {
    carrito.forEach((prod) => {
      const listaCompra = document.querySelector("#lista-compra tbody");
      const { id, nombre, precio, img, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
        listaCompra.appendChild(row);
      }
    });
    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
  
   function enviarCompra(e){
     e.preventDefault()
     const persona = document.querySelector('#persona').value
     const email = document.querySelector('#correo').value
  
     if(email === '' || persona == ''){
       Swal.fire({
         title: "¡Debes completar tu email y nombre!",
         text: "Rellena el formulario",
         icon: "error",
         confirmButtonText: "Aceptar",
     })
   } else {
  
    const btn = document.getElementById('button');
  
  // document.getElementById('procesar-pago')
  //  .addEventListener('submit', function(event) {
  //    event.preventDefault();
  
     btn.value = 'Enviando...';
  
     const serviceID = 'default_service';
     const templateID = 'template_qk51jd6';
  
     emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Finalizar compra';
        alert('Enviado!');
      }, (err) => {
        btn.value = 'Finalizar compra';
        alert(JSON.stringify(err));
      });
      
     const spinner = document.querySelector('#spinner')
     spinner.classList.add('d-flex')
     spinner.classList.remove('d-none')
  
     setTimeout(() => {
       spinner.classList.remove('d-flex')
       spinner.classList.add('d-none')
       formulario.reset()
  
       const alertExito = document.createElement('p')
       alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
       alertExito.textContent = 'Compra realizada correctamente'
       formulario.appendChild(alertExito)
  
       setTimeout(() => {
         alertExito.remove()
       }, 3000)
  
  
     }, 3000)
   }
   localStorage.clear()
  
   }

  