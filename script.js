// 1. Columns
const columns = [
  document.getElementById("column1"),
  document.getElementById("column2"),
  document.getElementById("column3")
];


// 2. Shuffle function

function shuffle(array){
  return [...array].sort(() => Math.random() - 0.5);
}


// 3. Create cards

function createCard(article){

  const card = document.createElement("div");

  card.className = "card";

  card.innerHTML = `
    <img src="${article.image}">
    <small>${article.category}</small>
    <h4>${article.title}</h4>
    <p>${article.excerpt}</p>
  `;

  card.addEventListener("click", () => {
    openArticle(article);
  });

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
