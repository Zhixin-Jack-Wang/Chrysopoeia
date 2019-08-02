const mongoose = require('mongoose');


const ConversationSchema = new mongoose.Schema({
    from:String,
    message:String,
    date:{
        type:Date,
        default: Date.now
    }
})

const OfferSchema = new mongoose.Schema({
    offerId:String,
    initiator:String,
    receiver:String,
    moneyoffer:Object,
    itemoffer: Object,
    targetItem:Object,
    status:String,
    date:{
        type:Date,
        default:Date.now
    },
    conversation:[ConversationSchema],
})

const InventorySchema = new mongoose.Schema({
    pname:String,
    expect:String,
    img:String,
    mode:String,
    description:String,
    owneremail:String,
    ownername:String
})
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    inventory:[InventorySchema],
    offer:[OfferSchema]
});

UserSchema.query.byEmail = function(email){
    return this.where({email:email});    
}

const User = mongoose.model('User', UserSchema);

module.exports = User;