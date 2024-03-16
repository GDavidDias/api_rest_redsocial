const {Schema, model} = require("mongoose");
const Paginate = require("mongoose-paginate-v2");

const FollowSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    followed: {
        type: Schema.ObjectId,
        ref: "User"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

//Agrego plugin de paginacion 
FollowSchema.plugin(Paginate);

module.exports = model("Follow", FollowSchema, "follows");