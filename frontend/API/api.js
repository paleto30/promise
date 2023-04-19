
const key = "3df70b20cbd027249f00bb9372cbadf9";
const genreId = 36;
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genreId}`;




export const getAll =  async ()=>{

    try {
        const data = await fetch(url);
        const result = await data.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}


