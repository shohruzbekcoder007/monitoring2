const express = require('express');
const router = express.Router();

const { User, Report } = require('./../../models/models')

router.get('/', async(req, res) => {
    res.render('login_staff', {

    });
});

router.post('/', async(req, res) => {
    try {
        reqBody = {
            user_name: req.body.user_name,
            password: req.body.password
        }
        let user = await User.findOne(reqBody);
        if (user._id != undefined) {
            let report = await Report.find({user_id: user._id}).limit(10).skip(0);
            let count = await Report.countDocuments({user_id: user._id});
            let allReport = await Report.find({user_id: user._id});
            let yigindilar = {
                g1: 0,
                g2: 0,
                g3: 0,
                g4: 0,
                g5: 0,
                g6: 0,
                g7: 0,
                g8: 0,
                g9: 0,
                g10: 0,
                g11: 0,
                g12: 0,
                g13: 0,
                g14: 0,
                g15: 0,
                g16: 0,
                g17: 0,
                g18: 0,
                g19: 0,
                g20: 0,
                g21: 0,
                g22: 0,
                g23: 0,
                g24: 0
            }
            allReport.forEach(elem => {
                for(let i = 1; i < 25; i++){
                    yigindilar["g"+i] = yigindilar["g"+i] + (+elem.col["g"+i])
                }
            })
            res.render('main_staff', {
                user: user,
                report: report,
                count: count,
                offset: 0,
                yigindilar: yigindilar
            });
        } else {
            res.render('login_staff', {

            });
        }
    } catch (ex) {
        res.render('login_staff', {

        });
    }
});

router.get('/next', async(req, res) => {
    try {
        let user = await User.findOne({_id: req.query.user_id});
        if (user._id != undefined) {
            let offset = parseInt(req.query.offset);
            let report = await Report.find({user_id: user._id}).limit(10).skip(offset);
            let count = await Report.countDocuments({user_id: user._id});
            let allReport = await Report.find({user_id: user._id});
            let yigindilar = {
                g1: 0,
                g2: 0,
                g3: 0,
                g4: 0,
                g5: 0,
                g6: 0,
                g7: 0,
                g8: 0,
                g9: 0,
                g10: 0,
                g11: 0,
                g12: 0,
                g13: 0,
                g14: 0,
                g15: 0,
                g16: 0,
                g17: 0,
                g18: 0,
                g19: 0,
                g20: 0,
                g21: 0,
                g22: 0,
                g23: 0,
                g24: 0
            }
            allReport.forEach(elem => {
                for(let i = 1; i < 25; i++){
                    yigindilar["g"+i] = yigindilar["g"+i] + (+elem.col["g"+i])
                }
            })
            res.render('main_staff', {
                user: user,
                count: count,
                report: report,
                offset: offset,
                yigindilar: yigindilar
            });
        } else {
            res.render('login_staff', {

            });
        }
    } catch (ex) {
        res.render('login_staff', {

        });
    }
});

router.put('/update_report', async(req, res) => {
    data = req.body.data;
    try{
            data.forEach(async elem => {
                let doc = await Report.updateOne({ _id: elem.id }, {col: elem.col});
            })
            return res.send("muvofaqqiyatli")
    } catch (ex) {
        res.status(404).send("muvofaqqiyatsiz")
    }
    
    return res.send("salom")
})

module.exports = router;