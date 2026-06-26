const API =
"https://cave-api.manuelbischof-phil.workers.dev/api/articles";


const articleList = document.getElementById("articleList");

let articles = [];
let currentArticle = null;



async function loadArticles(){

    const response = await fetch(API);

    articles = await response.json();

    renderList();

}



function renderList(){

    articleList.innerHTML = "";

    articles.forEach(article => {

        const item = document.createElement("div");

        item.className = "article";

        item.innerHTML = `
            <strong>${article.title}</strong>
            <br>
            <small>${article.category || "No category"}</small>
        `;


        item.onclick = () => openArticle(article);


        articleList.appendChild(item);

    });

}



function openArticle(article){

    currentArticle = article;


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
.onclick = () => {

    currentArticle = null;

    document.querySelectorAll("input, textarea")
    .forEach(field => field.value = "");

};



loadArticles();
