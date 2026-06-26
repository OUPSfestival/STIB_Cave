const API =
"https://cave-api.manuelbischof-phil.workers.dev/api/articles";


let articles = [];

let currentArticle = null;



// Load articles from Cloudflare

async function loadArticles(){


    const response =
    await fetch(API);


    articles =
    await response.json();


    renderArticleList();

}





// Create left column

function renderArticleList(){


    const container =
    document.getElementById(
        "articles-container"
    );


    container.innerHTML="";


    articles.forEach(article=>{


        const item =
        document.createElement("div");


        item.className="article-item";


        item.innerHTML=`

        <strong>
        ${article.title || "Untitled"}
        </strong>

        <small>
        ${article.category || "No category"}
        </small>

        `;


        item.onclick=()=>{

            openArticle(article);

        };


        container.appendChild(item);


    });


}





// Load article into form

function openArticle(article){


    currentArticle = article;


    document.getElementById("article-id").value =
    article.id;


    document.getElementById("title").value =
    article.title || "";


    document.getElementById("category").value =
    article.category || "";


    document.getElementById("excerpt").value =
    article.excerpt || "";


    document.getElementById("body").value =
    article.content || "";


    document.getElementById("image").value =
    article.image || "";


    document.getElementById("credits").value =
    article.credits || "";


    displayTags(article.tags);


    updateImagePreview(article.image);

}





// Tags

function displayTags(tags){


    const box =
    document.getElementById("tags");


    box.innerHTML="";


    if(!tags)
    return;


    let list = tags;


    if(typeof tags === "string"){

        list = JSON.parse(tags);

    }



    list.forEach(tag=>{


        let span =
        document.createElement("span");


        span.innerHTML =
        tag + " ×";


        box.appendChild(span);


    });


}





// Image preview

function updateImagePreview(src){


    const img =
    document.getElementById("preview");


    if(src){

        img.src=src;

    }

    else{

        img.removeAttribute("src");

    }


}






// Save article

async function saveArticle(){


    if(!currentArticle){

        alert(
        "Select an article first"
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




    const response =
    await fetch(
        `${API}/${currentArticle.id}`,
        {

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
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





document
.querySelector(".save-button")
.onclick =
saveArticle;





loadArticles();
