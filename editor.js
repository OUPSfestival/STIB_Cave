
async function checkLogin(){

    const { data } = await supabaseClient.auth.getSession();

    if (!data.session) {
        window.location.href = "login.html";
        return;
    }

    console.log("Logged in:", data.session.user.email);

}

checkLogin();




let articles = [];

let currentArticle = null;

let selectedTags = [];

let allTags = [];

let quill = new Quill("#body", {
    theme: "snow",

    modules: {
        toolbar: [
            ["bold", "italic", "underline"],
            [{ color: [] }],
            [{ header: [1, 2, 3, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"]
        ]
    }
});

quill.clipboard.addMatcher(Node.TEXT_NODE, function(node, delta) {
    const text = node.data;
    if (text.includes("\n")) {
        const lines = text.split("\n");
        delta.ops = lines.map((line, index) => ({
            insert: line + (index < lines.length - 1 ? "\n" : "")
        }));
    }
    return delta;
});

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

    buildTagLibrary();

    renderArticleList();
    renderCategoryOptions(articles);
    renderTagList();

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

    console.log("OPEN ARTICLE START");

    currentArticle = article;
    selectedTags = [...(article.tags || [])];
    renderTagList();
       
    
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



    let content = article.body || "";

content = content.replace(/\n/g, "</p><p>");

quill.root.innerHTML = "<p>" + content + "</p>";


    document
    .getElementById("image")
    .value =
    article.image || "";



   



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

    

    // TAGS (load existing article tags into editor state)
    console.log("article.tags =", article.tags);
console.log("typeof =", typeof article.tags);

if (Array.isArray(article.tags)) {

    selectedTags = article.tags;

} else if (typeof article.tags === "string") {

    try {
        selectedTags = JSON.parse(article.tags);
    } catch {
        selectedTags = article.tags.split(",");
    }

} else {

    selectedTags = [];

}

console.log("selectedTags =", selectedTags);

    updatePreview(article.image);

    console.log("OPEN ARTICLE END");

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
        body: quill.root.innerHTML,
        tags: selectedTags,
        image: document.getElementById("image").value,

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
// categorey options
// =========================



function renderCategoryOptions(articles){

    const select = document.getElementById("category");

    if(!select) return;

    const categories = [
        ...new Set(
            (articles || [])
                .map(article => article.category)
                .filter(Boolean)
        )
    ].sort();

    select.innerHTML = `<option value="">Select category...</option>`;

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        select.appendChild(option);

    });

}

// =========================
// TAG SYSTEM
// =========================

function buildTagLibrary() {

    allTags = [];

    articles.forEach(article => {

        if (!Array.isArray(article.tags)) return;

        article.tags.forEach(tag => {

            if (!allTags.includes(tag)) {

                allTags.push(tag);

            }

        });

    });

    allTags.sort();

    console.log("allTags:", allTags);

}

function renderTagList() {

    const container = document.getElementById("tagContainer");

    container.innerHTML = "";

    allTags.forEach(tag => {

        const wrapper = document.createElement("span");

        wrapper.className = "tag-option";


        if (selectedTags.includes(tag)) {

            wrapper.classList.add("active");

        }


        const text = document.createElement("span");

        text.textContent = tag;


        text.onclick = function(){

            toggleTag(tag);

        };


        const deleteBtn = document.createElement("button");

        deleteBtn.type = "button";

        deleteBtn.textContent = "X";

        deleteBtn.onclick = function(e){

            e.stopPropagation();

            deleteTag(tag);

        };


        wrapper.appendChild(text);

        wrapper.appendChild(deleteBtn);


        container.appendChild(wrapper);

    });

}

function toggleTag(tag) {

    if (selectedTags.includes(tag)) {

        selectedTags = selectedTags.filter(t => t !== tag);

    } else {

        selectedTags.push(tag);

    }

    renderTagList();

}

async function deleteTag(tag) {

    const confirmDelete = confirm(
        "Delete tag '" + tag + "' from all articles?"
    );

    if (!confirmDelete) return;


    for (const article of articles) {

        if (Array.isArray(article.tags) && article.tags.includes(tag)) {

            const newTags = article.tags.filter(t => t !== tag);


            await supabaseClient
                .from("articles")
                .update({
                    tags: newTags
                })
                .eq("id", article.id);

        }

    }


    allTags = allTags.filter(t => t !== tag);

    selectedTags = selectedTags.filter(t => t !== tag);


    renderTagList();


    await loadArticles();

}






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

selectedTags = [];

renderTagList();




document.getElementById("title").value = "";

document.getElementById("category").value = "";

document.getElementById("excerpt").value = "";

quill.setContents([]);

document.getElementById("image").value = "";


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


// =========================
// ADD NEW TAG
// =========================

document
.getElementById("addTagBtn")
.addEventListener("click", function(){

    const input = document.getElementById("newTagInput");

    const tag = input.value.trim();

    if (!tag) return;


    if (!allTags.includes(tag)) {

        allTags.push(tag);

        allTags.sort();

    }


    if (!selectedTags.includes(tag)) {

        selectedTags.push(tag);

    }


    input.value = "";

    renderTagList();

});



// ==============================
// LOAD EDITOR COMMENTS
// ==============================

async function loadEditorComments(){

    const {data:comments,error} =
    await supabaseClient
    .from("comments")
    .select(`
        *,
        articles(
            title
        )
    `)
    .order(
        "created_at",
        {
            ascending:false
        }
    );


    if(error){
        console.error(error);
        return;
    }


    // Find parent comments for replies

    const parentIds =
    comments
    .filter(comment => comment.parent_id)
    .map(comment => comment.parent_id);



    let parents = [];


    if(parentIds.length){

        const {data,error} =
        await supabaseClient
        .from("comments")
        .select(`
            id,
            author,
            articles(
                title
            )
        `)
        .in(
            "id",
            parentIds
        );


        if(error){
            console.error(error);
        }


        parents = data || [];

    }



    const container =
    document.getElementById(
        "editorComments"
    );



    container.innerHTML =
    comments.map(comment=>{


        const parent =
        parents.find(
            p => p.id === comment.parent_id
        );


        return `

        <div class="editor-comment">


            <strong>
                ${comment.author}
            </strong>


            ${
            parent
            ?
            `
            <small>
                Replying to ${parent.author}
                on ${parent.articles?.title || ""}
            </small>
            `
            :
            `
            <small>
                ${comment.articles?.title || ""}
            </small>
            `
            }


            <p>
                ${comment.content}
            </p>


            <small>
                ${comment.created_at}
            </small>


            <br>


            <button onclick="deleteComment(${comment.id})">
                Delete
            </button>


        </div>

        `;


    }).join("");

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


    const {error} =
    await supabaseClient
    .from("comments")
    .delete()
    .eq(
        "id",
        id
    );


    if(error){

        console.error(error);
        alert("Delete failed");
        return;

    }


    loadEditorComments();

}



// start

loadEditorComments();


document
    .querySelector(".save-button")
    .addEventListener("click", saveArticle);



    
