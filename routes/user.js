const path=require('path');
const  express=require('express');

const myController=require('../controllers/mycontroller');


const router=express.Router();


router.get('/adduser',myController.getAddUser);
router.post('/storeuser',myController.storeUser);
router.get('/showuser',myController.getUser);
router.get('/sendmessage',myController.sendMsg);
router.post('/sent',myController.postSendMsg);
module.exports=router;