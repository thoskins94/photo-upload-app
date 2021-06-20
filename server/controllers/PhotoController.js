let PhotoModel = require('../models/photo');
const path = require('path');
var fs = require('fs');

module.exports = {   
    
    upload: async (req, res) => {
        try {
            let reqPath = path.join(__dirname, '../');
            let img = {
                name: req.body.name,
                desc: req.body.desc,
                img: {
                    data: await fs.readFileSync(path.join(reqPath, 'uploads/' , req.file.filename)),
                    contentType: 'image/png'
                },
                user: req.body.userId,
                fileName: req.file.filename
            }
            PhotoModel.create(img, (err, item) => {
                if(err) {
                    console.log(err);
                }
                else {
                    res.json(item);
                }
            });
        } catch(error)  {
            console.log(error);
        }
    },

    remove: async(req, res) => {
        let deleted = await PhotoModel.findOneAndDelete({ id: req.id }, (err, photo) => {
            let reqPath = path.join(__dirname, '../');
            fs.unlink(reqPath + 'uploads/' + photo.filename, function() {
                console.log('deleted')
            })
        });
        await res.json(deleted);
    },

    all: async(req, res) => {
        let photos = await PhotoModel.find();
        await res.json(photos); 
    },

    getByUser: async(req, res) => {
        let photos = await PhotoModel.find({ user: req.userId });
        await res.json(photos);
    }
 }