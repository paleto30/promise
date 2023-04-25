
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
        const trailer = await api.getTrailers(idMovie);
        let opcion = '';
        if (trailer.results.length === 0) {
            opcion = `
                <div class="row">
                    <div class="col-12 col-md-12">
                        <img src="https://image.tmdb.org/t/p/w780${ (data.backdrop_path) ? data.backdrop_path : data.poster_path}" class="card-img-top " alt="..." >
                    </div>
                </div>
            `;
        }else{
            opcion = `
                <div class="row">
                    <iframe width="560" height="515" src="https://www.youtube.com/embed/${trailer.results[0]['key']}" frameborder="0" allowfullscreen></iframe>
                </div>
            ` 
        }
        
        let html = `
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-12 col-md-12">
                        <div class="d-flex justify-content-center ">
                            <h3 class="card-title " style="color: white">${data.original_title}</h3>
                        </div>
                    </div>
                </div>
                ${opcion}                 
                <div class="row mt-4">
                    <h6 style="color:orange">Resumen:</h6>
                    <p class="" style="color:white ">${data.overview}</p>
                </div>
                <div class="row my-3" style="color: white">
                    <h6 class="card-title">Fecha de lanzamiento: <spam style="color: orange">${data.release_date}</spam> </h6>
                    <h6 class="card-title">Popularidad: <spam style="color: orange"> ${data.popularity}</spam></h6>
                    <h6 class="card-title">Genero: <spam style="color: orange">${(data.genres.map((v,k) => v.name)).join(" | ")}</spam></h6>
                </div>
            </div>
        `
        return html;   
    }
}

self.addEventListener("message", (e)=>{
    Promise.resolve(ws[`${e.data.accion}`]((e.data.body)? e.data.body: undefined)).then(res => postMessage(res));
})