const API_URL =
"https://cave-api.manuelbischof-phil.workers.dev";



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


const articleTitle =
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
!articleTitle ||
!comment
){

alert(
"Please enter an article and comment"
);

return;

}



await fetch(
`${API_URL}/api/contributions`,
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

article_id: articleTitle,

parent_id:null,

author:name || "Anonymous",

content:comment

})

}

);



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


const response =
await fetch(
`${API_URL}/api/contributions`
);


const comments =
await response.json();



const container =
document.getElementById(
"publicDialogue"
);



const list =
document.createElement("div");

list.id = "dialogueList";


comments.forEach(comment=>{


list.innerHTML += `

<div class="dialogue-comment">


<strong>
${comment.author} on ${comment.article_id}
</strong>


<p>
${comment.content}
</p>


<small>
Archive dialogue · ${comment.created_at}
</small>


</div>

`;


});



container.prepend(list);


}


loadDialogue();
