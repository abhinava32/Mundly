{
    

    let createPost = function(){
        const newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/new-post',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post, data.data.user);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    let newPostDom = function(post, user){
        
        console.log("creating dom");
        // const user = await Post.findById(post._id).populate(user.name);
        return $(`
        <li id="post-${post._id}"> 
            <p>
                <p>
                    ${post.content}    
                </p>
                <small>
                    --${ user }
                </small>
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                    </small>
            </p>
        
            <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="add comment...">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form> 
            </div>
            <div id="show-comments" class="post-comments-list">
                <ul>
                   
                </ul>
            </div>
        </li>`)}
    
        
    let deletePost = function(deleteLink){
            
        $(deleteLink).click(function(e){
            e.preventDefault();
            console.log("deleting post!!");
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    };

    let createComment = function(){
        let newCommentForm = $('#new-comment-form');
        $(newCommentForm).submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    console.log(data);
                    const newComment = newCommentDom(data.data.comment, data.data.user);
                    
                    $('#show-comments>ul').prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    };

    let newCommentDom = function(comment, user){
        return $(`
            <li id="comment-${comment._id}">
                <small> ${user} </small>> :  ${comment.content} 
                <small>
                    <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                </small>   
            </li>
        `)
    }

    let deleteComment = function(deleteCommentLink){
        $(deleteCommentLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteCommentLink).prop('href'),
                success: function(data){
                    $(`comment-${data.data.id}`).remove();
                },
                error: function(error){
                    console.log(errorText);
                }
            });
        });
    }



    createPost();
    createComment();
    
    
}