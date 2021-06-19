let PhotoModel = require('../models/photo');

let PhotoController = {
    
    create: async (req, res) => {
        let newPhoto = new PhotoModel(req.body);
        let savedPhoto = newPhoto.save();
        res.json(savedPhoto);
    },

    delete: async (req, res) => {
        let deleted = PhotoModel.findOneAndDelete({ id: req.body.id });
        res.json(deleted);
    },

    all: async (req, res) => {
        let photos = PhotoModel.find();
        res.json(photos); 
    }
}