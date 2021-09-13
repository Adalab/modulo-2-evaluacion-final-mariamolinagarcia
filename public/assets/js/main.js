'use strict';

//* GLOBAL VARIABLES FROM HTML
const inputSearch = document.querySelector('.js_input');
const button = document.querySelector('.js_button');
const showsList = document.querySelector('.js_shows_list');
const form = document.querySelector('.js_form');
const favoriteSidebar =document.querySelector('.js_fav_list');
const favoritesContainer =document.querySelector('.js_favorites_container');

//* ARRAYS
let tvShows=[];

let favoritesTvShows=[];

//!ARRAYS

// * BRING THE API ITEMS AND PAINT THEM IN THE LISTING

function paintShows (){      
    let html= '';

    for (const show of tvShows) {
        
        html+= `<li class="main__section--shows-list__item js_show" id="${show.show.id}">`;
        html+=`<div class="show__container">`;         
        
       if(show.show.image == null){
            
           html+=`<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${show.show.name}">`;  
        }else{
           html+=`<img src="${show.show.image.medium}" alt="${show.show.name}">`;
        }; 
    
        html+=`<h3>${show.show.name}</h3>`;         
        html+=`</div>`;
        showsList.innerHTML = html;
         } 

         listenList();
    }

button.addEventListener('click' , handleSearch);     

// ! END PAINT SHOWS

//* GET INFO FROM API

function handleSearch (){
    
    fetch(`https://api.tvmaze.com/search/shows?q=${inputSearch.value}`)     
    .then((response) => response.json())
    .then(data => {

        tvShows = data;
        
        paintShows();
    });

}

//! END GET INFO FROM API


//* NO SUBMIT FUNCTION AND EVENT
function formPreventD (event){
    event.preventDefault();
}

form.addEventListener('submit' , formPreventD);
 //! END NO SUBMIT



// *   FAVORITES

 function listenList(){
    const showLi = document.querySelectorAll('.js_show');

    for (const itemShow of showLi) {
        itemShow.addEventListener('click' , listenerfav);  
        paintFavoriteShows ();
        
    }

}

function listenerfav(event){
    const selectedLi = event.currentTarget;
    const selectedShow = parseInt(selectedLi.id);
    const favclicked = tvShows.find((tvshow)=>{
    
        return tvshow.show.id === selectedShow;

    });


    const favoriteFound = favoritesTvShows.findIndex((fav)=>{
        return fav.show.id === selectedShow;
    
});


    if(favoriteFound === -1){
        favoritesTvShows.push(favclicked);
        selectedLi.classList.add('selected');
        
       
    }else{
        favoritesTvShows.splice(favoriteFound, 1);
        selectedLi.classList.remove('selected'); 
        
    };
    setLocalStorage();
   


    if(favoritesTvShows.length === 0){
        favoritesContainer.classList.add('hidden');
    }else{
        favoritesContainer.classList.remove('hidden');
    }
paintFavoriteShows ();
}

//! END ADD TO FAVORITES

//*  PAINT FAVORITES SIDEBAR

function paintFavoriteShows (){      
    let html= '';

    for (const favShow of favoritesTvShows) {
        
        html+= `<li class="main__aside--container__list--item js_fav_show" id="${favShow.show.id}">`;
        
        html+=`<div class="main__aside--container__list--item__container">`;         
        
       
       if(favShow.show.image == null){
            
           html+=`<img class="main__aside--container__list--item__image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${favShow.show.name}">`;  
        }else{
           html+=`<img class="main__aside--container__list--item__image" src="${favShow.show.image.medium}" alt="${favShow.show.name}">`;
        }; 
    
        html+=`<h3>${favShow.show.name}</h3>`;         
        html+=`</div>`;
        favoriteSidebar.innerHTML = html;
         }
}

//! END PAINT FAVORITES SIDEBAR

//* LOCAL STORAGE


function getLocalStorage(){
    const localStorageShows = localStorage.getItem('shows');

    if(localStorageShows === null){
       favoritesTvShows = [];
    }else{
        favoritesTvShows = JSON.parse(localStorageShows);
        
        paintFavoriteShows();
    }

    if(favoritesTvShows.length === 0){
        favoritesContainer.classList.add('hidden');
    }else{favoritesContainer.classList.remove('hidden');
    }
}
getLocalStorage();

function setLocalStorage(){
    localStorage.setItem('shows' ,JSON.stringify(favoritesTvShows));
}
//! END LOCALSTORAGE
//# sourceMappingURL=main.js.map
