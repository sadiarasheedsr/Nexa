/* =========================================================
   NEXA - SOCIAL NETWORK JAVASCRIPT
   ========================================================= */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector)
];


/* =========================================================
   APP STATE
   ========================================================= */

const state = {

    liked: new Set(),

    friendRequests: new Set(),

    currentStory: 0,

    stories: [
        "Sadia",
        "Ayesha",
        "Hamza",
        "Mariam",
        "Ali"
    ],

    posts: [

        {
            id: 1,
            name: "Ayesha Khan",
            handle: "@ayesha",
            time: "12 min ago",
            avatar: "A",
            avatarClass: "pink",
            text: "Just finished my new UI design! ✨ What do you think?",
            media: null,
            likes: 24,
            comments: [
                {
                    name: "Sadia",
                    text: "Looks amazing! 🔥"
                }
            ]
        },

        {
            id: 2,
            name: "Hamza Ali",
            handle: "@hamza",
            time: "1 hr ago",
            avatar: "H",
            avatarClass: "blue",
            text: "Beautiful evening. Sometimes the simple moments are the best ones. 🌅",
            media: "sunset",
            likes: 48,
            comments: []
        },

        {
            id: 3,
            name: "Mariam Noor",
            handle: "@mariam",
            time: "2 hrs ago",
            avatar: "M",
            avatarClass: "purple",
            text: "Working on a new website today! 💻✨ Loving how the design is coming together.",
            media: "design",
            likes: 67,
            comments: [
                {
                    name: "Ayesha",
                    text: "Can't wait to see it! 😍"
                }
            ]
        },

        {
            id: 4,
            name: "Ali Raza",
            handle: "@ali",
            time: "3 hrs ago",
            avatar: "A",
            avatarClass: "blue",
            text: "Coffee + coding = the perfect combination ☕💻",
            media: "coffee",
            likes: 35,
            comments: [
                {
                    name: "Hamza",
                    text: "Absolutely! 😂"
                }
            ]
        },

        {
            id: 5,
            name: "Sara Ahmed",
            handle: "@sara",
            time: "4 hrs ago",
            avatar: "S",
            avatarClass: "pink",
            text: "Don't compare your journey with someone else's. Keep learning and keep growing. 🌱💙",
            media: null,
            likes: 91,
            comments: [
                {
                    name: "Mariam",
                    text: "Needed to hear this today ❤️"
                }
            ]
        },

        {
            id: 6,
            name: "Usman Malik",
            handle: "@usman",
            time: "5 hrs ago",
            avatar: "U",
            avatarClass: "blue",
            text: "Finally completed my JavaScript project! 🎉 It took a lot of debugging, but it was totally worth it.",
            media: "coding",
            likes: 53,
            comments: [
                {
                    name: "Sadia",
                    text: "Congratulations! 🎉"
                }
            ]
        },

        {
            id: 7,
            name: "Noor Fatima",
            handle: "@noor",
            time: "6 hrs ago",
            avatar: "N",
            avatarClass: "purple",
            text: "Weekend walks, fresh air and a peaceful mind. 🌿✨",
            media: "nature",
            likes: 76,
            comments: []
        },

        {
            id: 8,
            name: "Daniyal Ahmed",
            handle: "@daniyal",
            time: "8 hrs ago",
            avatar: "D",
            avatarClass: "blue",
            text: "Learning something new every single day. Today: CSS animations and smooth transitions! 🚀",
            media: null,
            likes: 42,
            comments: [
                {
                    name: "Ayesha",
                    text: "CSS animations are so fun! 🔥"
                }
            ]
        },

        {
            id: 9,
            name: "Hira Shah",
            handle: "@hira",
            time: "10 hrs ago",
            avatar: "H",
            avatarClass: "pink",
            text: "Captured a beautiful moment today. 📸 Sometimes you just need to stop and enjoy the view.",
            media: "camera",
            likes: 108,
            comments: [
                {
                    name: "Mariam",
                    text: "Beautiful! 😍"
                }
            ]
        },

        {
            id: 10,
            name: "Bilal Khan",
            handle: "@bilal",
            time: "12 hrs ago",
            avatar: "B",
            avatarClass: "blue",
            text: "Good things take time. Keep building, keep learning and don't give up. 💙⚡",
            media: null,
            likes: 64,
            comments: [
                {
                    name: "Sadia",
                    text: "Well said! 💙"
                }
            ]
        }

    ]

};


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const postsEl = $("#posts");
const modal = $("#composerModal");
const storyModal = $("#storyModal");
const toast = $("#toast");


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value).replace(
        /[&<>"']/g,
        character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[character])
    );

}


