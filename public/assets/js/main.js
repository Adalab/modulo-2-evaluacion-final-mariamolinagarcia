'use strict';

const inputSearch = document.querySelector('.js_input');
const button = document.querySelector('.js_button');
const showsList = document.querySelector('.js_shows_list');
const form = document.querySelector('.js_form');

// * TRAER LOS ITEMS DEL API Y PINTARLOS EN EL LISTADO

    //creo un array vacío para llenarlo con el fecth al traer el listado de la API
let tvShows=[];

let favoritesTvShows=[];

    //esta función es para que añada el listado al ul del html
 function paintShows (){      
    let html= '';

    //hago un bucle para recorrer todos los items que devuelve la API
    for (const show of tvShows) {
        
        html+= `<li class="shows-list__item js_show" id="${show.show.id}">`;
        html+=`<div class="show__container">`;         
        
        //aquí hago un condicional para que ponga una imagen alternativa si no tiene imagen desde la API
       if(show.show.image == null){
            
           html+=`<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${show.show.name}">`;  
        }else{
           html+=`<img src="${show.show.image.medium}" alt="${show.show.name}">`;
        }; 
    
        html+=`<h3>${show.show.name}</h3>`;         
        html+=`</div>`;
        showsList.innerHTML = html;
         } 
    }

 // este es el evento en botón para que haga el fetch y salga la búsqueda.
button.addEventListener('click' , handleSearch);     

//función manejadora: hace la solicitud a la API y me pinta el resultado
function handleSearch (){
    
    fetch(`https://api.tvmaze.com/search/shows?q=${inputSearch.value}`)     
    .then((response) => response.json())
    .then(data => {

        tvShows = data;
        
        paintShows();
    });

}
    // esta función es para que no se envíe el formulario y por tanto no recargue la página
function formPreventD (event){
    event.preventDefault();
}

form.addEventListener('submit' , formPreventD);

// ! ACABA PARTE DE PINTAR EL GRID


// *   FAVORITOS

// es favorito?



// aquí traigo todos los elemenos <li> y les añado un evento click
 function listenList(){
    const showLi = document.querySelectorAll('.js_show');

    for (const itemShow of showLi) {
        itemShow.addEventListener('click' , listenerfav);  
       
    }

}

function listenerfav(event){
    const selectedLi = event.currentTarget;
    const selectedShow = parseInt(selectedLi.id);
    const favclicked = tvShows.find((tvshow)=>{
    
        return tvshow.show.id === selectedShow;

    });
console.log(favclicked);

    const favoriteFound = favoritesTvShows.findIndex((fav)=>{
        return fav.show.id === selectedShow;
    
});
console.log(favoriteFound);

    if(favoriteFound === -1){
        favoritesTvShows.push(favclicked);
        selectedLi.classList.add('selected');
        
    }else{
        favoritesTvShows.splice(favoriteFound, 1);
        selectedLi.classList.remove('selected');
    };
   
console.log(favoritesTvShows);


}

showsList.addEventListener('click' , listenList);


//! fin añadir a favoritos

//* sidebar favoritos






//# sourceMappingURL=main.js.map
