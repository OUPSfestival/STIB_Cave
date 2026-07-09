console.log("SCRIPT LOADED");
var articles = [];

async function loadArticles() {

    const { data, error } = await supabaseClient
        .from("articles")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

   articles = data;

  createTagDropdowns();
  populateRandom();
}

loadArticles();







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


if (window.innerWidth < 700) {

  filtered.forEach(article => {
    columns[0].appendChild(createCard(article));
  });

} else {

  filtered.forEach((article,index)=>{
    columns[index % 3].appendChild(createCard(article));
  });

}

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


card.onclick=function(){
  console.log("CLICKED", article);
  openArticle(article);
};

return card;

}





// 4. Random distribution

function populateRandom(){

  columns.forEach(c => c.innerHTML = "");

  const shuffled = shuffle(articles);

  if (window.innerWidth < 700) {

    // Mobile: one long list
    shuffled.forEach(article => {
      columns[0].appendChild(createCard(article));
    });

  } else {

    // Desktop: keep existing layout
    shuffled.forEach((article,index)=>{
      columns[index % 3].appendChild(createCard(article));
    });

  }

}




// 5. OPEN ARTICLE  <-- paste here

function openArticle(article){

     console.log("OPEN ARTICLE WORKS", article);

 document
 .getElementById("archiveLayout")
 .classList.add("hidden");


 document
 .getElementById("articleView")
 .classList.remove("hidden");

window.currentArticleId = article.id;

    document.getElementById("articleTitle").textContent =
        article.title;

    document.getElementById("articleCategory").textContent =
        article.category;

    document.getElementById("articleExcerpt").textContent =
        article.excerpt;

   document.getElementById("articleBody").innerHTML =
    article.body
        .split(/\n\s*\n/)
        .map(paragraph => `<p>${paragraph}</p>`)
        .join("");

    document.getElementById("articleTags").innerHTML =
        (article.tags || []).map(tag =>
            `<span class="article-tag">${tag}</span>`
        ).join(" ");

    document.getElementById("articlePublishingDate").textContent =
        article.publishing_date;

    document.getElementById("articlePublishingLocation").textContent =
        article.publishing_location;

    document.getElementById("articlePublisher").textContent =
        article.publisher;

    document.getElementById("articleInfos").textContent =
        article.infos;

    document.getElementById("articleObjectMaterial").textContent =
        article.object_material;

    document.getElementById("articleObjectTechnique").textContent =
        article.object_technique;

    document.getElementById("articleSources").textContent =
        article.sources;

    document.getElementById("articleImage").src =
        article.image;

    document.getElementById("articleImageInfo").textContent =
        article.image_info;
        
}

// PUT THIS AFTER THE FUNCTION
document.addEventListener(
"click",
function(event){

    if(
        event.target.id === "articleCommentsButton"
    ){

        console.log(
            "DISCUSSION CLICKED"
        );


        const dialogue = document.getElementById("articleDialogue");


        // close if already open
        if(dialogue.innerHTML.trim() !== ""){

            dialogue.innerHTML = "";

            return;

        }


        console.log(
            "ARTICLE ID:",
            window.currentArticleId
        );


        openArticleComments(
            window.currentArticleId
        );

    }

});



async function openArticleComments(articleID){


    const {data:comments,error} =
    await supabaseClient
    .from("comments")
    .select("*")
    .eq(
        "article_id",
        articleID
    )
    .order(
        "created_at",
        {
            ascending:true
        }
    );


    if(error){

        console.error(error);
        return;

    }


    const container =
    document.getElementById(
        "articleDialogue"
    );


    container.innerHTML = `

       

        ${
            comments.map(comment=>`

            <div class="article-comment">

                <strong>
                    ${comment.author}
                </strong>

                <p>
                    ${comment.content}
                </p>

                <small>
                    ${comment.created_at}
                </small>

            </div>

            `).join("")
        }

    `;


}



// 6. CLOSE ARTICLE VIEW

function closeArticle(){

  document
  .getElementById("articleView")
  .classList.add("hidden");


  document
  .getElementById("archiveLayout")
  .classList.remove("hidden");

}


// close when clicking image
document
.getElementById("articleImage")
.addEventListener("click", closeArticle);







// TAG SYSTEM

let tagSelects;
function createTagDropdowns() {
tagSelects = document.querySelectorAll(".tag-select");
  

  const allTags = [
    ...new Set(
      articles.flatMap(article => article.tags)
    )
  ].sort();

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

setTimeout(() => {

  tagSelects[0].value = "cave";
  tagSelects[1].value = "artefact";
  tagSelects[2].value = "system";

  tagSelects[0].dispatchEvent(new Event("change"));
  tagSelects[1].dispatchEvent(new Event("change"));
  tagSelects[2].dispatchEvent(new Event("change"));

}, 100);
    
}



// filter when changed

document.querySelectorAll(".tag-select").forEach((select,index)=>{

select.addEventListener("change",()=>{


const selectedTag = select.value;


const column = columns[index];


column.innerHTML="";



let filtered;



if(selectedTag===""){

filtered = shuffle(articles);

}

else{


filtered = shuffle(
  articles.filter(article =>
    article.tags.includes(selectedTag)
  )
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



document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.querySelector(".contribution-trigger");
  const box = document.querySelector(".contribution-box");

  trigger.addEventListener("click", () => {
    if (box.style.display === "block") {
      box.style.display = "none";
    } else {
      box.style.display = "block";
    }
  });
});




function mobileView(view){

const layout =
document.getElementById("archiveLayout");


layout.classList.remove(
"show-info",
"show-articles",
"show-dialogue"
);


layout.classList.add(
"show-" + view
);


}
document.addEventListener("DOMContentLoaded", () => {
  mobileView("articles");
});
