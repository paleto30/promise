import cartelera from "./components/cartelera.js";
import modal from "./components/modal.js";


document.addEventListener("DOMContentLoaded",(e)=>{
    modal.showModal();
    cartelera.caragaInicio();
    cartelera.searchOneByName();
})

