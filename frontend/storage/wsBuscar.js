



let wsBuscar = {

    

}


self.addEventListener("message", (e) => {

    const busqueda = wsBuscar.searchOneBYName(e.data);
    console.log("BUscar", e.data);
    console.log(busqueda);
})