/* =========================================================
   POST MEDIA
   ========================================================= */

function createPostMedia(media) {

    if (!media) {
        return "";
    }

    if (media.startsWith("data:image")) {

        return `
            <img
                class="post-media"
                src="${media}"
                alt="Shared photo"
            >
        `;
    }


    if (media.startsWith("data:video")) {

        return `
            <video
                class="post-media video"
                src="${media}"
                controls
                playsinline
            ></video>
        `;
    }


    const mediaData = {

        sunset: {
            emoji: "🌅",
            className: "post-sunset"
        },

        design: {
            emoji: "🎨",
            className: "post-design"
        },

        coffee: {
            emoji: "☕",
            className: "post-coffee"
        },

        coding: {
            emoji: "💻",
            className: "post-coding"
        },

        nature: {
            emoji: "🌿",
            className: "post-nature"
        },

        camera: {
            emoji: "📸",
            className: "post-camera"
        }

    };


    if (mediaData[media]) {

        return `
            <div class="post-media demo-media ${mediaData[media].className}">
                ${mediaData[media].emoji}
            </div>
        `;
    }


    return "";
}


/* =========================================================
   RENDER POSTS
   ========================================================= */

function renderPosts(list = state.posts) {

    if (!postsEl) {
        console.error("ERROR: #posts element not found.");
        return;
    }


    postsEl.innerHTML = "";


    if (!list.length) {

        postsEl.innerHTML = `
            <div class="simple-card">
                <h3>No posts found</h3>
                <p style="color:var(--muted);margin-top:6px;">
                    Try searching for another person or topic.
                </p>
            </div>
        `;

        return;
    }


    list.forEach(post => {

        const liked = state.liked.has(post.id);


        const commentsHTML = post.comments
            .map(comment => {

                return `
                    <div class="comment">

                        <span
                            class="avatar yellow"
                            style="
                                width:30px;
                                height:30px;
                                font-size:10px;
                            "
                        >
                            ${escapeHTML(comment.name.charAt(0))}
                        </span>

                        <div class="comment-bubble">
                            <strong>
                                ${escapeHTML(comment.name)}
                            </strong>

                            ${escapeHTML(comment.text)}
                        </div>

                    </div>
                `;

            })
            .join("");


        const article = document.createElement("article");

        article.className = "post";

        article.dataset.id = post.id;


        article.innerHTML = `

            <div class="post-head">

                <span class="avatar ${post.avatarClass}">
                    ${escapeHTML(post.avatar)}
                </span>

                <div class="meta">

                    <strong>
                        ${escapeHTML(post.name)}
                    </strong>

                    <span>
                        ${escapeHTML(post.handle)}
                        ·
                        ${escapeHTML(post.time)}
                    </span>

                </div>

                <button
                    class="more"
                    type="button"
                >
                    •••
                </button>

            </div>


            <p class="post-text">
                ${escapeHTML(post.text)}
            </p>


            ${createPostMedia(post.media)}


            <div class="post-actions">

                <button
                    type="button"
                    class="${liked ? "liked" : ""}"
                    data-action="like"
                >
                    ♥ ${post.likes + (liked ? 1 : 0)}
                </button>


                <button
                    type="button"
                    data-action="comment"
                >
                    💬 ${post.comments.length}
                </button>


                <button
                    type="button"
                    data-action="share"
                >
                    ↗ Share
                </button>

            </div>


            <div class="comments">

                ${commentsHTML}


                <form class="comment-form">

                    <input
                        type="text"
                        name="comment"
                        placeholder="Write a comment..."
                        aria-label="Write a comment"
                    >

                    <button type="submit">
                        ➤
                    </button>

                </form>

            </div>

        `;


        postsEl.appendChild(article);

    });

}


