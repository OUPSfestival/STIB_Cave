const list=document.getElementById("articleList");

const demo=[

{
title:"Pelvibacter lucens",
category:"Bacterial Colony"
},

{
title:"Lichen Exchange Systems",
category:"Symbiosis"
},

{
title:"Thermadrone",
category:"Artefact"
}

];

demo.forEach(article=>{

const div=document.createElement("div");

div.className="article";

div.innerHTML=`

<strong>${article.title}</strong>

<br>

<span>${article.category}</span>

`;

list.appendChild(div);

});
