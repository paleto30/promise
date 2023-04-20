
const key = "3df70b20cbd027249f00bb9372cbadf9";

const url = `https://api.themoviedb.org/3/movie/popular?api_key=3df70b20cbd027249f00bb9372cbadf9&page=1&language=es`;


export const getAll =  async ()=>{

    try {
        const data = await fetch(url);
        const result = await data.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}


