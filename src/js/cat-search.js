
import Notiflix from 'notiflix';

const inputValue=document.querySelector(".search-form");

const gallery=document.querySelector("ul");

const images=document.querySelector(".gallery");

const query=document.querySelector("input");

let searchParam;

let loadPage;

let BASE_URL;

const fetchObjects = async () => {
    const response = await fetch(BASE_URL);
    const results = await response.json();
    return results;
  };
    
  
  
    inputValue.addEventListener("click",handleSeacrchClick);

    function handleSeacrchClick(evt)
      {
        evt.preventDefault();

        loadPage=1;
    
        searchParam=query.value;
        
        const searchParams = new URLSearchParams({
            per_page: 40,
            key: "38043357-f10dc93754f8f78d0f9509fe0",
            q:searchParam.trim(),
            image_type:"photo",
            orientation:"horisontal",
            safesearch:true,
            page:loadPage
          });
                 
          BASE_URL=`https://pixabay.com/api/?${searchParams}`;

          fetchObjects().then(results => {
          
            if(!searchParam.trim())
            {
              return;
            }
            if(results.totalHits===0)
            {
              Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
            
             images.innerHTML=``; 

             return;
            }else{

              Notiflix.Notify.info(`Hooray! We found ${results.totalHits} images.`);
            }
        
            renderCardsList(results);
           
         })
         .catch(error => {
            console.log(error);

            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');  
        
        });
             
    }

    function renderCardsList(results)
    {
        gallery.innerHTML=``; 
    
        const markup=results.hits.map((result)=>`<li><div class="photo-card">
        <img class="gallery__image" src=${result.webformatURL} alt=${result.tags} width="400" height="400" loading="lazy" />
     <div class="info">
       <p class="info-item">
         <b>Likes</br>${result.likes}</b>
        </p>
       <p class="info-item">
         <b>Views</br>${result.views}</b>
        </p>
       <p class="info-item">
         <b>Comments</br>${result.comments}</b>
         </p>
       <p class="info-item">
         <b>Downloads</br>${result.downloads}</b>
        </p>
     </div>
   </div></li>`).join("");
   
   gallery.innerHTML=markup;
     
   gallery.insertAdjacentHTML("beforeend",`<div class="button-wrapper"><button type="button" class="load-more">Load more</button></div>`);

   const buttonLoad=document.querySelector(".load-more");

    buttonLoad.addEventListener("click",handleLoad);
    
   function handleLoad(evt)
   {
       evt.preventDefault();
       
        loadPage+=1;

        buttonLoad.classList.toggle("is-hidden");
     
       const searchParams = new URLSearchParams({
           per_page: 40,
           key: "38043357-f10dc93754f8f78d0f9509fe0",
           q:searchParam.trim(),
           image_type:"photo",
           orientation:"horisontal",
           safesearch:true,
           page:loadPage
         });
                
         BASE_URL=`https://pixabay.com/api/?${searchParams}`;

         fetchObjects().then(results => {
           gallery.innerHTML=``;

           if(!searchParam.trim())
           {
             return;
           }
   
            if(loadPage>Number.parseInt(results.totalHits/40))
           {
             Notiflix.Notify.info("We are sorry, but you've reached the end of search results.");
             buttonLoad.remove();
             return;
           }

           renderCardsList(results);

           buttonLoad.classList.toggle("is-hidden");

    });
}

    }

   