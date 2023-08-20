const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const moiveBox = document.querySelector("#movie-box")

//fetch data from API

const getMovies = async (url) => {
    const response = await fetch(url)
    //convert data into json file
    const data = await response.json()
    //showMovie() function call
    showMovies(data)
}

//init call
getMovies(APIURL);

//put data into html

const showMovies = (data) => {
    moiveBox.innerHTML = "";
    data.results.forEach(
        (result) => {
            //condition for image (ternary condition)
            const imagePath = result.poster_path === null ? "img/image-missing.png" : IMGPATH + result.poster_path;
        
            //create html element
            const box = document.createElement("div")
            box.classList.add("box")
            box.innerHTML = `
                <img src="${imagePath}" alt="" />
                <div class="overlay">
                    <div class="title"> 
                        <h2> ${result.original_title}  </h2>
                        <i class="fa-solid fa-star"></i> <span> ${result.vote_average} <span>
                    </div>
                    <h3>Overview:</h3>
                    <p> 
                        ${result.overview}
                    </p>
                 </div>
            `
            moiveBox.appendChild(box)
        }
    )
}


//for search any Movie in search bar 
document.querySelector("#search").addEventListener(
    "keyup",
    function (event) {
        if (event.target.value != "") {
            getMovies(SEARCHAPI + event.target.value)
        } else {
            getMovies(APIURL);
        }
    }
)