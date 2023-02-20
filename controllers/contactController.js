const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModule")

//@desc Get all contacts
//@routs GET /api/contacts
//@access private

const getContacts = asyncHandler(async(req,res) => {
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})

//@desc Create all contacts
//@routs POST /api/contacts
//@access private

const createContact = asyncHandler(async(req,res) => {
    console.log("The requiest body is : ",req.body);
    const{name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("all fields are mandatory... ")
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })

    res.status(201).json(contact)
})

//@desc get contact by id
//@routs GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    res.status(200).json(contact)
})

//@desc update contact by id
//@routs PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    if(contact.user_id.toString()!== req.user.id) {
        res.status(403)
        throw new Error ("User don't have permission to update other user contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact)
})

//@desc Delete contact by id
//@routs DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    
    if(contact.user_id.toString()!== req.user.id) {
        res.status(403)
        throw new Error ("User don't have permission to delete other user contact")
    }

    await contact.remove();
    res.status(200).json(contact)
})



module.exports = {getContacts,getContact,createContact,updateContact,deleteContact}
