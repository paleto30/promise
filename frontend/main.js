
import {
    getAll
} from './API/api.js'



document.addEventListener("DOMContentLoaded",()=>{
    cargarDatos();
})


async function cargarDatos() {
    const data =  await getAll();
    const ws = new Worker("./storage/ws.js", {type:"module"});
    ws.postMessage(data);
    ws.addEventListener("message",(e)=>{
        document.querySelector("#cards").insertAdjacentHTML("afterbegin", e.data);
    })
}