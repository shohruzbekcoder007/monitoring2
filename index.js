const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const logger = require('./config/logger.config');
const loggerRouter = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const adminRouter = require('./src/admin/admin');
app.use('/admin',  adminRouter);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(loggerRouter("dev"));
app.use(express.static('./static'));
app.set("view engine", "pug");

require('./config/mongoose.config')(config, logger);

const staff = require('./src/staffs/staffs_router');
app.use('/staff',  staff);

const main = require('./src/main/main_router');
app.use('/',  main);

const download_xlsx = require('./src/xlsx/download_xlsx_router');
app.use('/download',  download_xlsx);

app.listen(config.port, () => {
    logger.info(`[*] 🚀 Listening on port : ${config.port} ..`);
});