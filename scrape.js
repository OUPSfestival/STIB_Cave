const API =
"https://cave-api.manuelbischof-phil.workers.dev/api/articles";


let articles = [];

let selectedArticle = null;


const articleList =
document.getElementById("articleList");



async function loadArticles(){

    const response = await fetch(API);

    articles = await response.json();

    renderArticles();

}



function renderArticles(){

    articleList.innerHTML = "";


    articles.forEach(article=>{


        const div=document.createElement("div");

        div.className="article";


        div.innerHTML=`

            <strong>${article.title}</strong>

            <br>

            <small>
            ${article.category || ""}
            </small>

        `;


        div.onclick=()=>{

            selectArticle(article);

        };


        articleList.appendChild(div);


    });

}



function selectArticle(article){

    selectedArticle = article;


    document.getElementById("title").value =
    article.title || "";


    document.getElementById("category").value =
    article.category || "";


    document.getElementById("tags").value =
    article.tags || "";


    document.getElementById("excerpt").value =
    article.excerpt || "";


    document.getElementById("content").value =
    article.content || "";

}



document
.getElementById("newArticle")
.onclick=()=>{


    selectedArticle=null;


    document
    .querySelectorAll("input, textarea")
    .forEach(el=>el.value="");


};



document
.getElementById("save")
.onclick=async()=>{


    const article={

        slug:
        selectedArticle
        ? selectedArticle.slug
        : Date.now().toString(),


        title:
        document.getElementById("title").value,


        category:
        document.getElementById("category").value,


        excerpt:
        document.getElementById("excerpt").value,


        content:
        document.getElementById("content").value,


        tags:
        document.getElementById("tags").value

    };


    await fetch(API,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:
        JSON.stringify(article)

    });


    alert("Saved");

    loadArticles();


};



loadArticles();
