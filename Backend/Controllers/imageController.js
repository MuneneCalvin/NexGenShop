import cloudinary from 'cloudinary';
import express from 'express';
import router from 'express';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// Delete image
export const deleteImage = async(req, res)=> {
    const {public_id} = req.params;
    try {
        await cloudinary.uploader.destroy(public_id);
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e.message)
    }
}

// Upload image
export const uploadImage = async(req, res)=> {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'nexgen'
        })
        res.json({msg: "Image uploaded successfully", uploadResponse})
    } catch (e) {
        res.status(400).send(e.message)
    }
}

// Get images
export const getImages = async(req, res)=> {
    try {
        const {resources} = await cloudinary.search
            .expression('folder:nexgen')
            .sort_by('public_id', 'desc')
            .max_results(30)
            .execute();
        const publicIds = resources.map((file)=> file.public_id);
        res.json(publicIds);
    } catch (e) {
        res.status(400).send(e.message)
    }
}

// Get image
export const getImage = async(req, res)=> {
    const {public_id} = req.params;
    try {
        const image = await cloudinary.v2.api.resource(public_id);
        res.json(image);
    } catch (e) {
        res.status(400).send(e.message)
    }
}

// Update image
export const updateImage = async(req, res)=> {
    const {public_id} = req.params;
    const {caption} = req.body;
    try {
        const image = await cloudinary.v2.api.update(public_id, {context: `caption=${caption}`});
        res.json(image);
    } catch (e) {
        res.status(400).send(e.message)
    }
}

// Get image by tag
export const getImageByTag = async(req, res)=> {
    const {tag} = req.params;
    try {
        const {resources} = await cloudinary.search
            .expression(`tags=${tag}`)
            .sort_by('public_id', 'desc')
            .max_results(30)
            .execute();
        const publicIds = resources.map((file)=> file.public_id);
        res.json(publicIds);
    } catch (e) {
        res.status(400).send(e.message)
    }
}

export default router;