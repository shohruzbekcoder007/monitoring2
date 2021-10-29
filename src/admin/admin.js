const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const mongoose = require('mongoose');

const { User, Report, Admin } = require('./../../models/models');

AdminBro.registerAdapter(AdminBroMongoose);


let adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin',
    branding: {
        logo: 'https://stat.uz/images/uzstat.png',
        companyName: 'Stat Project'
    },
    softwareBrothers: false,

});

const routerAdm = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
    authenticate: async (email, password) => {
        const admin = await Admin.findOne({email: email, password: password})
        // const count = await Admin.countDocuments();
        // if(count == 0) return true;
        if (admin) {
            return true;
        } else {
            return false;
        }
      },
      cookiePassword: 'some-secret-password-used-to-secure-cookie',
});

module.exports = routerAdm;