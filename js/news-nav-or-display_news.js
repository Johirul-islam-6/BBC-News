// <====================Responsive Nav bar side  js code===================> 
var navlinks = document.getElementById("nav-links");

function showmenu() {
    navlinks.style.right = "0";
}
function hidemenu() {
    navlinks.style.right = "-300px";
}
// <====================Responsive Nav bar side  js code end ===================> 


// <--------start nav news detailc----------->
const loadCatagory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCatagory(data.data.news_category))
        .catch(error => displayCatagory(error))
}

const displayCatagory = categories => {
    console.log(categories);
    const categoryContainer = document.getElementById("ul-container");
    categories.forEach(category => {
        // console.log(category)
        const categoryDiv = document.createElement('li');
        categoryDiv.innerHTML = `
        <a onclick="loadCategoryDetails('${category.category_id}')" class="nav-link">${category.category_name}</a>
    `;
        categoryContainer.appendChild(categoryDiv);
    })
}



// <============================= load Category details section js code ===============================>
const loadCategoryDetails = (id) => {

    // --------------loder display block-----------
     document.getElementById('loder').style.display = 'block';



    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayCategoryDetails(data.data))
        .catch(error => displayCategoryDetails(error))

}

const displayCategoryDetails = details => {

    // -----------loder display none---------------
    document.getElementById('loder').style.display = 'none';


    // -------------length CheakBox fild----------

    if (details.length > 0){
        const totallength = details.length;
        const inputfildText = document.getElementById('input-id');
        inputfildText.innerText = 'Total'+ ' ' + '[' + ' ' +  totallength + ' ' +']' + ' Update';
    }else if(details.length <= 0){

        const totallength = details.length;
        const inputfildText = document.getElementById('input-id');
        inputfildText.innerText =  'Total ' + ' ' + 'Not Update ';

    }

 

    const newsBodyContainer = document.getElementById('loading-news-container');
    newsBodyContainer.innerHTML = ''
    details.forEach(detail => {
        
        const createdivRow = document.createElement('div');
        createdivRow.classList.add('row', 'py-5', 'px-3', 'bg-color', 'my-4');
        createdivRow.innerHTML = `
                      <div class="col-lg-12 col-12">
                    <div class="row">
                        <div class="col-lg-3 col-12 col-md-12 d-flex pb-3 ">
                            <img class="mx-auto"  src="${detail.thumbnail_url}" alt="" >
                        </div>

                        <div class="col-lg-9">

                              <h4 class="card-title">${detail.title}</h4>
                                 <p class="card-text my-3">${detail.details.slice(0, 450) + ' ' + 'more.....'}</p>

                            <!-- ------------------------view row------------ -->
                                 <div class="row d-flex align-items-center justify-content-center ">
                                       <div class="col-md-4 d-block align-items-center"">
                                     <img  class="w-25 rounded-circle me-3 mx-auto pb-2" src="${detail.author.img}" alt="">
                                 <div>
                                     <h6>${detail.author.name ? detail.author.name : 'NO Name Found'}</h6>
                                    <p class= "py-2"> ${detail.author.published_date ? detail.author.published_date : 'NO Date Found'}</p>
                                        </div>
                       
                                     </div>
                                         <div class="col-md-3 d-flex ">
                                          <h5 class='mx-2 class= "py-2"' ><i class="fa-regular fa-eye"></i></h5>
                                         <h5 > ${detail.total_view ? detail.total_view : 'not view'} M</h5>
                                 </div>
                                <div class="col-lg-3 col-sm-12 d-flex py-2">
                                   <h5><i class="fa-solid fa-star"></i></h5>
                                   <h5><i class="fa-solid fa-star"></i></h5>
                                   <h5><i class="fa-solid fa-star"></i></h5>
                                   <h5><i class="fa-regular fa-star"></i></h5>
                                   <h5><i class="fa-regular fa-star"></i></h5>
                                </div>

                                 <div class="col-lg-2 d-flex">         
                                 
                                   <button type="button" onclick="viewClickDetails('${detail._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                   more view</button>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
           
        `;
        newsBodyContainer.appendChild(createdivRow);

    })
    // ----------stop spinner ----------
    

}


loadCategoryDetails();
loadCatagory();



// <==========================modal section js code ==========================>
const viewClickDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => viewClickDetailsDisplay(data))
        .catch(error => viewClickDetailsDisplay(error))

}

const viewClickDetailsDisplay = details => {

    // console.log(details)
    const modal = document.getElementById('exampleModalLabel');
    modal.innerHTML = ''

    try {
        const creatediv = document.createElement('div');

        creatediv.innerHTML = `
                            <div class="row">
                                 <div class="col-lg-12">
                                         <img class="w-100"  src="${details.data[0].image_url}" alt="" >
                                         <h3 class="card-text my-3">${details.data[0].title}</h3>
                                         <p>${details.data[0].details.slice(0, 250) + ' ' + 'more.....'}</p>
                                         <h5 h5 > ${details.data[0].author.published_date}</h5 >
                             </div>
                             </div>
     `;
        modal.appendChild(creatediv);

    } catch (err) {
        console.log(err)
    }

}

viewClickDetailsDisplay()
viewClickDetails();