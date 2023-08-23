const queue = require('../config/kue');

const commentsMailer = require('../mailer/comments_mailer');

queue.process('emails', function(job, done){
    // console.log('emails worker is processing a job', job.data);
     commentsMailer.newComment(job.data); //we need to send reciever user email as well
     done();
});


