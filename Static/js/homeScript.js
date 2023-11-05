{

    let getAssetPath = function(filePath){
        let path = `/getpath/?filepath=${filePath}`;
        console.log("path >> ", path);
        $.ajax({
            type:'get',
            url:path,
            success: function(data){
                return data.data.assetPath;
            },
            error: function(err){
                console.log(err.responseText);
            }
        })
    }

    let toggleLikes = function(likeLink) {
        console.log("initialised toggle likes");
        $(likeLink).click(function(e) {
            console.log("called toggle likes");
            e.preventDefault();
            var $link = $(likeLink); // Convert likeLink to a jQuery object
            $.ajax({
                type: 'get',
                url: $(likeLink).prop('href'),
                success: function(data) {
                    
                    noLikes = $link.find('span').text();
                    

                if (data.data.existingLike) {
                    noLikes = parseInt(noLikes);
                    
                    $link.find('span').text(noLikes - 1);
                } else {
                    noLikes = parseInt(noLikes);
                    
                    $link.find('span').text(noLikes + 1);
                }
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    };
    
    
    // console.log("updated text is ",text);
    let createPost = function(){
        const newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            // console.log($('#post-text').val());
            // // $('#post-text').text().replace(/ /g, "[space]");
            // var text = $('#post-text').val().replace(/\n/g, "<br>");
            
            $.ajax({
                type: 'post',
                url: '/posts/new-post',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post, data.data.user);
                    // const assetPath = "<%= assetPath('images/thumbs-up.png') %>";
                    // $(`#img-${data.data.post._id}`).attr("src",assetPath);
                    $('#posts-list-container>ul').prepend(newPost);
                    $('#post-text').val("");
                    deletePost($('.delete-post-button', newPost));
                    createComment($('.post-comments', newPost));
                    
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    let newPostDom = function(post, user){
        
        return $(`
        <li id="post-${post._id}" class="shadow posts">
    
            <div class=" post-user-details">
                <img src="${user.avatar}" alt="display picture" style="float: left;" class="display-picture">
                <div class="post-user-name">${user.name} 
                    <br>
                    <div class="timing">10/10/2023 12:20</div>
                </div>
                
                <small style="float: right;">
                    <a class="delete-post-button" id="delete-${post._id}" href="/posts/destroy/${post._id}">
                        <img class="trash" src="https://img.icons8.com/ios/50/trash--v1.png" alt="trash--v1"/>
                    </a>
                </small>
                
            </div>
            <hr>
            <div class="post-content">
                <div class="post-text">
                    <pre>${post.content}</pre>
                </div>
                
            </div>
            <hr>
            <div class="likes-comments-info">
                <div class="likes-number">
                   
                    <a class="like-toggle" href="/likes/toggle/?type=Post&id=${post._id}">
                        <span>${post.likes.length}</span> 
                    </a>
                            
                    
                </div>
                <div class="comments-number">${post.comments.length} Comments</div>
            </div>
            <hr>
            
            <div class="post-comments">
                
                    <form action="/comments/create" method="POST" class="new-comment-form">
                        <input type="text" name="content" placeholder="add comment..." class="form-control comment-input">
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment" class="form-control btn btn-dark" contenteditable>
                    </form> 
                
            </div>
            <div id="show-comments" class="post-comments-list">
                <ul>
                    
                </ul>
            </div>
        </li>
        
        `);
    }

    
      
    
        
    let deletePost = function(deleteLink){
        
        $(deleteLink).click(function(e){
            e.preventDefault();
            
            
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    var postToRemove = $(`#post-${data.data.id}`);
                    if (postToRemove.length > 0) {
                        // Remove the post element
                        postToRemove.remove();
                    } else {
                        console.log('Post not found for removal');
                    }
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    };

    let createComment = function(commentForm){
        console.log("called this");
        let newCommentForm = $('.new-comment-form', commentForm);
        $(newCommentForm).submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    // console.log(data);
                    const newComment = newCommentDom(data.data.comment, data.data.user, data.data.avatar);
                    $('.comment-input',commentForm).val("");
                    
                    $('#show-comments>ul').prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));
                    toggleLikes($(' .like-toggle', newComment));
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    };

    let newCommentDom = function(comment, user, avatar){
        var thumbs = getAssetPath('images/thumbs-up.png');
        return $(`
        <li id="comment-${comment._id}">
            <div class="comment-container" >
                <img src="${avatar}" alt="image" class="comment-display-picture">
                <small><b>${comment.user.name}</b></small> <br>
                <small class="timing">01/02/2023</small>
                <p>${comment.content}</p>
                <hr>
                
                <small style="float: right;">
                    <a class="delete-comment-button" id="delete-${comment._id}" href="/comments/destroy/${comment._id}">
                        <img class="trash" src="https://img.icons8.com/ios/50/trash--v1.png" alt="trash--v1"/>
                    </a>
                </small>
                <div class="comment-likes-number">
                    <a class="like-toggle" href="/likes/toggle/?type=Comment&id=${comment._id}">
                    <span>${comment.likes.length}</span>
                    <img class="thumbs" src="${thumbs}" alt="">
                    </a>
                </div>    
                
            </div>
        </li>
        `)
    }

    let deleteComment = function(deleteCommentLink){
        console.log("called delete!!");
        let deleteComment = $(deleteCommentLink);
        $(deleteCommentLink).click(function(e){
            console.log("clicked delete!!");
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteCommentLink).prop('href'),
                success: function(data){
                    var commentToRemove = $(`#comment-${data.data.id}`);
                    if (commentToRemove.length > 0) {
                        // Remove the post element
                        commentToRemove.remove();
                    } else {
                        console.log('Post not found for removal');
                    }
                },
                error: function(error){
                    console.log(errorText);
                }
            });
        });
    }

    // let toggleLikes = function(likeLink){
    //     $()
    // }

    // $('.delete-post-button').click(function(){
    //     let deletePostId = $(this).attr('id');
    //     deletePostId = '#'+deletePostId;
    //     alert("deleting ",deletePostId);
    //     deletePost($(deletePostId));  
    // })
    
    
    $(document).ready(function(){
        // $('#chatContainer').hide();
        createPost();
        $('.like-toggle').each(function(){
            toggleLikes($(this));
        });
        $('.post-comments').each(function(){
            createComment($(this));
        });
        $('.delete-post-button').each(function() {
            deletePost($(this));
        });
        $('.delete-comment-button').each(function(){
            deleteComment($(this));
        });
        var thumbs = getAssetPath('images/thumbs-up.png');
        
        
        
    });
    
    
    
    
    
    
}