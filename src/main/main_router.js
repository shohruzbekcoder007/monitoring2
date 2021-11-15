const express = require('express');
const router = express.Router();

const { User, Report } = require('./../../models/models')

router.get('/', async(req, res) => {
    try{
        let users = await User.find({});
        const user_id = req.query.user_id;
        let user;
        if(user_id != undefined && user_id != null && user_id != ''){
            user = await User.findOne({_id: user_id});
        } else {
            user = users[0];
        }
        let allReport = await Report.find({user_id: user._id});
        let reportsSumma = await Report.find({});
        let jamiTj = {
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
            g24: 0,
        };
        reportsSumma.forEach(elem => {
            jamiTj.g1 = jamiTj.g1 + parseFloat(elem.col.g1);
            jamiTj.g2 = jamiTj.g2 + parseFloat(elem.col.g2);
            jamiTj.g3 = jamiTj.g3 + parseFloat(elem.col.g3);
            jamiTj.g4 = jamiTj.g4 + parseFloat(elem.col.g4);
            jamiTj.g5 = jamiTj.g5 + parseFloat(elem.col.g5);
            jamiTj.g6 = jamiTj.g6 + parseFloat(elem.col.g6);
            jamiTj.g7 = jamiTj.g7 + parseFloat(elem.col.g7);
            jamiTj.g8 = jamiTj.g8 + parseFloat(elem.col.g8);
            jamiTj.g9 = jamiTj.g9 + parseFloat(elem.col.g9);
            jamiTj.g10 = jamiTj.g10 + parseFloat(elem.col.g10);
            jamiTj.g11 = jamiTj.g11 + parseFloat(elem.col.g11);
            jamiTj.g12 = jamiTj.g12 + parseFloat(elem.col.g12);
            jamiTj.g13 = jamiTj.g13 + parseFloat(elem.col.g13);
            jamiTj.g14 = jamiTj.g14 + parseFloat(elem.col.g14);
            jamiTj.g15 = jamiTj.g15 + parseFloat(elem.col.g15);
            jamiTj.g16 = jamiTj.g16 + parseFloat(elem.col.g16);
            jamiTj.g17 = jamiTj.g17 + parseFloat(elem.col.g17);
            jamiTj.g18 = jamiTj.g18 + parseFloat(elem.col.g18);
            jamiTj.g19 = jamiTj.g19 + parseFloat(elem.col.g19);
            jamiTj.g20 = jamiTj.g20 + parseFloat(elem.col.g20);
            jamiTj.g21 = jamiTj.g21 + parseFloat(elem.col.g21);
            jamiTj.g22 = jamiTj.g22 + parseFloat(elem.col.g22);
            jamiTj.g23 = jamiTj.g23 + parseFloat(elem.col.g23);
            jamiTj.g24 = jamiTj.g24 + parseFloat(elem.col.g24);
        });
        let t_j_count = jamiTj.g1 + jamiTj.g3 + jamiTj.g5 + jamiTj.g7 + jamiTj.g9 + jamiTj.g11 + jamiTj.g13 + jamiTj.g15 + jamiTj.g17 + jamiTj.g19 + jamiTj.g21 + jamiTj.g23;
        let person_count = jamiTj.g2 + jamiTj.g4 + jamiTj.g6 + jamiTj.g8 + jamiTj.g10 + jamiTj.g12 + jamiTj.g14 + jamiTj.g16 + jamiTj.g18 + jamiTj.g20 + jamiTj.g22 + jamiTj.g24;
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
        let report = await Report.find({user_id: user._id}).limit(15).skip(0);
        let count = await Report.countDocuments({user_id: user._id});
        res.render('main',{
            users: users,
            user: user,
            report: report,
            offset: 0,
            count: count,
            yigindilar: yigindilar,
            t_j_count: t_j_count,
            person_count: person_count
        });
    } catch(err){
        res.status(404).send("Tizimda xatolik")
    }
});

