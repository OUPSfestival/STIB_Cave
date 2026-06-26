let articles = [];

const API =
"https://cave-api.manuelbischof-phil.workers.dev/api/articles";


async function loadArticles(){

    try{

        const response = await fetch(API);

        const data = await response.json();


        articles = data.map(article => ({

            id: article.id,

            title: article.title || "",

            category: article.category || "",

            image: article.image || "",

            credits: article.credits || "",

            excerpt: article.excerpt || "",

            body: article.content || "",

            tags: article.tags
                ? JSON.parse(article.tags)
                : []

        }));


        populateRandom();


    }
    catch(error){

        console.error(
            "ARTICLE LOAD ERROR:",
            error
        );

    }

}


loadArticles();
