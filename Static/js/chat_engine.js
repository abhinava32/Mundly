class chatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBoxId = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log("connection established using sockets...!");

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial' 
            });

            $('#send-message').click(function(){
                console.log("clicked");
                let msg = $('#message-box').val();
                console.log("message to be sent is ", msg);
                if(msg != ''){
                    self.socket.emit('send_message',{
                        message: msg,
                        user_email: self.userEmail,
                        chatroom: 'codeial'
                    })
                }

                
            })

            self.socket.on('receive_message', function(data){
                console.log("message received:-- ",data.message);

                let newMessage = $('<li>');

                let messageType = 'other-message';
                if(data.user_email == self.userEmail){
                    messageType = 'self-message';
                }

                newMessage.append($('<span>', {
                   'html': data.message
                }));

                newMessage.addClass(messageType);

                $('#chat-messages-list').append(newMessage);
                const scrollableDiv = $('#chatBox');

                // Scroll the div to the bottom
                function scrollToBottom() {
                    scrollableDiv.scrollTop(scrollableDiv[0].scrollHeight);
                }

                // Call scrollToBottom to scroll down by default
                scrollToBottom();

            })

        } );
    }
}