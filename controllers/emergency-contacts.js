const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('emergency_contacts').find();
    result.toArray().then((emergency_contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(emergency_contacts);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts]
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('emergency_contacts').find({ _id: contactId });
    result.toArray().then((emergency_contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(emergency_contacts[0]);
    });
};

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts]
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        relationship: req.body.relationship,
        address: req.body.address,
        email: req.body.email,
        preferredContactMethod: req.body.preferredContactMethod,
    };
    const response = await mongodb.getDatabase().db().collection('emergency_contacts').insertOne(contact);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }

};

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts]
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        relationship: req.body.relationship,
        address: req.body.address,
        email: req.body.email,
        preferredContactMethod: req.body.preferredContactMethod,
    };
    const response = await mongodb.getDatabase().db().collection('emergency_contacts').replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }

};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts]
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('emergency_contacts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }

};





module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};