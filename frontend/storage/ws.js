import api from "../API/api.js";

let ws = {

    async showAll(){
        const data = await api.getAll();
        let  html = ''
        data.results.forEach(element => {
            const { id, title, overview, poster_path  } = element;
            html+=`
                <div class="card text-center" style="width: 18rem;">
                    <img src="https://image.tmdb.org/t/p/w780${poster_path}" class="card-img-top" alt="...">
                    <div class="card-body ">
                    <h5 class="card-title ">${title}</h5>
                        <a href="#" class="btn btn-primary " data-movie="${id}">Details</a>
                    </div>
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
                <div class="card text-center" style="width: 18rem;">
                    <img src="https://image.tmdb.org/t/p/w780${poster_path}" class="card-img-top" alt="...">
                    <div class="card-body ">
                    <h5 class="card-title ">${title}</h5>
                        <a href="#" class="btn btn-primary " data-movie="${id}">Details</a>
                    </div>
                </div>
            `
            }   
        });
        return [html];
    }

}

self.addEventListener("message", (e)=>{
    Promise.resolve(ws[`${e.data.accion}`]((e.data.body)? e.data.body: undefined)).then(res => postMessage(res))
/*     const retorno = ws.showAll();
    Promise.resolve(retorno).then(res => postMessage(res)); */
})