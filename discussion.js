document.addEventListener(
"DOMContentLoaded",
()=>{


const button =
document.getElementById(
"submitDialogue"
);



button.addEventListener(
"click",
async ()=>{


const articleId =
document.getElementById(
"dialogueArticle"
).value;



const name =
document.getElementById(
"dialogueName"
).value;



const comment =
document.getElementById(
"dialogueComment"
).value;



if(
!articleId ||
!comment
){

alert(
"Please enter an article and comment"
);

return;

}



const {data,error} =
await supabaseClient
.from("comments")
.insert({

    article_id:articleId,

    parent_id:null,

    author:name || "Anonymous",

    content:comment

});


if(error){

console.error(error);

alert("Could not publish comment");

return;

}



alert(
"Comment published"
);



document.getElementById(
"dialogueComment"
).value="";


});


});
// ==============================
// LOAD PUBLIC DIALOGUE
// ==============================

async function loadDialogue(){


const {data:comments,error} =
await supabaseClient
.from("comments")
.select(`
    *,
    articles (
        title
    )
`)
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
"publicDialogue"
);



const list =
document.createElement("div");

list.id = "dialogueList";


// only main comments

const mainComments =
comments.filter(comment => 
comment.parent_id === null
);



mainComments.forEach(comment=>{


const replies =
comments.filter(reply =>
reply.parent_id === comment.id
);



list.innerHTML += `

<div class="dialogue-comment" data-id="${comment.id}">


<strong>
${comment.author} on 
<span class="comment-article-title">
${comment.articles.title}
</span>
</strong>


<p>
${comment.content}
</p>


<small>
${comment.created_at}
</small>


<button 
class="reply-button"
onclick="openReply(${comment.id})">

Reply

</button>


<div 
id="reply-${comment.id}"
class="reply-box">
</div>



<div class="replies">


${

replies.map(reply => `

<div class="reply-comment">


<strong>
${reply.author}
</strong>


<p>
${reply.content}
</p>


<small>
${reply.created_at}
</small>


</div>

`).join("")

}


</div>


</div>

`;



});



container.appendChild(list);

}


loadDialogue();


// ==============================
// OPEN REPLY BOX
// ==============================

function openReply(id){


const box =
document.getElementById(
"reply-" + id
);



box.innerHTML = `

<input 
id="replyName-${id}"
placeholder="Your name"
>


<textarea
id="replyText-${id}"
placeholder="Your reply"
></textarea>


<button onclick="sendReply(${id})">
Publish reply
</button>

`;

}


// ==============================
// SEND REPLY
// ==============================

async function sendReply(parentID){


const name =
document.getElementById(
"replyName-" + parentID
).value;



const text =
document.getElementById(
"replyText-" + parentID
).value;



if(!text){

alert(
"Write a reply"
);

return;

}



const {data,error} =
await supabaseClient
.from("comments")
.insert({

    article_id: 1,

    parent_id: parentID,

    author: name || "Anonymous",

    content: text

});


if(error){

    console.error(error);

    alert("Could not publish reply");

    return;

}



alert(
"Reply published"
);



location.reload();


}

window.openReply = openReply;
window.sendReply = sendReply;



async function loadArticles(){

    const {data,error} =
    await supabaseClient
    .from("articles")
    .select("id,title")
    .order("title");


    if(error){

        console.error(error);
        return;

    }


    const select =
    document.getElementById(
        "dialogueArticle"
    );


    data.forEach(article=>{

        select.innerHTML += `

        <option value="${article.id}">
            ${article.title}
        </option>

        `;

    });


}


loadArticles();