/* =========================================================
   MODALS
   ========================================================= */

function openModal() {

    if (!modal) return;

    modal.classList.remove("hidden");

    const textArea = $("#postText");

    if (textArea) {
        textArea.focus();
    }

}


function closeModals() {

    $$(".modal").forEach(modalElement => {
        modalElement.classList.add("hidden");
    });

}


/* =========================================================
   COMPOSER
   ========================================================= */

const openComposerButton = $("#openComposer");

if (openComposerButton) {

    openComposerButton.addEventListener(
        "click",
        openModal
    );

}


$$("[data-close]").forEach(button => {

    button.addEventListener(
        "click",
        closeModals
    );

});


if (modal) {

    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal) {
                closeModals();
            }

        }
    );

}


if (storyModal) {

    storyModal.addEventListener(
        "click",
        event => {

            if (event.target === storyModal) {
                closeModals();
            }

        }
    );

}


/* =========================================================
   READ IMAGE / VIDEO
   ========================================================= */

function readMedia(file) {

    return new Promise((resolve, reject) => {

        if (!file) {

            resolve(null);
            return;
        }


        const reader = new FileReader();


        reader.onload = () => {
            resolve(reader.result);
        };


        reader.onerror = reject;


        reader.readAsDataURL(file);

    });

}


/* =========================================================
   IMAGE INPUT
   ========================================================= */

const imageInput = $("#imageInput");

if (imageInput) {

    imageInput.addEventListener(
        "change",
        async event => {

            const file = event.target.files[0];

            if (!file) return;


            const data = await readMedia(file);

            const preview = $("#uploadPreview");

            if (!preview) return;


            preview.innerHTML = `
                <img
                    src="${data}"
                    alt="Selected image"
                >
            `;


            preview.dataset.media = data;

        }
    );

}


/* =========================================================
   VIDEO INPUT
   ========================================================= */

const videoInput = $("#videoInput");

if (videoInput) {

    videoInput.addEventListener(
        "change",
        async event => {

            const file = event.target.files[0];

            if (!file) return;


            const data = await readMedia(file);

            const preview = $("#uploadPreview");

            if (!preview) return;


            preview.innerHTML = `
                <video
                    src="${data}"
                    controls
                ></video>
            `;


            preview.dataset.media = data;

        }
    );

}


/* =========================================================
   PUBLISH POST
   ========================================================= */

const publishPostButton = $("#publishPost");

if (publishPostButton) {

    publishPostButton.addEventListener(
        "click",
        () => {

            const textInput = $("#postText");
            const uploadPreview = $("#uploadPreview");


            const text =
                textInput
                ? textInput.value.trim()
                : "";


            const media =
                uploadPreview?.dataset.media || null;


            if (!text && !media) {

                showToast(
                    "Write something or add media first."
                );

                return;
            }


            const newPost = {

                id: Date.now(),

                name: "Sadia Rasheed",

                handle: "@sadia",

                time: "Just now",

                avatar: "S",

                avatarClass: "yellow",

                text:
                    text ||
                    "Shared a new moment ⚡",

                media: media,

                likes: 0,

                comments: []

            };


            state.posts.unshift(newPost);


            if (textInput) {
                textInput.value = "";
            }


            if (uploadPreview) {

                uploadPreview.innerHTML = "";

                uploadPreview.dataset.media = "";

            }


            closeModals();


            renderPosts();


            showToast(
                "Your post is live!"
            );

        }
    );

}


