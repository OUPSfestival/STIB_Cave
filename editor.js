// OUPS ARCHIVE EDITOR
// Cloudflare API connection


const API =
"https://cave-api.manuelbischof-phil.workers.dev/api/articles";


let articles = [];

let currentArticle = null;



// ------------------------------------
// LOAD ARTICLES FROM DATABASE
// ------------------------------------

async function loadArticles(){


    try {

        const response = await fetch(API);

       articles = await response.json();

       console.log("LOADED ARTICLES:", articles);

    renderArticleList();


    }

    catch(error){

        console.error(
            "Could not load articles:",
            error
        );

    }


}




// ------------------------------------
// LEFT COLUMN ARTICLE LIST
// ------------------------------------

function renderArticleList(){


    const container =
    document.getElementById(
        "articles-container"
    );


    container.innerHTML = "";



    articles.forEach(article => {


        const item =
        document.createElement("div");


        item.className =
        "article-item";



        item.innerHTML = `

            <strong>
                ${article.title || "Untitled"}
            </strong>

            <small>
                ${article.category || ""}
            </small>

        `;



        item.onclick = function(){

            openArticle(article);

        };



        container.appendChild(item);



    });


}






// ------------------------------------
// OPEN ARTICLE
// ------------------------------------

function openArticle(article){


    currentArticle = article;


    document
    .getElementById("title")
    .value =
    article.title || "";



    document
    .getElementById("category")
    .value =
    article.category || "";



    document
    .getElementById("excerpt")
    .value =
    article.excerpt || "";



    document
    .getElementById("body")
    .value =
    article.content || "";



    document
    .getElementById("image")
    .value =
    article.image || "";



    document
    .getElementById("credits")
    .value =
    article.credits || "";



    document.getElementById("publishing-date").value =
    article.publishing_date || "";



    document.getElementById("publishing-location").value =
    article.publishing_location || "";



    document.getElementById("publisher").value =
    article.publisher || "";



    document.getElementById("infos").value =
    article.infos || "";



    document.getElementById("object-material").value =
    article.object_material || "";



    document.getElementById("object-technique").value =
    article.object_technique || "";



    document.getElementById("sources").value =
    article.sources || "";



    document.getElementById("image-info").value =
    article.image_info || "";



    showTags(article.tags);


    updatePreview(article.image);



}







// ------------------------------------
// TAG DISPLAY
// ------------------------------------

function showTags(tags){


    const box =
    document.getElementById("tags");


    box.innerHTML = "";



    if(!tags){

        return;

    }



    let tagArray = tags;



    if(typeof tags === "string"){

        try{

            tagArray =
            JSON.parse(tags);

        }

        catch{

            tagArray =
            tags.split(",");

        }

    }




    tagArray.forEach(tag => {


        const element =
        document.createElement("span");


        element.textContent =
        tag;


        box.appendChild(element);


    });



}







// ------------------------------------
// IMAGE PREVIEW
// ------------------------------------

function updatePreview(image){


    const preview =
    document.getElementById("preview");



    if(image){

        preview.src = image;

    }

    else{

        preview.removeAttribute(
            "src"
        );

    }



}




// update image preview when typing path

document
.getElementById("image")
.addEventListener(
"input",
function(){

    updatePreview(this.value);

});







// ------------------------------------
// SAVE ARTICLE
// ------------------------------------

async function saveArticle(){


let url = API;
let method = "POST";


if(currentArticle){

    url = `${API}/${currentArticle.id}`;
    method = "PUT";

}


    const updatedArticle = {


        title:
        document.getElementById("title").value,


        category:
        document.getElementById("category").value,


        excerpt:
        document.getElementById("excerpt").value,


        content:
        document.getElementById("body").value,


        image:
        document.getElementById("image").value,


        credits:
        document.getElementById("credits").value,



        publishing_date:
        document.getElementById("publishing-date").value,


        publishing_location:
        document.getElementById("publishing-location").value,


        publisher:
        document.getElementById("publisher").value,


        infos:
        document.getElementById("infos").value,


        object_material:
        document.getElementById("object-material").value,


        object_technique:
        document.getElementById("object-technique").value,


        sources:
        document.getElementById("sources").value,


        image_info:
        document.getElementById("image-info").value


    };




    try{


        const response =
       await fetch(
    url,
    {

        method:method,
                headers:{

                    "Content-Type":
                    "application/json"

                },

                body:
                JSON.stringify(updatedArticle)

            }
        );



        if(response.ok){


            alert(
            "Article saved"
            );


            loadArticles();


        }

        else{


            alert(
            "Save failed"
            );


        }


    }


    catch(error){


        console.error(error);


        console.error("SAVE ERROR:", error);
        alert("Connection error");


    }



}






// SAVE BUTTON

document
.querySelector(".save-button")
.addEventListener(
"click",
saveArticle
);


// ------------------------------------
// NEW ARTICLE
// ------------------------------------

document
.getElementById("new-article")
.addEventListener(
"click",
function(){

    console.log("NEW ARTICLE CLICKED");

currentArticle = null;

document.getElementById("title").value = "";

document.getElementById("category").value = "";

document.getElementById("excerpt").value = "";

document.getElementById("body").value = "";

document.getElementById("image").value = "";

document.getElementById("credits").value = "";


document.getElementById("publishing-date").value = "";

document.getElementById("publishing-location").value = "";

document.getElementById("publisher").value = "";


document.getElementById("infos").value = "";

document.getElementById("object-material").value = "";

document.getElementById("object-technique").value = "";

document.getElementById("sources").value = "";

document.getElementById("image-info").value = "";


document.getElementById("title").focus();

});

// START



loadArticles();
