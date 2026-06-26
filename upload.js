async function uploadArticles(){


console.log("Articles:", articles);


for(const article of articles){


const {data,error}=await supabaseClient
.from("articles")
.insert({

id:article.id,
title:article.title,
category:article.category,
image:article.image,
credits:article.credits,
excerpt:article.excerpt,
body:article.body,
tags:article.tags

});


if(error){

console.log(
"ERROR:",
article.id,
error
);

}
else{

console.log(
"UPLOADED:",
article.id
);

}


}


alert("Upload finished");


}


uploadArticles();
