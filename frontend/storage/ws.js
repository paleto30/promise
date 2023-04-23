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
                        <button type="button" class="btn btn-primary z-3  details" data-movie="${id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
                    </div>
                    <img src="https://image.tmdb.org/t/p/w780${poster_path}" class="card-img-top imgs" alt="..." >
                </div>
            `
        });
        
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
                        <button type="button" class="btn btn-primary z-3  details" data-movie="${id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
                    </div>
                    <img src="https://image.tmdb.org/t/p/w780${poster_path}" class="card-img-top imgs" alt="..." >
                </div>
            `
            }   
        });
        return [html];
    },


    async showModalDetails(idMovie){

        const data = await api.getOneById(idMovie);

        console.log(data);
        
        let html = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <img src="https://image.tmdb.org/t/p/w780${data.backdrop_path}" class="card-img-top " alt="..." >
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="d-flex justify-content-center ">
                            <h3 class="card-title">${data.original_title}</h3>
                        </div>
                    </div>
                </div>
            </div>

        `
        return html;
    }

}

self.addEventListener("message", (e)=>{
    Promise.resolve(ws[`${e.data.accion}`]((e.data.body)? e.data.body: undefined)).then(res => postMessage(res))
/*     const retorno = ws.showAll();
    Promise.resolve(retorno).then(res => postMessage(res)); */
})