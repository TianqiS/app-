let mongoose = require('./db');

let typeSchema = new mongoose.Schema({
    type_id: {
        type: Number
    },
    article_type: {
        type: String
    },
    detail: {
        type: String
    }
});

let advertiseSchema = new mongoose.Schema({
    attachment_list: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

let attachmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    attachment_url: {
        type: String
    }
});

let adminSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

let competitionSchema = new mongoose.Schema({
    start_time: {
        type: String,
        required: true
    },
    final_time: {
        type: String,
        required: true
    },
    attach_id: {
        type: [String]
    },
    qualification: {
        type: String,
        required: true
    },
    arrangement: {
        type: String,
        required: true
    }
});

let lectureSchema = new mongoose.Schema({
    teacher: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
});

let newsSchema = new mongoose.Schema({
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    }
});

let recruitSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    people: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
});

let articleSchema = new mongoose.Schema({
    _id: {
      type: String
    },
    title: {
        type: String
    },
    context: {
        type: String
    },
    type: {
        type: Number
    },
    template: {
        type: Object
    },
    create_time: {
        type: Date,
        required: true
    },
    update_time: {
        type: Date
    }
});



exports.type = mongoose.model('type', typeSchema);
exports.article = mongoose.model('article', articleSchema);
exports.attachment = mongoose.model('attachment', attachmentSchema);
