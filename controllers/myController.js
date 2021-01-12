const User = require('../models/user');
var nodemailer = require('nodemailer');
const fs=require('fs');

//to get adduser form
exports.getAddUser = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    }
    else {
        message = null;
    }
    let msg = req.flash('success');
    if (msg.length > 0) {
        msg = msg[0];
    }
    else {
        msg = null;
    }
    res.render('adduser', {
        pageTitle: 'AddUser',
        path: '/adduser',
        errMessage: message,
        Message: msg,
        user: req.session.user

    });
};

//to add a user

exports.storeUser = (req, res, next) => {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    const contact = req.body.contact;
    const address = req.body.address;

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', 'E-Mail already exists, please pick a different one.');
                return res.redirect('/adduser');
            }

            const user = new User({
                first_name: firstname,
                last_name: lastname,
                email: email,
                contact: contact,
                address: address
            });
            return user.save();
        })
        .then(result => {
            req.flash('success', 'User has been added successfully');
            res.redirect('/adduser');
        })
        .catch(err => {
            console.log(err);

        });

};

//to show user
exports.getUser = (req, res, next) => {
    User.find()
        .then(users => {
            res.render('viewuser', {
                pageTitle: 'User',
                path: '/showuser',
                data:users
            });
        })
        .catch(err => console.log())
};

exports.sendMsg = (req, res, next) => {
    let msg = req.flash('scss');
    if (msg.length > 0) {
        msg = msg[0];
    }
    else {
        msg = null;
    }
    User.find()
        .then(users => {
    res.render('message', {
        pageTitle: 'SendMessage',
        path: '/sendmessage',
        Msg: msg,
        mydata:users,
        user: req.session.user

    });
})
};

//to send msg
exports.postSendMsg=(req,res,next)=>{
    let to=[req.body.to];
    let subject=req.body.subject;
    let body=req.body.msg;
    // let path=req.file.path;


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testdursikshya123@gmail.com',
          pass: 'Dursikshya@test'
        }
      });

    if(!req.file){
          const mailOptions = {
            from:'testdursikshya123@gmail.com',
            to:to,
            subject:subject,
            text:body
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                req.flash('scss', 'Email Sent');
                    return res.redirect('/sendmessage')
            }  
            
          });
    

    }
    else{
    let path=req.file.path;
      const mailOptions = {
        from:'testdursikshya123@gmail.com',
        to:to,
        subject:subject,
        text:body,
        attachments: [
          {
           path: path
          }
       ]
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            req.flash('scss', 'Email Sent');
          fs.unlink(path,function(err){
            if(err){
                return res.end(err)
            }else{
            
                return res.redirect('/sendmessage')
            }
          })
        }
      });
};
}