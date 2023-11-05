{let n=function(e){e="/getpath/?filepath="+e;console.log("path >> ",e),$.ajax({type:"get",url:e,success:function(e){return e.data.assetPath},error:function(e){console.log(e.responseText)}})},o=function(s){console.log("initialised toggle likes"),$(s).click(function(e){console.log("called toggle likes"),e.preventDefault();var t=$(s);$.ajax({type:"get",url:$(s).prop("href"),success:function(e){noLikes=t.find("span").text(),e.data.existingLike?(noLikes=parseInt(noLikes),t.find("span").text(noLikes-1)):(noLikes=parseInt(noLikes),t.find("span").text(noLikes+1))},error:function(e){console.log(e.responseText)}})})},e=function(){const t=$("#new-post-form");t.submit(function(e){e.preventDefault(),$.ajax({type:"post",url:"/posts/new-post",data:t.serialize(),success:function(e){console.log(e);e=s(e.data.post,e.data.user);$("#posts-list-container>ul").prepend(e),$("#post-text").val(""),l($(".delete-post-button",e)),i($(".post-comments",e))},error:function(e){console.log(e.responseText)}})})},s=function(e,t){return $(`
        <li id="post-${e._id}" class="shadow posts">
    
            <div class=" post-user-details">
                <img src="${t.avatar}" alt="display picture" style="float: left;" class="display-picture">
                <div class="post-user-name">${t.name} 
                    <br>
                    <div class="timing">10/10/2023 12:20</div>
                </div>
                
                <small style="float: right;">
                    <a class="delete-post-button" id="delete-${e._id}" href="/posts/destroy/${e._id}">
                        <img class="trash" src="https://img.icons8.com/ios/50/trash--v1.png" alt="trash--v1"/>
                    </a>
                </small>
                
            </div>
            <hr>
            <div class="post-content">
                <div class="post-text">
                    <pre>${e.content}</pre>
                </div>
                
            </div>
            <hr>
            <div class="likes-comments-info">
                <div class="likes-number">
                   
                    <a class="like-toggle" href="/likes/toggle/?type=Post&id=${e._id}">
                        <span>${e.likes.length}</span> 
                    </a>
                            
                    
                </div>
                <div class="comments-number">${e.comments.length} Comments</div>
            </div>
            <hr>
            
            <div class="post-comments">
                
                    <form action="/comments/create" method="POST" class="new-comment-form">
                        <input type="text" name="content" placeholder="add comment..." class="form-control comment-input">
                        <input type="hidden" name="post" value="${e._id}">
                        <input type="submit" value="Add Comment" class="form-control btn btn-dark" contenteditable>
                    </form> 
                
            </div>
            <div id="show-comments" class="post-comments-list">
                <ul>
                    
                </ul>
            </div>
        </li>
        
        `)},l=function(t){$(t).click(function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(e){e=$("#post-"+e.data.id);0<e.length?e.remove():console.log("Post not found for removal")},error:function(e){console.log(e.responseText)}})})},i=function(t){console.log("called this");let s=$(".new-comment-form",t);$(s).submit(function(e){e.preventDefault(),$.ajax({type:"post",url:"/comments/create",data:s.serialize(),success:function(e){e=a(e.data.comment,e.data.user,e.data.avatar);$(".comment-input",t).val(""),$("#show-comments>ul").prepend(e),c($(" .delete-comment-button",e)),o($(" .like-toggle",e))},error:function(e){console.log(e.responseText)}})})},a=function(e,t,s){var o=n("images/thumbs-up.png");return $(`
        <li id="comment-${e._id}">
            <div class="comment-container" >
                <img src="${s}" alt="image" class="comment-display-picture">
                <small><b>${e.user.name}</b></small> <br>
                <small class="timing">01/02/2023</small>
                <p>${e.content}</p>
                <hr>
                
                <small style="float: right;">
                    <a class="delete-comment-button" id="delete-${e._id}" href="/comments/destroy/${e._id}">
                        <img class="trash" src="https://img.icons8.com/ios/50/trash--v1.png" alt="trash--v1"/>
                    </a>
                </small>
                <div class="comment-likes-number">
                    <a class="like-toggle" href="/likes/toggle/?type=Comment&id=${e._id}">
                    <span>${e.likes.length}</span>
                    <img class="thumbs" src="${o}" alt="">
                    </a>
                </div>    
                
            </div>
        </li>
        `)},c=function(t){console.log("called delete!!");$(t);$(t).click(function(e){console.log("clicked delete!!"),e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(e){e=$("#comment-"+e.data.id);0<e.length?e.remove():console.log("Post not found for removal")},error:function(e){console.log(errorText)}})})};$(document).ready(function(){e(),$(".like-toggle").each(function(){o($(this))}),$(".post-comments").each(function(){i($(this))}),$(".delete-post-button").each(function(){l($(this))}),$(".delete-comment-button").each(function(){c($(this))});n("images/thumbs-up.png")})}