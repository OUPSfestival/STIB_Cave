
async function loadArticles(){

    const { data, error } = await supabaseClient
        .from("articles")
        .select("*")
        .order("title");

    if(error){
        console.error(error);
        return;
    }

    articles = data;

    renderArticleList();

}


let articles = [];

let currentArticle = null;



// ------------------------------------
// LOAD ARTICLES FROM DATABASE
// ------------------------------------

async function loadArticles(){

    const { data, error } = await supabaseClient
        .from("articles")
        .select("*")
        .order("title");

    if(error){
        console.error(error);
        return;
    }

    articles = data;

    renderArticleList();

}




// ------------------------------------
// LEFT COLUMN ARTICLE LIST
// ------------------------------------

function renderArticleList(){


    const container =
    document.getElementById(
        "articles-container"
    );


    container.innerHTML = "";



    articles.forEach(article => {


        const item =
        document.createElement("div");


        item.className =
        "article-item";



        item.innerHTML = `

            <strong>
                ${article.title || "Untitled"}
            </strong>

            <small>
                ${article.category || ""}
            </small>

        `;



        item.onclick = function(){

            openArticle(article);

        };



        container.appendChild(item);



    });


}






// ------------------------------------
// OPEN ARTICLE
// ------------------------------------

function openArticle(article){

console.log("OPEN ARTICLE", article);
    currentArticle = article;


    document
    .getElementById("title")
    .value =
    article.title || "";



    document
    .getElementById("category")
    .value =
    article.category || "";



    document
    .getElementById("excerpt")
    .value =
    article.excerpt || "";



    document
.getElementById("body")
.value =
article.body || "";


    document
    .getElementById("image")
    .value =
    article.image || "";



    document
    .getElementById("credits")
    .value =
    article.credits || "";



    document.getElementById("publishing-date").value =
    article.publishing_date || "";



    document.getElementById("publishing-location").value =
    article.publishing_location || "";



    document.getElementById("publisher").value =
    article.publisher || "";



    document.getElementById("infos").value =
    article.infos || "";



    document.getElementById("object-material").value =
    article.object_material || "";



    document.getElementById("object-technique").value =
    article.object_technique || "";



    document.getElementById("sources").value =
    article.sources || "";



    document.getElementById("image-info").value =
    article.image_info || "";



    showTags(article.tags);


    updatePreview(article.image);



}







// ------------------------------------
// TAG DISPLAY
// ------------------------------------

function showTags(tags){


    const box =
    document.getElementById("tags");


    box.innerHTML = "";



    if(!tags){

        return;

    }



    let tagArray = tags;



    if(typeof tags === "string"){

        try{

            tagArray =
            JSON.parse(tags);

        }

        catch{

            tagArray =
            tags.split(",");

        }

    }




    tagArray.forEach(tag => {


        const element =
        document.createElement("span");


        element.textContent =
        tag;


        box.appendChild(element);


    });



}







// ------------------------------------
// IMAGE PREVIEW
// ------------------------------------

function updatePreview(image){


    const preview =
    document.getElementById("preview");



    if(image){

        preview.src = image;

    }

    else{

        preview.removeAttribute(
            "src"
        );

    }



}




// update image preview when typing path

document
.getElementById("image")
.addEventListener(
"input",
function(){

    updatePreview(this.value);

});







// ------------------------------------
// SAVE ARTICLE
// ------------------------------------

async function saveArticle(){

    const articleData = {

        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
        excerpt: document.getElementById("excerpt").value,
        body: document.getElementById("body").value,
        image: document.getElementById("image").value,
        credits: document.getElementById("credits").value,

        publishing_date: document.getElementById("publishing-date").value,
        publishing_location: document.getElementById("publishing-location").value,
        publisher: document.getElementById("publisher").value,

        infos: document.getElementById("infos").value,
        object_material: document.getElementById("object-material").value,
        object_technique: document.getElementById("object-technique").value,
        sources: document.getElementById("sources").value,
        image_info: document.getElementById("image-info").value
    };

    let result;

    if(currentArticle){

        result = await supabaseClient
            .from("articles")
            .update(articleData)
            .eq("id", currentArticle.id);

    }else{

        result = await supabaseClient
            .from("articles")
            .insert(articleData);

    }

    if(result.error){

        console.error(result.error);
        alert("Save failed");
        return;

    }

    alert("Article saved");

    currentArticle = null;

    loadArticles();

}


