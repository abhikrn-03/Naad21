const express = require("express");
const router = express.Router();
const passport = require('passport');
const Admin = require('./../models/admin');
const Event = require('./../models/event');
const Registration = require('./../models/registration');
const sendEmail = require('./../utils/sendEmail');

router.get('/', async (req, res) => {
    return res.render('login');
});


router.get('/login', async (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('findEvent');
    }
    return res.render('login');
});

router.post('/login', passport.authenticate('local', {
    sucessRedirect:'findEvent',
    failureRedirect: 'login',
    failureFlash: true
}));

router.get('/register', async function (req, res) {
    //console.log("Police request recieved.");
    const newAdmin = new Admin({ username: 'admin' });
    Admin.register(newAdmin, "dhwani123", function (err, user) {
        if (err) {
            console.log(err);
		return res.sendStatus(500);
        }
        console.log(user);
	return res.sendStatus(200);
    });
    
});

router.get('/findEvent', (req, res) => {
    if (req.isAuthenticated() === false) {
        res.redirect('login');
    }
    res.render('findEvent');
});

router.get('/findById', (req, res) => {
    if (req.isAuthenticated() === false) {
        res.redirect('login');
    }
    res.render('findById');
});

router.get('/markMail', (req, res) => {
    if (req.isAuthenticated() === false) {
        res.redirect('login');
    }
    res.render('markMail');
});


router.post('/findEvent', async (req, res) => {


    for (var x in req.body) {
        if (req.body[x] === '') {
            //console.log(x);
            delete req.body[x];
        }
    }
    //console.log(req.body);

    Event.find(req.body, (err, data) => {
        if (err) {
            console.log(err);
            res.redirect('findEvent');
        }
        else {
            console.log(data);
            res.render('eventResult', { participants: data });
        }
    });
});

router.post('/findById', async (req, res) => {


    for (var x in req.body) {
        if (req.body[x] === '') {
            //console.log(x);
            delete req.body[x];
        }
    }
    //console.log(req.body);

    Registration.find(req.body, (err, data) => {
        if (err) {
            console.log(err);
            res.redirect('findById');
        }
        else {
            console.log(data);
            res.render('findByIdResult', { participants: data });
        }
    });
});

router.post('/markMail', async (req, res) => {
    try {
    //     let participants = await Registration.find({});
    //     let link = "https://naad21.in/naadwhitelogo.png";
	// console.log(participants);
    //     for (let x in participants){
	// 	    console.log(participants[x].email, req.body.mailSubject);
    //         sendEmail(participants[x].email, req.body.mailSubject, "<div style='text-align:center'><img src=" + link + "></div>" + "<div>" + req.body.mailBody + "</div>" + "<br><br> See you around, till then, stay musical!<br><br> Team NAAD");
    //     }
	// res.status(200).redirect('/api/admin');
        // To reduce server calls:
        let recipients = "'"; let i=0;
        const nosrecp = participants.length;
        for (i=0; i<(nosrecp-1); i++){
            recipients = recipients + participants[i].email + ", ";
        }
        recipients = recipients + participants[nosrecp-1].email + "'";
        sendEmail(recipients, req.body.mailSubject, "<div style='text-align:center'><img src=" + link + "></div>" + "<div>" + req.body.mailBody + "</div>" + "<br><br> See you around, till then, stay musical!<br><br> Team NAAD");
        res.status(200).redirect('/api/admin');
    } catch(err) {
        console.log(err);
        res.status(400).redirect('markMail');
    }

});

module.exports = router;
