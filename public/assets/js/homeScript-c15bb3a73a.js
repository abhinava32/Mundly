{let e=function(){const t=$("#new-post-form");t.submit(function(e){e.preventDefault(),$.ajax({type:"post",url:"/posts/new-post",data:t.serialize(),success:function(e){console.log(e);e=o(e.data.post,e.data.user);$("#posts-list-container>ul").prepend(e),n($(" .delete-post-button",e))},error:function(e){console.log(e.responseText)}})})},o=function(e,t){return console.log("creating dom"),$(`
        <li id="post-${e._id}"> 
            <p>
                <p>
                    ${e.content}    
                </p>
                <small>
                    --${t}
                </small>
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${e._id}">X</a>
                    </small>
            </p>
        
            <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="add comment...">
                    <input type="hidden" name="post" value="${e._id}">
                    <input type="submit" value="Add Comment">
                </form> 
            </div>
            <div id="show-comments" class="post-comments-list">
                <ul>
                   
                </ul>
            </div>
        </li>`)},n=function(t){$(t).click(function(e){e.preventDefault(),console.log("deleting post!!"),$.ajax({type:"get",url:$(t).prop("href"),success:function(e){$("#post-"+e.data.id).remove()},error:function(e){console.log(e.responseText)}})})},t=function(){let t=$("#new-comment-form");$(t).submit(function(e){e.preventDefault(),$.ajax({type:"post",url:"/comments/create",data:t.serialize(),success:function(e){console.log(e);e=s(e.data.comment,e.data.user);$("#show-comments>ul").prepend(e),l($(" .delete-comment-button",e))},error:function(e){console.log(e.responseText)}})})},s=function(e,t){return $(`
            <li id="comment-${e._id}">
                <small> ${t} </small>> :  ${e.content} 
                <small>
                    <a class="delete-comment-button" href="/comments/destroy/${e._id}">X</a>
                </small>   
            </li>
        `)},l=function(t){$(t).click(function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(e){$("comment-"+e.data.id).remove()},error:function(e){console.log(errorText)}})})};e(),t(),$("#chatContainer").hide()}