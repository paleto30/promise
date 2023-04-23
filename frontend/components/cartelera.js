

export default {

    caragaInicio: async function () {
        const all = new Worker("./storage/ws.js", { type: "module" });
        all.postMessage({ accion: "showAll" });
        all.addEventListener("message", (e) => {
            document.querySelector("#cards").innerHTML = [...e.data];
            all.terminate()
        })

    },


    searchOneByName() {
        const buscar = document.querySelector("#buscar");
        buscar.addEventListener("input", (e) => {
            if (!buscar.value) {
                this.caragaInicio();
            } else {
                const searchs = new Worker("./storage/ws.js", { type: "module" });
                searchs.postMessage({ accion: "searchOneBYName", body: e.target.value })
                searchs.addEventListener("message", (e) => {
                    document.querySelector("#cards").innerHTML = [...e.data];
                    searchs.terminate()
                })
            }

        })
    },


    showModalDetails(){
        const detail  = document.querySelector("#cards");
        console.log(detail);
        detail.addEventListener("click",(e)=>{
            
            if (e.target.classList.contains("details")) {                
                const detalles = new Worker("./storage/ws.js",{type:"module"});
                let id = e.target.dataset.movie;
                detalles.postMessage({accion:"showModalDetails",body:`${Number(id)}`});
                detalles.addEventListener("message",(e)=>{
                    document.querySelector("#modalD").innerHTML = e.data;
                    detalles.terminate();
                })

            }  
            
        
        })
    }


}