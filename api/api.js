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
      }
    )
  }
  // CHANGE THE PATHS ACCORIDNG TO API DOCUMENTATION
  getOneMovie = (id)=> {
    const movieDetails = this.api.request({
      url: `/movie/${id}`,
      params: {
          append_to_response: 'videos,images,credits,recommendations'
        },
      method: 'GET', 
      }).then((response)=> response.data)
      .catch((error)=> error)
    return movieDetails
  } 


  getMovieBySearch = (search) => {
    const searchResults = this.api.request({ 
      url:'/search/movie',
      params: {
          query: search,
        },
      method: 'GET', 
      }).then((response)=> response.data)
      .catch((error) => error)

    return searchResults;
  } 
  
  getUpcomingMovies = () => {
    const upcomingMovies = this.api.request({ 
        url:'/movie/upcoming',
        method: 'GET', 
      }).then((response)=> response.data)
      .catch((error) => error)

    return upcomingMovies;
  } 

  getTopRatedMovies = () => {
    const topRatedMovies = this.api.request({
      url:'/movie/top_rated',
      method: 'GET', 
    }).then((response)=>response.data)
    .catch((error) => error)

    return topRatedMovies
  }

  getPopularMovies = () => {
    const popularMovies = this.api.request({
      url:'/movie/popular',
      params: {
        append_to_response: 'videos'
      },
      method: 'GET'
    }).then((response) => response.data)
    .catch((error) => error)

    return popularMovies
  }

  getPeopleDetails = (person_id) => {
    const peopleDetails = this.api.request({
      url: `/person/${person_id}`,
      method: 'GET',
      params: {
        append_to_response: 'movie_credits'
      }
    }).then((response) => response.data)
    .catch((error) => error)
    
    return peopleDetails
  }

}



module.exports = new PopcornApi;