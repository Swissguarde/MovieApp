const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=81d6e4a92b1686d81c8fc797b9fe5c53&page=2'
const IMGPATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=81d6e4a92b1686d81c8fc797b9fe5c53&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const query = document.querySelector('.query')

getMovies(APIURL)

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}
function showMovies(movies){
    main.innerHTML = ''
    movies.forEach(movie =>{
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML =  `
            <img src="${IMGPATH+movie.poster_path}" alt="">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${getRating(movie.vote_average)}">${movie.vote_average}</span>
                
            </div>
            <div class="overview">
            <h4 class="release-date">Date released: ${movie.release_date}</h4>
                ${movie.overview}
            </div>
        `
        main.appendChild(movieEl)
    })
}

function getRating(vote){
    if(vote >= 7.5){
        return 'green'
    } else if(vote >= 5){
        return 'orange'
    } else{
        return 'red'
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const searchInput = search.value.trim()
    if(searchInput && searchInput !== ''){
        getMovies(SEARCHAPI+searchInput)
        search.value = ''
    }else{
        query.innerHTML = `Sorry. We did nnot find anything matching ${setInterval}`
    }
})