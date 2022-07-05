//Libraries
import express from "express";

//Database Model
import { MenuModel } from "../../database/allModels";
import { ImageModel } from "../../database/allModels";

const Router = express();

/*
Route       /list
Des         Get all list of Menu based on id of restaurant
Params      _id
Access      Public
Method      GET
*/

Router.get('/list/:_id', async (req, res) => {
    try {
        const _id = req.params;
        const menus = await MenuModel.findOne(_id);

        return res.json({ menus });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route       /image
Des         Get Menu image based on id
Params      _id
Access      Public
Method      GET
*/

Router.get('/image/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const menus = await ImageModel.findOne(_id);

        return res.json({ menus });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;

