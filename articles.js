let articles = [];


// LOAD ARTICLES FROM SUPABASE

async function loadArticles(){

const { data, error } = await supabaseClient
.from("articles")
.select("*");


if(error){

console.log("Supabase error:", error);
return;

}


articles = data;


console.log("Loaded articles:", articles);


// start archive

populateRandom();

}


// start loading

loadArticles();





// COLUMNS

const columns = [
document.getElementById("column1"),
document.getElementById("column2"),
document.getElementById("column3")
];


const searchInput = document.getElementById("searchInput");





// SEARCH

searchInput.addEventListener("input", function(){

const query = this.value.toLowerCase();


columns.forEach(column=>{

column.innerHTML="";

});


const filtered = articles.filter(article=>{


return (

article.title.toLowerCase().includes(query) ||

article.category.toLowerCase().includes(query) ||

article.excerpt.toLowerCase().includes(query) ||

article.tags.some(tag =>
tag.toLowerCase().includes(query)
)

);


});



filtered.forEach((article,index)=>{

columns[index % 3].appendChild(
createCard(article)
);

});


});






// SHUFFLE

function shuffle(array){

return [...array].sort(
()=>Math.random()-0.5
);

}







// CREATE ARTICLE CARD

function createCard(article){

const card=document.createElement("article");


card.className="article-card";


card.innerHTML=`

<div class="article-image">

<img src="${article.image}">

</div>


<div class="article-info">


<div class="article-category">
${article.category}
</div>


<div class="article-title">
${article.title}
</div>


<div class="article-excerpt">
${article.excerpt}
</div>


</div>

`;



card.onclick=()=>openArticle(article);



return card;

}








// RANDOM ARTICLE DISTRIBUTION

function populateRandom(){


columns.forEach(column=>{

column.innerHTML="";

});


const shuffled = shuffle(articles);



shuffled.forEach((article,index)=>{


columns[index % 3]
.appendChild(
createCard(article)
);


});


}









// OPEN ARTICLE

function openArticle(article){


document
.getElementById("archiveLayout")
.classList.add("hidden");



document
.getElementById("articleView")
.classList.remove("hidden");



document.getElementById("articleTitle")
.textContent = article.title;



document.getElementById("articleCategory")
.textContent = article.category;



document.getElementById("articleTags")
.innerHTML =
article.tags.map(tag=>

`<span class="article-tag">${tag}</span>`

).join(" ");




document.getElementById("articleImage")
.src = article.image;



document.getElementById("articleCredits")
.textContent = article.credits;



document.getElementById("articleBody")
.textContent = article.body;



}








// BACK BUTTON

document
.getElementById("backButton")
.addEventListener("click",()=>{


document
.getElementById("articleView")
.classList.add("hidden");



document
.getElementById("archiveLayout")
.classList.remove("hidden");


});







// CLICK IMAGE TO RETURN

document
.getElementById("articleImage")
.addEventListener("click",()=>{


document
.getElementById("articleView")
.classList.add("hidden");



document
.getElementById("archiveLayout")
.classList.remove("hidden");


});









// TAG DROPDOWNS

const tagSelects =
document.querySelectorAll(".tag-select");




tagSelects.forEach(select=>{


select.innerHTML=
`
<option value="" selected>
</option>
`;



});




// CREATE TAG LIST AFTER DATA LOAD

async function createTags(){


while(articles.length===0){

await new Promise(
resolve=>setTimeout(resolve,100)
);

}



const allTags=[

...new Set(

articles.flatMap(article=>article.tags)

)

];



tagSelects.forEach(select=>{


allTags.forEach(tag=>{


select.innerHTML +=

`
<option value="${tag}">
${tag}
</option>
`;


});


});


}



createTags();








// TAG FILTER

tagSelects.forEach((select,index)=>{


select.addEventListener("change",()=>{


const selectedTag = select.value;


const column = columns[index];


column.innerHTML="";



let filtered;



if(selectedTag===""){


filtered=shuffle(articles);


}

else{


filtered =
articles.filter(article=>

article.tags.includes(selectedTag)

);


}




filtered.forEach(article=>{


column.appendChild(
createCard(article)
);


});


});


});








// MOBILE VIEW

function mobileView(view){


const layout =
document.getElementById("archiveLayout");



layout.classList.remove(

"show-info",
"show-articles",
"show-dialogue"

);



layout.classList.add(
"show-"+view
);



}
