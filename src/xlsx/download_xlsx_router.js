const express = require('express');
const router = express.Router();
var mongoXlsx = require('mongo-xlsx');
var path = require('path');
var mime = require('mime');
var fs = require('fs');

const { User, Report } = require('./../../models/models');

router.get('/', async(req, res) => {
    try{

        const user_id = req.query.user_id;
        let user;
        if(!(user_id != undefined && user_id != null && user_id != '')){
            user = await User.findOne({});
            user_id = user._id;
        }

        let data1 = await Report.find({user_id: user_id});
        let data2 = [];
        data1.forEach(elem => {
            data2.push({
                "Hisob uchastkasi": elem.name,
                "11-noyabr": {
                    "xonadonlar soni": (elem.col.g1)?elem.col.g1:"",
                    "aholi soni": (elem.col.g2)?elem.col.g2:""
                },
                "12-noyabr": {
                    "xonadonlar soni": (elem.col.g3)?elem.col.g3:"",
                    "aholi soni": (elem.col.g4)?elem.col.g4:""
                },
                "13-noyabr": {
                    "xonadonlar soni": (elem.col.g5)?elem.col.g5:"",
                    "aholi soni": (elem.col.g6)?elem.col.g6:""
                },
                "14-noyabr": {
                    "xonadonlar soni": (elem.col.g7)?elem.col.g7:"",
                    "aholi soni": (elem.col.g8)?elem.col.g8:""
                },
                "15-noyabr": {
                    "xonadonlar soni": (elem.col.g9)?elem.col.g9:"",
                    "aholi soni": (elem.col.g10)?elem.col.g10:""
                },
                "16-noyabr": {
                    "xonadonlar soni": (elem.col.g11)?elem.col.g11:"",
                    "aholi soni": (elem.col.g12)?elem.col.g12:""
                },
                "17-noyabr": {
                    "xonadonlar soni": (elem.col.g13)?elem.col.g13:"",
                    "aholi soni": (elem.col.g14)?elem.col.g14:""
                },
                "18-noyabr": {
                    "xonadonlar soni": (elem.col.g15)?elem.col.g15:"",
                    "aholi soni": (elem.col.g16)?elem.col.g16:""
                },
                "19-noyabr": {
                    "xonadonlar soni": (elem.col.g17)?elem.col.g17:"",
                    "aholi soni": (elem.col.g18)?elem.col.g18:""
                },
                "20-noyabr": {
                    "xonadonlar soni": (elem.col.g19)?elem.col.g19:"",
                    "aholi soni": (elem.col.g20)?elem.col.g20:""
                },
                "21-noyabr": {
                    "xonadonlar soni": (elem.col.g21)?elem.col.g21:"",
                    "aholi soni": (elem.col.g22)?elem.col.g22:""
                },
                "22-noyabr": {
                    "xonadonlar soni": (elem.col.g23)?elem.col.g23:"",
                    "aholi soni": (elem.col.g24)?elem.col.g24:""
                }
            })
        });
 
        var model = mongoXlsx.buildDynamicModel(data2);
        let xslx_name = await User.findOne({_id: user_id})
        var options =  {
            save: true,
            sheetName: ["Ro'yxatga olish natijalari","Ro'yxatga olish natijalari"],
            fileName: xslx_name.full_name + "-" + new Date().getTime() + ".xlsx",
            path: "./static/xlsx",
            // defaultSheetName: "Ro'yxatga olish natijalari"
          }
        
        /* Generate Excel */
        mongoXlsx.mongoData2Xlsx(data2, model, options, function(err, data2) {
            console.log('File saved at:', data2.fullPath); 
            //////////////////////////////////////////////////
            var filename = path.basename(data2.fullPath);
            // var mimetype = mime.lookup(data2.fullPath);

            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            // res.setHeader('Content-type', mimetype);

            var filestream = fs.createReadStream(data2.fullPath);
            filestream.pipe(res);
            //////////////////////////////////////////////////
        });
    } catch(err){
        res.status(404).send("Tizimda xatolik")
    }
});

