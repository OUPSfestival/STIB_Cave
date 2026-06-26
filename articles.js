let articles = [];



async function loadArticles(){

const { data, error } = await supabaseClient
.from("articles")
.select("*");


if(error){

console.log(error);
return;

}


articles = data.map(article => ({

id: article.id,

title: article.title,

category: article.category,

image: article.image,

credits: article.credits,

excerpt: article.excerpt,

body: article.body,

tags: article.tags

}));


console.log("Articles loaded:", articles);


// start archive

populateRandom();

}


// start loading

loadArticles();