/* =========================================================
   POST BUTTONS
   ========================================================= */

if (postsEl) {

    postsEl.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest("[data-action]");


            if (!button) return;


            const article =
                button.closest(".post");


            if (!article) return;


            const id =
                Number(article.dataset.id);


            const post =
                state.posts.find(
                    item => item.id === id
                );


            if (!post) return;


            const action =
                button.dataset.action;


            /* LIKE */

            if (action === "like") {

                if (state.liked.has(id)) {

                    state.liked.delete(id);

                } else {

                    state.liked.add(id);

                }


                renderPosts();

            }


            /* COMMENT */

            if (action === "comment") {

                const input =
                    article.querySelector(
                        'input[name="comment"]'
                    );


                if (input) {
                    input.focus();
                }

            }


            /* SHARE */

            if (action === "share") {

                if (navigator.clipboard) {

                    navigator.clipboard
                        .writeText(location.href)
                        .catch(() => {});

                }


                showToast(
                    "Post link copied!"
                );

            }

        }
    );


    /* =====================================================
       COMMENTS
       ===================================================== */

    postsEl.addEventListener(
        "submit",
        event => {

            if (
                !event.target.matches(
                    ".comment-form"
                )
            ) {
                return;
            }


            event.preventDefault();


            const article =
                event.target.closest(".post");


            if (!article) return;


            const id =
                Number(article.dataset.id);


            const post =
                state.posts.find(
                    item => item.id === id
                );


            if (!post) return;


            const input =
                event.target.querySelector(
                    'input[name="comment"]'
                );


            if (!input) return;


            const text =
                input.value.trim();


            if (!text) return;


            post.comments.push({

                name: "Sadia",

                text: text

            });


            renderPosts();


            showToast(
                "Comment added"
            );

        }
    );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function showView(name) {

    const views = {

        home: ".home-view",

        friends: "#friendsView",

        notifications: "#notificationsView",

        profile: "#profileView",

        messages: "#messagesView",

        settings: "#settingsView"

    };


    $$(".view").forEach(view => {

        view.classList.add("hidden");

    });


    const selectedView =
        $(views[name]);


    if (selectedView) {

        selectedView.classList.remove(
            "hidden"
        );

    }


    $$(".side-link, .icon-btn").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.view === name
        );

    });


    if (name === "friends") {
        renderFriends();
    }


    if (name === "notifications") {
        renderNotifications();
    }


    if (name === "profile") {
        renderProfile();
    }


    if (name === "messages") {
        renderMessages();
    }


    if (name === "settings") {
        renderSettings();
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


$$("[data-view]").forEach(button => {

    button.addEventListener(
        "click",
        () => showView(button.dataset.view)
    );

});


/* =========================================================
   FRIENDS
   ========================================================= */

function renderFriends() {

    const view = $("#friendsView");

    if (!view) return;


    const friends = [

        "Ayesha Khan",
        "Hamza Ali",
        "Mariam Noor",
        "Ali Raza"

    ];


    const colors = [
        "pink",
        "blue",
        "purple",
        "yellow"
    ];


    view.innerHTML = `

        <h1 class="view-title">
            Friends
        </h1>

        <div class="simple-card">

            ${friends.map((name, index) => `

                <div class="friend-row">

                    <span
                        class="avatar ${colors[index]}"
                    >
                        ${name.charAt(0)}
                    </span>

                    <div>

                        <strong>
                            ${name}
                        </strong>

                        <small>
                            ${index + 2}
                            mutual friends · Online
                        </small>

                    </div>

                    <button
                        class="outline-btn"
                    >
                        Friends
                    </button>

                </div>

            `).join("")}

        </div>

    `;

}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function renderNotifications() {

    const view =
        $("#notificationsView");


    if (!view) return;


    view.innerHTML = `

        <h1 class="view-title">
            Notifications
        </h1>

        <div class="simple-card">

            <div class="notification-row">

                <span class="avatar pink">
                    A
                </span>

                <div>

                    <strong>
                        Ayesha liked your post
                    </strong>

                    <small>
                        2 minutes ago
                    </small>

                </div>

                ♥
            </div>


            <div class="notification-row">

                <span class="avatar blue">
                    H
                </span>

                <div>

                    <strong>
                        Hamza commented on your post
                    </strong>

                    <small>
                        18 minutes ago
                    </small>

                </div>

                💬
            </div>


            <div class="notification-row">

                <span class="avatar purple">
                    M
                </span>

                <div>

                    <strong>
                        Mariam sent you a friend request
                    </strong>

                    <small>
                        1 hour ago
                    </small>

                </div>

                👥
            </div>

        </div>

    `;


    const count =
        $("#notificationCount");


    if (count) {
        count.textContent = "0";
    }

}


/* =========================================================
   PROFILE
   ========================================================= */

function renderProfile() {

    const view = $("#profileView");

    if (!view) return;


    view.innerHTML = `

        <div class="profile-hero">

            <div class="profile-hero-cover"></div>

            <div class="profile-hero-info">

                <span class="avatar yellow large">
                    S
                </span>

                <div>

                    <h1>
                        Sadia Rasheed
                    </h1>

                    <p>
                        @sadia · Frontend Developer & UI Designer
                    </p>

                </div>

                <button
                    class="primary-btn"
                    style="margin-left:auto"
                >
                    Edit Profile
                </button>

            </div>

        </div>


        <div class="simple-card">

            <h3>
                About
            </h3>

            <p
                style="
                    font-size:13px;
                    color:var(--muted);
                    margin-top:8px;
                "
            >
                Building beautiful web experiences,
                learning new things and sharing moments
                with friends.
            </p>

        </div>

    `;

}


/* =========================================================
   MESSAGES
   ========================================================= */

function renderMessages() {

    const view =
        $("#messagesView");


    if (!view) return;


    view.innerHTML = `

        <h1 class="view-title">
            Messages
        </h1>

        <div class="simple-card">

            <div class="message-list">

                <div class="message">
                    Hey Sadia! Have you seen the new features? ⚡
                </div>

                <div class="message mine">
                    Yes! I love the new design 😄
                </div>

                <div class="message">
                    Let's build something cool together.
                </div>

            </div>


            <form class="chat-input">

                <input
                    placeholder="Type a message..."
                >

                <button class="primary-btn">
                    Send
                </button>

            </form>

        </div>

    `;


    const chat =
        $(".chat-input");


    if (!chat) return;


    chat.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const input =
                chat.querySelector("input");


            if (!input) return;


            const text =
                input.value.trim();


            if (!text) return;


            const message =
                document.createElement("div");


            message.className =
                "message mine";


            message.textContent =
                text;


            const list =
                $(".message-list");


            if (list) {
                list.appendChild(message);
            }


            input.value = "";

        }
    );

}


