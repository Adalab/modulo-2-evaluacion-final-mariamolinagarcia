'use strict';

const inputSearch = document.querySelector('.js_input');
const button = document.querySelector('.js_button');
const showsList = document.querySelector('.js_movies_list');
const form = document.querySelector('.js_form');


let tvShows=[];
 
 function paintShows (){      let html= '';

    for (const show of tvShows) {
        
        html+= `<li class="shows-list__item js_movie >`;
        html+=`<div class="movies__container">`;         
        
       if(show.show.image == null){
            
           html+=`<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${show.show.name}">`;  
        }else{
           html+=`<img src="${show.show.image.medium}" alt="${show.show.name}">`;
        }; 
    
        html+=`<h3>${show.show.name}</h3>`;         html+=`</div>`;
         showsList.innerHTML = html;
         } 
    }


 
 
button.addEventListener('click' , handleSearch);     

function handleSearch (ev){
    ev.preventDefault();
    fetch(`https://api.tvmaze.com/search/shows?q=${inputSearch.value}`)     
    .then((response) => response.json())
    .then(data => {

        tvShows = data;
        
        paintShows();
    });

}

function formPreventD (event){
    event.preventDefault();
}

form.addEventListener('submit' , formPreventD);

    
   
