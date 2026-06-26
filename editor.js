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
    .getElementById("article-id")
    .value =
    article.id || "";



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


    if(!currentArticle){

        alert(
        "Please select an article first"
        );

        return;

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
        document.getElementById("credits").value



    };




    try{


        const response =
        await fetch(
            `${API}/${currentArticle.id}`,
            {

                method:"PUT",

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


        alert(
        "Connection error"
        );


    }



}






// SAVE BUTTON

document
.querySelector(".save-button")
.addEventListener(
"click",
saveArticle
);






// START

loadArticles();
