let articles = [];

async function loadArticles() {
    const response = await fetch(
        "https://cave-api.manuelbischof-phil.workers.dev/api/articles"
    );

    articles = await response.json();

    console.log(articles);

    displayArticles();
}


function displayArticles() {

    const container = document.getElementById("articles");

    if (!container) return;

    container.innerHTML = "";

    articles.forEach(article => {

        container.innerHTML += `
            <article>

                <img src="${article.image || ''}">

                <h2>${article.title}</h2>

                <p>${article.excerpt || ''}</p>

                <div>
                    ${article.content}
                </div>

            </article>
        `;

    });

}


loadArticles();
