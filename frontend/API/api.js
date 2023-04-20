
// get populars
const getAll =  async ()=>{
    try {
        const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3df70b20cbd027249f00bb9372cbadf9&page=1&language=es`);
        const result = await data.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}



// search one by name 
const searchOne = async (name) => {
    try {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3df70b20cbd027249f00bb9372cbadf9&query=${name}`);
        const result = await data.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export default{
    getAll,
    searchOne
}