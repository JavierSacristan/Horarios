window.onload = function(){
    var horarioMap = new Map();

    profesor=document.getElementById("cNombre");
    asignatura=document.getElementById("cAsignatura");
    grabar=document.getElementById("bGrabar");
    limpiar=document.getElementById("bLimpiar");
    cDias=document.getElementById("cDias");
    cHoras=document.getElementById("cHora");

    var fila=1;
    var columna=1;

    //funcion que recoge los elementos de los campos
    function horarioAsignatura (profesor, asignatura, columna, fila) {
        this.profesor=profesor;
        this.asignatura=asignatura;
        this.columna=columna;
        this.fila=fila;
    };   
    
    //funcion para guardar el value seleccionado del dia de la semana 
    cDias.addEventListener('change',
        function(){
            var columnaAux = this.options[cDias.selectedIndex];
            columna=columnaAux.value;
        });

    //funcion para guardar el value seleccionado de la hora 
    cHoras.addEventListener('change',
        function(){
           var filaAux = this.options[cHoras.selectedIndex];
           fila=filaAux.value;
        });    

    grabar.addEventListener("click", validarProfesor, false);
    grabar.addEventListener("click", grabarAsignatura,false);

    limpiar.addEventListener("click", limpiarCampos, false);

    //funcion que vacia los campos profesor y asignatura al pusar el boton limpiar
    function limpiarCampos(){
        profesor.value="";
        asignatura.value="";
    }

    //funcion que autocompleta el campo asignatura dependiendo del nombre del profesor introducido
    //al pulsar el boton grabar
    //si el nombre no es valido se vacian los campos
    function validarProfesor(){
        if (profesor.value.toLowerCase()=="fernando"){
            asignatura.value="DWEC";
        }else if (profesor.value.toLowerCase()=="ana"){
            asignatura.value="DIW";
        }else if (profesor.value.toLowerCase()=="marian"){
            asignatura.value="DWES";
        }else if (profesor.value.toLowerCase()=="daniel"){
            asignatura.value="Despliegue";
        }else {
            limpiarCampos();
        }
        
    }

    //funcion que guarda los valores introducidos en los campos
    //se los pasa al map
    //e imprime el nombre de la asignatura en la tabla
    function grabarAsignatura() {
        var hProfAsig = new horarioAsignatura(profesor.value, asignatura.value, columna, fila);
        horarioMap.set("c" + fila + columna, hProfAsig);

        document.getElementById("c"+fila+columna).innerHTML=asignatura.value;
        
        //Correccion del error, ahora le paso la funcion solo a los
        //campos de la tabla en los que se ha insertado algo
        document.getElementById("c"+fila+columna).addEventListener("click",recuperarInformacion,false);
    }

    //funcion que a traves del id del campo busca en el map 
    //los datos introducidos para al hacer click en los campos de la tabla
    //mostrar los valores guardados en los campos
    function recuperarInformacion(){
        var key = this.id;
        horariocelda = horarioMap.get(key);
        //pongo la primera letra del nombre del profesor en mayuscula
        profesor.value=horariocelda.profesor.charAt(0).toUpperCase()+horariocelda.profesor.slice(1);
        asignatura.value=horariocelda.asignatura;
        cHoras.value=horariocelda.fila;
        cDias.value=horariocelda.columna;
        

    }
}