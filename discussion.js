const API_URL = "https://cave-api.manuelbischof-phil.workers.dev";

let currentArticleId = null;

// ======================
// Load discussion
// ======================

async function loadDiscussion(articleId) {

    currentArticleId = articleId;

    const response = await fetch(
        `${API_URL}/api/contributions/${articleId}`
    );

    const discussion = await response.json();

    renderDiscussion(discussion);

}

// ======================
// Render discussion
// ======================

function renderDiscussion(items) {

    const container = document.getElementById("discussionList");

    container.innerHTML = "";

    if (items.length === 0) {

        container.innerHTML = `
            <p>No public dialogue yet.</p>
        `;

        return;

    }

    items.forEach(item => {

        // Only show top-level contributions for now
        if (item.parent_id !== null) return;

        const entry = document.createElement("div");

        entry.className = "discussion-item";

        entry.innerHTML = `

            <strong>${item.author}</strong>

            <p>${item.content}</p>

            <small>${item.created_at}</small>

            <hr>

        `;

        container.appendChild(entry);

    });

}

// ======================
// Submit new contribution
// ======================

async function submitDiscussion() {

    if (currentArticleId === null) return;

    const author = document
        .getElementById("discussionAuthor")
        .value
        .trim();

    const content = document
        .getElementById("discussionContent")
        .value
        .trim();

    if (!content) {

        alert("Please enter a contribution.");

        return;

    }

    await fetch(`${API_URL}/api/contributions`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            article_id: currentArticleId,

            parent_id: null,

            author: author || "Anonymous",

            content: content

        })

    });

    document.getElementById("discussionContent").value = "";

    loadDiscussion(currentArticleId);

}

// ======================
// Button
// ======================

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("submitDiscussion")
        .addEventListener("click", submitDiscussion);

});
