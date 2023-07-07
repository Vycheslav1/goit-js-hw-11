
import Notiflix from 'notiflix';

import{fetchObjects} from './index.js'

const query=document.querySelector(`input[name="searchQuery"]`);

const gallery=document.querySelector("ul");

const buttonSearch=document.querySelector(".search");

const BASE_URL=`https://pixabay.com/api/`;
    
  let searchParam;

 let pictures=[];

  let loadPage;

  

  buttonSearch.addEventListener("click",handleSeacrchClick);

   function handleSeacrchClick(evt)
   {
     evt.preventDefault();

      pictures=[];
   
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
              
       URL=`${BASE_URL}?${searchParams}`;
   
       fetchObjects().then(results => {
       
         if(!searchParam.trim())
         {
           return;
         }
         if(results.totalHits===0)
         {
           Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
         
          gallery.innerHTML=``; 
   
          return;
         }else{
   
           pictures.push(results.hits);
    
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
    
       let markup=``;

      
       for(let i=0; i<pictures.length;i+=1)
       {
        for(let j=0;j<pictures[i].length;j+=1)
       {
        markup+=`<li><div class="photo-card"><img src=${pictures[i][j].webformatURL} alt=${pictures[i][j].tags} width="400" height="400" loading="lazy" />
     <div class="info">
       <p class="info-item">
         <b>Likes</br>${pictures[i][j].likes}</b>
        </p>
       <p class="info-item">
         <b>Views</br>${pictures[i][j].views}</b>
        </p>
       <p class="info-item">
         <b>Comments</br>${pictures[i][j].comments}</b>
         </p>
       <p class="info-item">
         <b>Downloads</br>${pictures[i][j].downloads}</b>
        </p>
     </div>
    </div></li>`;
       };};
    gallery.innerHTML=markup;
     
    
   gallery.insertAdjacentHTML("beforeend",`<div class="button-wrapper"><button type="button" class="load-more">Load more</button></div>`);
    
   const buttonLoad=document.querySelector(".load-more");

    if(loadPage===Number.parseInt(results.totalHits/40))
    {
      Notiflix.Notify.info("We are sorry, but you've reached the end of search results.");
     buttonLoad.remove();
      return;
    }
          
    buttonLoad.addEventListener("click",(evt)=>{
    
    
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
               
        URL=`${BASE_URL}?${searchParams}`;
   
        fetchObjects().then(results => {
     
          if(!searchParam.trim())
          {
            return;
          }
          
           pictures.push(results.hits);

          renderCardsList(results);
   
          buttonLoad.classList.toggle("is-hidden");
   
   })
   
   });
    }
    
    
    