router.get('/all', async(req, res) => {
    try{
        let users = await User.find();
        let data2 = [];
        for(let i = 0; i < users.length; i++){
            let data1 = await Report.find({user_id: users[i]._id});
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
            data1.forEach(elem => {
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
            data2.push({
                "Hisob uchastkasi": users[i].main_name,
                    "11-noyabr": {
                        "xonadonlar soni": jamiTj.g1,
                        "aholi soni": jamiTj.g2
                    },
                    "12-noyabr": {
                        "xonadonlar soni": jamiTj.g3,
                        "aholi soni": jamiTj.g4
                    },
                    "13-noyabr": {
                        "xonadonlar soni": jamiTj.g5,
                        "aholi soni": jamiTj.g6
                    },
                    "14-noyabr": {
                        "xonadonlar soni": jamiTj.g7,
                        "aholi soni": jamiTj.g8
                    },
                    "15-noyabr": {
                        "xonadonlar soni": jamiTj.g9,
                        "aholi soni": jamiTj.g10
                    },
                    "16-noyabr": {
                        "xonadonlar soni": jamiTj.g11,
                        "aholi soni": jamiTj.g12
                    },
                    "17-noyabr": {
                        "xonadonlar soni": jamiTj.g13,
                        "aholi soni": jamiTj.g14
                    },
                    "18-noyabr": {
                        "xonadonlar soni": jamiTj.g15,
                        "aholi soni": jamiTj.g16
                    },
                    "19-noyabr": {
                        "xonadonlar soni": jamiTj.g17,
                        "aholi soni": jamiTj.g18
                    },
                    "20-noyabr": {
                        "xonadonlar soni": jamiTj.g19,
                        "aholi soni": jamiTj.g20
                    },
                    "21-noyabr": {
                        "xonadonlar soni": jamiTj.g21,
                        "aholi soni": jamiTj.g22
                    },
                    "22-noyabr": {
                        "xonadonlar soni": jamiTj.g23,
                        "aholi soni": jamiTj.g24
                    }
              })
            data1.forEach(elem => {
                data2.push({
                    "Hisob uchastkasi": elem.name,
                    "11-noyabr": {
                        "xonadonlar soni": (elem.col.g1)?elem.col.g1:"",
                        "aholi soni": (elem.col.g2)?elem.col.g2:""
                    },
                    "12-noyabr": {
                        "xonadonlar soni": (elem.col.g3)?elem.col.g3:"",
                        "aholi soni": (elem.col.g4)?elem.col.g4:""
                    },
                    "13-noyabr": {
                        "xonadonlar soni": (elem.col.g5)?elem.col.g5:"",
                        "aholi soni": (elem.col.g6)?elem.col.g6:""
                    },
                    "14-noyabr": {
                        "xonadonlar soni": (elem.col.g7)?elem.col.g7:"",
                        "aholi soni": (elem.col.g8)?elem.col.g8:""
                    },
                    "15-noyabr": {
                        "xonadonlar soni": (elem.col.g9)?elem.col.g9:"",
                        "aholi soni": (elem.col.g10)?elem.col.g10:""
                    },
                    "16-noyabr": {
                        "xonadonlar soni": (elem.col.g11)?elem.col.g11:"",
                        "aholi soni": (elem.col.g12)?elem.col.g12:""
                    },
                    "17-noyabr": {
                        "xonadonlar soni": (elem.col.g13)?elem.col.g13:"",
                        "aholi soni": (elem.col.g14)?elem.col.g14:""
                    },
                    "18-noyabr": {
                        "xonadonlar soni": (elem.col.g15)?elem.col.g15:"",
                        "aholi soni": (elem.col.g16)?elem.col.g16:""
                    },
                    "19-noyabr": {
                        "xonadonlar soni": (elem.col.g17)?elem.col.g17:"",
                        "aholi soni": (elem.col.g18)?elem.col.g18:""
                    },
                    "20-noyabr": {
                        "xonadonlar soni": (elem.col.g19)?elem.col.g19:"",
                        "aholi soni": (elem.col.g20)?elem.col.g20:""
                    },
                    "21-noyabr": {
                        "xonadonlar soni": (elem.col.g21)?elem.col.g21:"",
                        "aholi soni": (elem.col.g22)?elem.col.g22:""
                    },
                    "22-noyabr": {
                        "xonadonlar soni": (elem.col.g23)?elem.col.g23:"",
                        "aholi soni": (elem.col.g24)?elem.col.g24:""
                    }
                })
            });
        }
 
        var model = mongoXlsx.buildDynamicModel(data2);
        var options =  {
            save: true,
            sheetName: [],
            fileName: "Natijalar" + "-" + new Date().getTime() + ".xlsx",
            path: "./static/xlsx",
            defaultSheetName: "Ro'yxatga olish natijalari"
          }
        /* Generate Excel */
        mongoXlsx.mongoData2Xlsx(data2, model, options, function(err, data2) {
            console.log('File saved at:', data2.fullPath); 
            //////////////////////////////////////////////////
            var filename = path.basename(data2.fullPath);
            // var mimetype = mime.lookup(data2.fullPath);

            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            // res.setHeader('Content-type', mimetype);

            var filestream = fs.createReadStream(data2.fullPath);
            filestream.pipe(res);
            //////////////////////////////////////////////////
        });
    } catch(err){
        res.status(404).send("Tizimda xatolik")
    }
});

module.exports = router;