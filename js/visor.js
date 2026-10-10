(function () {
    var fotos = document.querySelectorAll("main figure img, .carousel-item img");
    if (!fotos.length) return;

    var capa = document.createElement("div");
    capa.className = "visor";
    capa.hidden = true;

    var panel = document.createElement("div");
    panel.className = "visor-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", "Imagen completa");

    var cerrar = document.createElement("button");
    cerrar.type = "button";
    cerrar.className = "visor-cerrar";
    cerrar.setAttribute("aria-label", "Cerrar imagen");
    cerrar.textContent = "×";

    var grande = document.createElement("img");
    grande.alt = "";

    var pie = document.createElement("p");
    pie.className = "visor-pie";
    pie.hidden = true;

    panel.append(cerrar, grande, pie);
    capa.appendChild(panel);
    document.body.appendChild(capa);

    var origen = null;
    var carruselPausado = null;

    function textoPie(boton) {
        var figura = boton.closest("figure");
        if (figura) {
            var epigrafe = figura.querySelector("figcaption");
            if (epigrafe) return epigrafe.textContent.trim();
        }
        var diapositiva = boton.closest(".carousel-item");
        if (diapositiva) {
            var nota = diapositiva.querySelector(".carousel-caption p");
            if (nota) return nota.textContent.trim();
        }
        return "";
    }

    function abrir(boton, img) {
        if (!capa.hidden) return;
        origen = boton;
        grande.src = img.currentSrc || img.src;
        grande.alt = img.alt || "";
        pie.textContent = textoPie(boton);
        pie.hidden = pie.textContent === "";

        var carrusel = boton.closest(".carousel");
        if (carrusel && window.bootstrap) {
            carruselPausado = bootstrap.Carousel.getOrCreateInstance(carrusel);
            carruselPausado.pause();
        }

        capa.hidden = false;
        cerrar.focus({ preventScroll: true });
        document.addEventListener("keydown", alTeclado);
    }

    function cerrarVisor() {
        if (capa.hidden) return;
        capa.hidden = true;
        document.removeEventListener("keydown", alTeclado);
        if (carruselPausado) {
            carruselPausado.cycle();
            carruselPausado = null;
        }
        if (origen) {
            origen.focus({ preventScroll: true });
            origen = null;
        }
    }

    function alTeclado(evento) {
        if (evento.key === "Escape") {
            evento.preventDefault();
            cerrarVisor();
        }
    }

    fotos.forEach(function (img) {
        if (img.closest("a")) return;

        var boton = document.createElement("button");
        boton.type = "button";
        boton.className = "visor-disparador";
        boton.setAttribute("aria-label", "Ver la imagen completa: " + (img.getAttribute("alt") || "fotografía"));
        img.parentNode.insertBefore(boton, img);
        boton.appendChild(img);

        boton.addEventListener("click", function (evento) {
            evento.preventDefault();
            evento.stopPropagation();
            abrir(boton, img);
        });
    });

    cerrar.addEventListener("click", cerrarVisor);

    capa.addEventListener("click", function (evento) {
        if (evento.target === capa) cerrarVisor();
    });
})();
