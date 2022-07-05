//Libraries
// require('dotenv').config();
import express from 'express';
import multer from 'multer';

//Database model
import { ImageModel } from '../../database/allModels';

//Utilities
import { S3Upload } from '../../utility/AWS/S3';

const Router = express();

//Multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });


/*
Route       /
Des         Uploading given image to S3 bucket, and then saving the file to mongodb
Params      None
Access      Public
Method      POST
*/

Router.post('/', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        //S3 Bucket options
        const bucketOptions = {
            Bucket: "yummilicious",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };

        const uploadImage = await S3Upload(bucketOptions);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;