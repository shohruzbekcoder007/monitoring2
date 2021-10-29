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
            sheetName: [],
            fileName: xslx_name.full_name + "-" + new Date().getTime() + ".xlsx",
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