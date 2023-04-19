
let ws = {

    showAll(data){
        let  html = ''
        data.forEach(element => {
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
        return html
    }

}


self.addEventListener("message",(e)=>{
    console.log(e.data.results);
    const retorno = ws.showAll(e.data.results);
    postMessage(retorno);
})