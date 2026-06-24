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



function saveArticle(){


let article={


id:
document.getElementById("id").value,


title:
document.getElementById("title").value,


category:
document.getElementById("category").value,


image:
document.getElementById("image").value,


excerpt:
document.getElementById("excerpt").value,


body:
document.getElementById("body").value,


tags:
document.getElementById("tags").value
.split(",")
.map(t=>t.trim())


};



let index=currentArticles.findIndex(
a=>a.id===article.id
);



if(index>=0){

currentArticles[index]=article;

}
else{

currentArticles.push(article);

}


renderList();


alert("saved");


}



renderList();
