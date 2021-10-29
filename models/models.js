const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    full_name: { 
        type: String, 
        required: true 
    }
});
const User = mongoose.model("users", UserSchema);

const ReportSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    col: {
        g1: {
            type: Number,
            default: 0,
        },
        g2: {
            type: Number,
            default: 0,
        },
        g3: {
            type: Number,
            default: 0,
        },
        g4: {
            type: Number,
            default: 0,
        },
        g5: {
            type: Number,
            default: 0,
        },
        g6: {
            type: Number,
            default: 0,
        },
        g7: {
            type: Number,
            default: 0,
        },
        g8: {
            type: Number,
            default: 0,
        },
        g9: {
            type: Number,
            default: 0,
        },
        g10: {
            type: Number,
            default: 0,
        },
        g11: {
            type: Number,
            default: 0,
        },
        g12: {
            type: Number,
            default: 0,
        },
        g13: {
            type: Number,
            default: 0,
        },
        g14: {
            type: Number,
            default: 0,
        },
        g15: {
            type: Number,
            default: 0,
        },
        g16: {
            type: Number,
            default: 0,
        },
        g17: {
            type: Number,
            default: 0,
        },
        g18: {
            type: Number,
            default: 0,
        },
        g19: {
            type: Number,
            default: 0,
        },
        g20: {
            type: Number,
            default: 0,
        },
        g21: {
            type: Number,
            default: 0,
        },
        g22: {
            type: Number,
            default: 0,
        },
        g23: {
            type: Number,
            default: 0,
        },
        g24: {
            type: Number,
            default: 0,
        }
    }
});
const Report = mongoose.model("reports", ReportSchema);

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});
const Admin = mongoose.model("admins", AdminSchema);

module.exports.User = User;
module.exports.Report = Report;
module.exports.Admin = Admin;