/* =========================================================
   SETTINGS
   ========================================================= */

function renderSettings() {

    const view =
        $("#settingsView");


    if (!view) return;


    const settings = [

        "Private account",

        "Notifications",

        "Show online status",

        "Allow friend requests"

    ];


    view.innerHTML = `

        <h1 class="view-title">
            Settings & Privacy
        </h1>

        <div class="simple-card">

            ${settings.map((setting, index) => `

                <div class="setting">

                    <div>

                        <strong>
                            ${setting}
                        </strong>

                        <small>
                            ${
                                index === 0
                                ? "Only friends can see your posts."
                                : "Manage your Nexa experience."
                            }
                        </small>

                    </div>


                    <button
                        class="toggle ${
                            index !== 0 ? "on" : ""
                        }"
                    ></button>

                </div>

            `).join("")}

        </div>

    `;


    $$(".toggle", view).forEach(toggle => {

        toggle.addEventListener(
            "click",
            () => {

                toggle.classList.toggle("on");

            }
        );

    });

}


/* =========================================================
   FRIEND REQUEST BUTTONS
   ========================================================= */

$$(".add-friend").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const name =
                button.dataset.name;


            if (!name) return;


            if (
                state.friendRequests.has(name)
            ) {

                state.friendRequests.delete(name);

                button.textContent = "+";

                showToast(
                    "Friend request cancelled"
                );

            } else {

                state.friendRequests.add(name);

                button.textContent = "✓";

                showToast(
                    `Friend request sent to ${name}`
                );

            }

        }
    );

});


