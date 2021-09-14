const axios = require("axios");
const { response } = require("express");
class PopcornApi {
  constructor(baseURL) { //baseUrl could be overwritten in the route that uses the API
    this.baseURL = baseURL, 
    this.api = axios.create(
      {
        baseURL: process.env.API_URL || this.baseURL, 
        timeout: 3000,
        params: {
          api_key: process.env.API_KEY,
        },
        method: 'GET', 
      }
    )
  }
  // CHANGE THE PATHS ACCORIDNG TO API DOCUMENTATION
  getOneMovie = (id)=> {
    const movieDetails = this.api.request({
      url: `/movie/${id}`,
      params: {
          append_to_response: 'videos,images,credits,recommendations'
        }
      }).then((response)=> response.data)
      .catch((error)=> error)
    return movieDetails
  } 


  getMovieBySearch = (search) => {
    const searchResults = this.api.request({ 
      url:'/search/movie',
      params: {
          query: search,
        }
      }).then((response)=> response.data)
      .catch((error) => error)

    return searchResults;
  } 
  
  getUpcomingMovies = () => {
    const upcomingMovies = this.api.request({ 
        url:'/movie/upcoming',
      }).then((response)=> response.data)
      .catch((error) => error)

    return upcomingMovies;
  } 
}

module.exports = new PopcornApi;