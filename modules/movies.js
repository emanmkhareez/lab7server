const axios = require('axios')

// https://api.themoviedb.org/3/search/movie?api_key=bec06652a4cb9591d54fceb6bc996e54&query=Action

//http:localhost:3008/movies?city=Amman

module.exports= handlrMovies;

let moviesResult = []

async function handlrMovies(req, res) {
    let city_name = req.query.city
    let urlMovies = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}`

    axios
        .get(urlMovies)
        .then(moviesArr => {
            moviesResult = moviesArr.data.results.map(item => {
                return new Movie(item)
            })


            res.send(moviesResult)
        })

        .catch(error => {
            res.send(`No weather data for this City ${error}`);
        })


}





// let Moviesarray=[]
//movies class
class Movie {
    constructor(item) {
        this.title = item.title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;

        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;
        //    Moviesarray.push(this)
    }
}