// =========================
// TAG SYSTEM (EDITOR)
// =========================

let selectedTags = [];

// call this when editor loads OR articles are loaded
function renderTagOptions(articles) {

  const allTags = [
    ...new Set(
      (articles || []).flatMap(a => a.tags || [])
    )
  ];

  const container = document.getElementById("tagContainer");
  if (!container) return;

  container.innerHTML = "";

  allTags.forEach(tag => {

    const el = document.createElement("span");
    el.className = "tag-option";
    el.textContent = tag;

    if (selectedTags.includes(tag)) {
      el.classList.add("active");
    }

    el.addEventListener("click", () => toggleTag(tag, el));

    container.appendChild(el);

  });

}

// toggle selection
function toggleTag(tag, el) {

  if (selectedTags.includes(tag)) {
    selectedTags = selectedTags.filter(t => t !== tag);
    el.classList.remove("active");
  } else {
    selectedTags.push(tag);
    el.classList.add("active");
  }

  updateHiddenTags();
}

// update hidden input for Supabase
function updateHiddenTags() {
  const input = document.getElementById("tags");
  if (!input) return;

  input.value = JSON.stringify(selectedTags);
}

// add new tag manually
document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.getElementById("addTagBtn");
  const input = document.getElementById("newTagInput");

  if (addBtn && input) {

    addBtn.addEventListener("click", () => {

      const tag = input.value.trim();
      if (!tag) return;

      if (!selectedTags.includes(tag)) {
        selectedTags.push(tag);
      }

      input.value = "";

      updateHiddenTags();

      // re-render to include new tag in list
      renderTagOptions(window.articles || []);

    });

  }

});
// ------------------------------------
// NEW ARTICLE
// ------------------------------------

document
.getElementById("new-article")
.addEventListener(
"click",
function(){

    console.log("NEW ARTICLE CLICKED");

currentArticle = null;

document.getElementById("title").value = "";

document.getElementById("category").value = "";

document.getElementById("excerpt").value = "";

document.getElementById("body").value = "";

document.getElementById("image").value = "";

document.getElementById("credits").value = "";


document.getElementById("publishing-date").value = "";

document.getElementById("publishing-location").value = "";

document.getElementById("publisher").value = "";


document.getElementById("infos").value = "";

document.getElementById("object-material").value = "";

document.getElementById("object-technique").value = "";

document.getElementById("sources").value = "";

document.getElementById("image-info").value = "";


document.getElementById("title").focus();

});

// START



loadArticles();


// ==============================
// LOAD PUBLIC DIALOGUE COMMENTS
// ==============================

async function loadEditorComments(){


const response = await fetch(
"https://cave-api.manuelbischof-phil.workers.dev/api/contributions"
);


const comments = await response.json();



const container =
document.getElementById(
"editorComments"
);



container.innerHTML = "";



comments.forEach(comment=>{


container.innerHTML += `

<div class="editor-comment">


<strong>
${comment.author}
</strong>


<p>
${comment.content}
</p>


<small>
${comment.created_at}
</small>


<button onclick="deleteComment(${comment.id})">
Delete
</button>


</div>

`;


});


}



// ==============================
// DELETE COMMENT
// ==============================

async function deleteComment(id){


const confirmDelete =
confirm(
"Delete this contribution?"
);



if(!confirmDelete){

return;

}



await fetch(

`https://cave-api.manuelbischof-phil.workers.dev/api/contributions/${id}`,

{

method:"DELETE"

}

);



loadEditorComments();


}



// start

loadEditorComments();

document
    .querySelector(".save-button")
    .addEventListener("click", saveArticle);
    
