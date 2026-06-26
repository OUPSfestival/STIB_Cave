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