router.get('/next', async(req, res) => {
    try {
        let users = await User.find({});
        let user = await User.findOne({_id: req.query.user_id});
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
        if (user._id != undefined) {
            let offset = parseInt(req.query.offset);
            let report = await Report.find({user_id: user._id}).limit(15).skip(offset);
            let count = await Report.countDocuments({user_id: user._id});
            let reportsSumma = await Report.find({});
            let jamiTj = {
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
                g24: 0,
            };
            reportsSumma.forEach(elem => {
                jamiTj.g1 = jamiTj.g1 + parseFloat(elem.col.g1);
                jamiTj.g2 = jamiTj.g2 + parseFloat(elem.col.g2);
                jamiTj.g3 = jamiTj.g3 + parseFloat(elem.col.g3);
                jamiTj.g4 = jamiTj.g4 + parseFloat(elem.col.g4);
                jamiTj.g5 = jamiTj.g5 + parseFloat(elem.col.g5);
                jamiTj.g6 = jamiTj.g6 + parseFloat(elem.col.g6);
                jamiTj.g7 = jamiTj.g7 + parseFloat(elem.col.g7);
                jamiTj.g8 = jamiTj.g8 + parseFloat(elem.col.g8);
                jamiTj.g9 = jamiTj.g9 + parseFloat(elem.col.g9);
                jamiTj.g10 = jamiTj.g10 + parseFloat(elem.col.g10);
                jamiTj.g11 = jamiTj.g11 + parseFloat(elem.col.g11);
                jamiTj.g12 = jamiTj.g12 + parseFloat(elem.col.g12);
                jamiTj.g13 = jamiTj.g13 + parseFloat(elem.col.g13);
                jamiTj.g14 = jamiTj.g14 + parseFloat(elem.col.g14);
                jamiTj.g15 = jamiTj.g15 + parseFloat(elem.col.g15);
                jamiTj.g16 = jamiTj.g16 + parseFloat(elem.col.g16);
                jamiTj.g17 = jamiTj.g17 + parseFloat(elem.col.g17);
                jamiTj.g18 = jamiTj.g18 + parseFloat(elem.col.g18);
                jamiTj.g19 = jamiTj.g19 + parseFloat(elem.col.g19);
                jamiTj.g20 = jamiTj.g20 + parseFloat(elem.col.g20);
                jamiTj.g21 = jamiTj.g21 + parseFloat(elem.col.g21);
                jamiTj.g22 = jamiTj.g22 + parseFloat(elem.col.g22);
                jamiTj.g23 = jamiTj.g23 + parseFloat(elem.col.g23);
                jamiTj.g24 = jamiTj.g24 + parseFloat(elem.col.g24);
            });
            let t_j_count = jamiTj.g1 + jamiTj.g3 + jamiTj.g5 + jamiTj.g7 + jamiTj.g9 + jamiTj.g11 + jamiTj.g13 + jamiTj.g15 + jamiTj.g17 + jamiTj.g19 + jamiTj.g21 + jamiTj.g23;
            let person_count = jamiTj.g2 + jamiTj.g4 + jamiTj.g6 + jamiTj.g8 + jamiTj.g10 + jamiTj.g12 + jamiTj.g14 + jamiTj.g16 + jamiTj.g18 + jamiTj.g20 + jamiTj.g22 + jamiTj.g24;
            res.render('main', {
                users: users,
                user: user,
                count: count,
                report: report,
                offset: offset,
                yigindilar: yigindilar,
                t_j_count: t_j_count,
                person_count: person_count
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

router.get('/republic', async(req, res) => {
    try {
        let users = await User.find({});
        let districts = [];
        for (let i = 0; i < users.length; i++) {
            let district = {}
            district.user = users[i];
            let report = await Report.find({user_id: users[i]._id});
            let jamiTj = {
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
                g24: 0,
            };
            report.forEach(elem => {
                jamiTj.g1 = jamiTj.g1 + parseFloat(elem.col.g1);
                jamiTj.g2 = jamiTj.g2 + parseFloat(elem.col.g2);
                jamiTj.g3 = jamiTj.g3 + parseFloat(elem.col.g3);
                jamiTj.g4 = jamiTj.g4 + parseFloat(elem.col.g4);
                jamiTj.g5 = jamiTj.g5 + parseFloat(elem.col.g5);
                jamiTj.g6 = jamiTj.g6 + parseFloat(elem.col.g6);
                jamiTj.g7 = jamiTj.g7 + parseFloat(elem.col.g7);
                jamiTj.g8 = jamiTj.g8 + parseFloat(elem.col.g8);
                jamiTj.g9 = jamiTj.g9 + parseFloat(elem.col.g9);
                jamiTj.g10 = jamiTj.g10 + parseFloat(elem.col.g10);
                jamiTj.g11 = jamiTj.g11 + parseFloat(elem.col.g11);
                jamiTj.g12 = jamiTj.g12 + parseFloat(elem.col.g12);
                jamiTj.g13 = jamiTj.g13 + parseFloat(elem.col.g13);
                jamiTj.g14 = jamiTj.g14 + parseFloat(elem.col.g14);
                jamiTj.g15 = jamiTj.g15 + parseFloat(elem.col.g15);
                jamiTj.g16 = jamiTj.g16 + parseFloat(elem.col.g16);
                jamiTj.g17 = jamiTj.g17 + parseFloat(elem.col.g17);
                jamiTj.g18 = jamiTj.g18 + parseFloat(elem.col.g18);
                jamiTj.g19 = jamiTj.g19 + parseFloat(elem.col.g19);
                jamiTj.g20 = jamiTj.g20 + parseFloat(elem.col.g20);
                jamiTj.g21 = jamiTj.g21 + parseFloat(elem.col.g21);
                jamiTj.g22 = jamiTj.g22 + parseFloat(elem.col.g22);
                jamiTj.g23 = jamiTj.g23 + parseFloat(elem.col.g23);
                jamiTj.g24 = jamiTj.g24 + parseFloat(elem.col.g24);
            });
            district.report = jamiTj;
            districts.push(district);
        }
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
            g24: 0,
        };
        districts.forEach(elem => {
            yigindilar.g1 = yigindilar.g1 + parseFloat(elem.report.g1);
            yigindilar.g2 = yigindilar.g2 + parseFloat(elem.report.g2);
            yigindilar.g3 = yigindilar.g3 + parseFloat(elem.report.g3);
            yigindilar.g4 = yigindilar.g4 + parseFloat(elem.report.g4);
            yigindilar.g5 = yigindilar.g5 + parseFloat(elem.report.g5);
            yigindilar.g6 = yigindilar.g6 + parseFloat(elem.report.g6);
            yigindilar.g7 = yigindilar.g7 + parseFloat(elem.report.g7);
            yigindilar.g8 = yigindilar.g8 + parseFloat(elem.report.g8);
            yigindilar.g9 = yigindilar.g9 + parseFloat(elem.report.g9);
            yigindilar.g10 = yigindilar.g10 + parseFloat(elem.report.g10);
            yigindilar.g11 = yigindilar.g11 + parseFloat(elem.report.g11);
            yigindilar.g12 = yigindilar.g12 + parseFloat(elem.report.g12);
            yigindilar.g13 = yigindilar.g13 + parseFloat(elem.report.g13);
            yigindilar.g14 = yigindilar.g14 + parseFloat(elem.report.g14);
            yigindilar.g15 = yigindilar.g15 + parseFloat(elem.report.g15);
            yigindilar.g16 = yigindilar.g16 + parseFloat(elem.report.g16);
            yigindilar.g17 = yigindilar.g17 + parseFloat(elem.report.g17);
            yigindilar.g18 = yigindilar.g18 + parseFloat(elem.report.g18);
            yigindilar.g19 = yigindilar.g19 + parseFloat(elem.report.g19);
            yigindilar.g20 = yigindilar.g20 + parseFloat(elem.report.g20);
            yigindilar.g21 = yigindilar.g21 + parseFloat(elem.report.g21);
            yigindilar.g22 = yigindilar.g22 + parseFloat(elem.report.g22);
            yigindilar.g23 = yigindilar.g23 + parseFloat(elem.report.g23);
            yigindilar.g24 = yigindilar.g24 + parseFloat(elem.report.g24);
        })
        res.render('republic', {
            users: users,
            districts: districts,
            yigindilar: yigindilar
        });
    } catch (ex) {
        res.render('login_staff', {

        });
    }
});

module.exports = router;