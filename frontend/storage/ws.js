import api from "../API/api.js";

let ws = {

    async showAll(){
        const data = await api.getAll();
        let  html = ''
        data.results.forEach(element => {
            const { id, title, overview, poster_path  } = element;
            html+=`
                <div class="card text-center cardhover" style="width: 18rem; border: 1px solid black;">
                    <div class="w-100 h-100 position-absolute cardcover d-danger">
                        <h5 class="card-title ">${title}</h5>
                        <a href="#" class="btn btn-primary z-3 " data-movie="${id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</a>
                    </div>
                    <img src="https://image.tmdb.org/t/p/w780${poster_path}" class="card-img-top imgs" alt="..." >
                </div>
            `
        });
        console.log(html);
        return [html];
    },

    async searchOneBYName(name) {
        let html = '';

        const data = await api.searchOne(name);
        data.results.forEach(element => {
            const { id, title, overview, poster_path  } = element;
            if (poster_path) {
                html+=`
                <div class="card text-center cardhover" style="width: 18rem; border: 1px solid black;">
                    <div class="w-100 h-100 position-absolute cardcover d-danger">
                        <h5 class="card-title ">${title}</h5>
                        <a href="#" class="btn btn-primary z-3 " data-movie="${id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</a>
                    </div>
                    <img src="https://image.tmdb.org/t/p/w780${poster_path}" class="card-img-top imgs" alt="..." >
                </div>
            `
            }   
        });
        return [html];
    },


    showModalDetails(idMovie){
        let html = `
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        `
    }

}

self.addEventListener("message", (e)=>{
    Promise.resolve(ws[`${e.data.accion}`]((e.data.body)? e.data.body: undefined)).then(res => postMessage(res))
/*     const retorno = ws.showAll();
    Promise.resolve(retorno).then(res => postMessage(res)); */
})