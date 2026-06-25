let currentArticles = [...articles];


const list=document.getElementById("articleList");



function renderList(){


list.innerHTML="";


currentArticles.forEach(article=>{


let div=document.createElement("div");


div.innerHTML=`

${article.title}

<button onclick="editArticle('${article.id}')">
EDIT
</button>

`;


list.appendChild(div);


});


}



function editArticle(id){


let article=currentArticles.find(a=>a.id===id);



document.getElementById("id").value=article.id;

document.getElementById("title").value=article.title;

document.getElementById("category").value=article.category;

document.getElementById("image").value=article.image;

document.getElementById("excerpt").value=article.excerpt;

document.getElementById("body").value=article.body;

document.getElementById("tags").value=
article.tags.join(",");



}


async function saveArticle() {

  let article = {

    slug: document.getElementById("id").value,

    title: document.getElementById("title").value,

    category: document.getElementById("category").value,

    image: document.getElementById("image").value,

    excerpt: document.getElementById("excerpt").value,

    content: document.getElementById("body").value,

    tags: document.getElementById("tags").value
      .split(",")
      .map(t => t.trim())

  };

  const response = await fetch(
    "https://cave-api.manuelbischof-phil.workers.dev/api/articles",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(article)
    }
  );

  const result = await response.json();

  console.log(result);

  alert("Article saved to database");
}



renderList();
