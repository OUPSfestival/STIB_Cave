const editor = document.getElementById("editor");


cards.forEach((card,index)=>{

editor.innerHTML += `

<div class="position-card">

<label>
Category
</label>

<input 
value="${card.category}"
onchange="updateCard(${index},'category',this.value)"
>


<label>
Title
</label>

<input 
value="${card.title}"
onchange="updateCard(${index},'title',this.value)"
>


<label>
Image
</label>

<input 
value="${card.image}"
onchange="updateCard(${index},'image',this.value)"
>


<label>
Description
</label>

<textarea
onchange="updateCard(${index},'description',this.value)"
>${card.description}</textarea>


</div>

`;

});


function updateCard(index,key,value){

cards[index][key]=value;

console.log(cards);

}
