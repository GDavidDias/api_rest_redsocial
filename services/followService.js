const Follow = require("../models/follow");

const followUserIds = async (identityUserId)=>{
    
    let following = await Follow.find({"user": identityUserId})
                                .select({"_id":0, "_v":0 , "user":0})
                                .exec();
    
    let followers = false;

    return{
        following,
        followers
    }
}

const followThisUser = async (identityUserId, profileUserId)=>{

}

module.exports = {
    followUserIds,
    followThisUser
}