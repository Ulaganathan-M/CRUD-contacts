const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },

    name: {
        type:String,
        requied: [true, "please add Contact Name"]
    },
    email : {
        type:String,
        requied: [true, "please add Contact Email Address"]
    },
    phone : {
        type:String,
        requied: [true, "please add Contact Phone number"]
    }

},
{
    timestamps: true
})

module.exports = mongoose.model("Contact", contactSchema)