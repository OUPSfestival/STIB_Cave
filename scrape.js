const API =
"https://cave-api.manuelbischof-phil.workers.dev/api/articles";


let articles = [];


const articleList =
document.getElementById("articleList");



async function loadArticles(){

    const response = await fetch(API);

    articles = await response.json();

    console.log(articles);

    showArticles();

}



function showArticles(){

    articleList.innerHTML="";


    articles.forEach(article=>{


        const item=document.createElement("div");


        item.className="article";


        item.innerHTML=`

            <h3>${article.title}</h3>

            <p>${article.category || ""}</p>

        `;


        articleList.appendChild(item);


    });


}



loadArticles();
