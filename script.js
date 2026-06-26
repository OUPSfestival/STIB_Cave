// 1. Columns
const columns = [
  document.getElementById("column1"),
  document.getElementById("column2"),
  document.getElementById("column3")
];
const searchInput = document.getElementById("searchInput");


searchInput.addEventListener("input", function(){

  const query = this.value.toLowerCase();


  columns.forEach(column=>{

    column.innerHTML = "";

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

// 2. Shuffle function

function shuffle(array){
  return [...array].sort(() => Math.random() - 0.5);
}


// 3. Create cards

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





// 4. Random distribution

function populateRandom(){

  columns.forEach(c => c.innerHTML = "");

  const shuffled = shuffle(articles);

  shuffled.forEach((article,index)=>{

    const target = columns[index % 3];

    target.appendChild(
      createCard(article)
    );

  });

}

populateRandom();


// 5. OPEN ARTICLE  <-- paste here

function openArticle(article){

  document
  .getElementById("archiveLayout")
  .classList.add("hidden");


  document
  .getElementById("articleView")
  .classList.remove("hidden");


  document.getElementById("articleTitle").textContent =
    article.title;


  document.getElementById("articleCategory").textContent =
    article.category;

  document.getElementById("articleTags").innerHTML =
  article.tags.map(tag => 
    `<span class="article-tag">${tag}</span>`
  ).join(" ");


  document.getElementById("articleImage").src =
    article.image;


  document.getElementById("articleCredits").textContent =
    article.credits;


  document.getElementById("articleBody").textContent =
    article.body;


}


// 6. BACK BUTTON <-- paste here

document
.getElementById("backButton")
.addEventListener("click", ()=>{

  document
  .getElementById("articleView")
  .classList.add("hidden");


  document
  .getElementById("archiveLayout")
  .classList.remove("hidden");

});

document
.getElementById("articleImage")
.addEventListener("click", ()=>{

  document
  .getElementById("articleView")
  .classList.add("hidden");


  document
  .getElementById("archiveLayout")
  .classList.remove("hidden");

});


// TAG SYSTEM


const tagSelects = document.querySelectorAll(".tag-select");


// collect all tags

const allTags = [
  ...new Set(
    articles.flatMap(article => article.tags)
  )
];


// create dropdown options

tagSelects.forEach(select => {

  select.innerHTML = `
    <option value="" selected hidden></option>
  `;

  allTags.forEach(tag => {

    select.innerHTML += `
      <option value="${tag}">
        ${tag}
      </option>
    `;

  });

});

// filter when changed

tagSelects.forEach((select,index)=>{


select.addEventListener("change",()=>{


const selectedTag = select.value;


const column = columns[index];


column.innerHTML="";



let filtered;



if(selectedTag===""){

filtered = shuffle(articles);

}

else{


filtered = articles.filter(article=>

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


function scrollToColumn(target){

  const element = document.querySelector("." + target);

  if(element){

    element.scrollIntoView({
      behavior:"smooth"
    });

  }

}








function mobileView(view){


document.querySelector(".intro-panel").style.display="none";

document.querySelectorAll(".archive-column")
.forEach(col=>{
col.style.display="none";
});

document.querySelector(".case-panel").style.display="none";



if(view==="info"){

document.querySelector(".intro-panel")
.style.display="block";

}



if(view==="articles"){

document.querySelectorAll(".archive-column")
.forEach(col=>{
col.style.display="block";
});

}



if(view==="dialogue"){

document.querySelector(".case-panel")
.style.display="block";

}


}
