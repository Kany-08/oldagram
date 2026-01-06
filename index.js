import { posts } from "./data.js"

document.addEventListener('click', function(e){
    if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.id === 'btn'){
        handleBtnClick()
    }
})

function handleLikeClick(postId){
    const targetPostObj = posts.filter(function(post){
        return post.uuid === postId
    })[0]

    if(targetPostObj.isLiked){
        targetPostObj.likes--
    } else {
        targetPostObj.likes++
    }
    targetPostObj.isLiked = !targetPostObj.isLiked
    render()
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleBtnClick(){
    posts.unshift({
        name: "Kany Sharapova",
        location: "Kl, Germany",
        avatar: "images/user-avatar.jpg",
        comment: "Hey Everybody!",
        post: "images/cat-hi.webp",
        username: "kany08",
        likes: 0,
        sendings: 0,
        uuid: "alsdfjjfowje34oiu584urjf98sdfsfsdf",
        isLiked: false,
        isSended: false,
        replies: []
    })
    render()
}


function getPostHtml() {

    let postHtml = ''

    posts.forEach(function (post) {

        let likeIconClass = ''

        if(post.isLiked) {
            likeIconClass = 'liked'
        }

        let repliesHTML = ''

        if(post.replies.length > 0) {
            post.replies.forEach(function(reply){
                repliesHTML += `
                    <div class="post-reply">
                        <div class="post-inner">
                            <img src="${reply.avatar}" class="user-avatar">
                            <div class="user-info">
                                <h2 class="user-name">${reply.name}</h2>
                                <p class="user-location">${reply.comment}</p>
                            </div>
                        </div>
                    </div>
                `
            })
        }

        postHtml += `
                <div class="post-info">
                    <div class="container">
                        <div class="post-section-box">
                            <img id="avatar" class="user-avatar" src="${post.avatar}" alt="${post.name} avatar.">
                            <div class="user-info">
                                <h2 class="user-name" id="name">${post.name}</h2>
                                <p class="user-location" id="loc">${post.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="post-image">
                    <img id="post" src="${post.post}" alt="${post.name}'s post image.">
                </div>
                <div class="post-body">
                    <div class="container">
                        <div class="post-body-box">
                            <div class="post-details">
                                <span class="post-detail">
                                    <i class="fa-${post.isLiked ? 'solid' : 'regular'} fa-heart ${likeIconClass}"
                                    data-like="${post.uuid}"
                                    ></i>
                                    ${post.likes > 0 ? post.likes : ''}
                                </span>
                                <span class="post-detail">
                                    <i class="fa-regular fa-comment"
                                    data-reply="${post.uuid}"
                                    ></i>
                                    ${post.replies.length > 0 ? post.replies.length : ''}
                                </span>
                                <span class="post-detail">
                                    <i class="fa-regular fa-paper-plane"
                                    data-send="${post.uuid}"
                                    ></i>
                                    ${post.sendings > 0 ? post.sendings : ''}
                                </span>
                                
                            </div>
                            

                            <div class="username-caption">
                                <h3 class="username" id="username">${post.username}</h3>
                                <p class="users-post-text" id="comment">${post.comment}</p>
                            </div>
                        </div>

                    </div>

                    <div class="hidden" id="replies-${post.uuid}">
                        ${repliesHTML}
                    </div
                </div>
        `
    })
    return postHtml

}

function render() {
    document.getElementById('section').innerHTML = getPostHtml()

}

render()





