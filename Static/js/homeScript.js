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
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    let showPost = function(post){
        return $(`<ol class="post-list"> 
                    <p> 
                        <li>
                            ${ post.content }    
                        </li>
                        <small>
                            ${ post.user.name }
                        </small>
                    </p>
                <div class="post-comments">
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="add comment...">
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        </form> 
                </div>
                
               
                </ol>`)
    }
    

    createPost();


}