/* =========================================================
   STORIES
   ========================================================= */

function openStory(index) {

    if (!storyModal) return;


    state.currentStory =
        (
            index +
            state.stories.length
        ) %
        state.stories.length;


    const name =
        state.stories[state.currentStory];


    const storyName =
        $("#storyName");


    const storyContent =
        $("#storyContent");


    if (storyName) {
        storyName.textContent = name;
    }


    if (storyContent) {

        storyContent.textContent =
            name === "Sadia"
            ? "⚡"
            : ["Ayesha", "Hamza", "Mariam", "Ali"]
                .includes(name)
                ? "✨"
                : "⚡";

    }


    storyModal.classList.remove(
        "hidden"
    );

}


$$("[data-story]").forEach(
    (story, index) => {

        story.addEventListener(
            "click",
            () => openStory(index)
        );

    }
);


const previousStory =
    $("#prevStory");


if (previousStory) {

    previousStory.addEventListener(
        "click",
        () =>
            openStory(
                state.currentStory - 1
            )
    );

}


const nextStory =
    $("#nextStory");


if (nextStory) {

    nextStory.addEventListener(
        "click",
        () =>
            openStory(
                state.currentStory + 1
            )
    );

}


const viewStories =
    $("#viewStories");


if (viewStories) {

    viewStories.addEventListener(
        "click",
        () => openStory(0)
    );

}


const createStory =
    $("#createStory");


if (createStory) {

    createStory.addEventListener(
        "click",
        () => openStory(0)
    );

}


/* =========================================================
   PHOTO / VIDEO / FEELING BUTTONS
   ========================================================= */

const photoBtn =
    $("#photoBtn");


if (photoBtn) {

    photoBtn.addEventListener(
        "click",
        () => {

            openModal();


            if (imageInput) {
                imageInput.click();
            }

        }
    );

}


const videoBtn =
    $("#videoBtn");


if (videoBtn) {

    videoBtn.addEventListener(
        "click",
        () => {

            openModal();


            if (videoInput) {
                videoInput.click();
            }

        }
    );

}


const feelingBtn =
    $("#feelingBtn");


if (feelingBtn) {

    feelingBtn.addEventListener(
        "click",
        () => {

            openModal();


            const textArea =
                $("#postText");


            if (textArea) {

                textArea.value =
                    "Feeling happy today! 😊";

            }

        }
    );

}


/* =========================================================
   SEARCH
   =========================================================
   IMPORTANT:
   Your HTML currently does not have #searchInput.
   This check prevents JavaScript from crashing.
   ========================================================= */

const searchInput =
    $("#searchInput");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        event => {

            const query =
                event.target.value
                    .trim()
                    .toLowerCase();


            if (!query) {

                renderPosts();

                return;
            }


            const filtered =
                state.posts.filter(post => {

                    return (
                        post.name +
                        " " +
                        post.text
                    )
                    .toLowerCase()
                    .includes(query);

                });


            renderPosts(filtered);

        }
    );

}


/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeModals();

        }

    }
);


/* =========================================================
   START APP
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderPosts();

    }
);


/* =========================================================
   EXTRA SAFETY
   ========================================================= */

renderPosts();