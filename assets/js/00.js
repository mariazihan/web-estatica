// Para las cards
$(function () {
    // Manejar click en "Ver más" de cada card
    $(".card-body > .btn").click(function (event) {
        event.preventDefault();

        var $button = $(this);
        var $collapse = $button.next(".collapse"); // el div collapse justo después del botón

        // Mostrar el collapse con animación solo si está oculto
        if ($collapse.is(":hidden")) {
            $collapse.slideDown();
        } else {
            $collapse.slideUp();
        }

    });
});

// Para el nav
$(function () {
    $("section").hide();
    $("#home").show();

    // Detectamos clic en los enlaces del nav
    $(".ul-menu").children("li").children("a.nav-link").click(function (event) {
        event.preventDefault();

        // Ocultamos todas las secciones
        $("section").hide();

        // Obtenemos el href del enlace (por ejemplo "./events.html")
        let destino = $(this).attr("href");

        let id = destino.replace("#", ""); // convierte "#events" → "events"

        // Mostramos la sección correspondiente
        $("#" + id).fadeIn(400);


        // Cambiamos el estilo del enlace activo
        $(".ul-menu a").removeClass("active");
        $(this).addClass("active");
    });

});

// Log in and Sign in
$(function () {
    // Mostrar sección de registro desde login
    $("#login .log").click(function (e) {

        e.preventDefault(); // evitar que recargue la página

        // Ocultamos login
        $("#login").hide();

        // Mostramos registro
        $("#signin").fadeIn(400);
    });

    // Volver a login desde registro
    $("#signin .sig").click(function (e) {
        e.preventDefault();

        // Ocultamos registro
        $("#signin").hide();

        // Mostramos login
        $("#login").fadeIn(400);
    });
});

// Modal
$(function () {
    $("#contact form").submit(function (e) {
        e.preventDefault();

        // Mostrar modal Bootstrap
        let modal = new bootstrap.Modal($("#gracias")[0]); // jQuery devuelve array, necesitamos el DOM
        modal.show();

        // Limpiar formulario
        $(this)[0].reset();
    })

});

// Buscador
$(function () {
    function setupEventsSearch() {
        // Limpiar buscador existente
        $("#browser").empty();

        // Añadir label y input usando flexbox
        $("#browser").append(`
        <label for="events-browser" 
            class="mb-0 me-2"> Buscar producto: </label>
        <input type="text" id="events-browser" 
           class="form-control" 
           style="width:200px;" 
           placeholder="Escribe para buscar">
`);


        // Filtrar cards al escribir
        $("#events-browser").on("keyup", function () {
            let query = $(this).val().toLowerCase().trim();

            $("#events .card").each(function () {
                let text = $(this).text().toLowerCase();
                if (text.indexOf(query) !== -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
    }

    // Llamar a la función solo cuando se muestre la sección events
    $(".ul-menu a.nav-link").click(function (e) {
        let id = $(this).attr("href").replace("#", "");
        if (id == "events") {
            setupEventsSearch();
        }
    });
});
