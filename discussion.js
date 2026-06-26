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

<div class="dialogue-comment" data-id="${comment.id}">


<strong>
${comment.author} on ${comment.article_id}
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



await fetch(
`${API_URL}/api/contributions`,
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

article_id:"",

parent_id:parentID,

author:name || "Anonymous",

content:text

})

}

);



alert(
"Reply published"
);



location.reload();


}

window.openReply = openReply;
window.sendReply = sendReply;
