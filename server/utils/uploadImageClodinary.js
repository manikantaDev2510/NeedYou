import { v2 as cloudinary } from 'cloudinary';
import { ENV_VARS } from '../config/envVars.js';

cloudinary.config({
    cloud_name: ENV_VARS.CLODINARY_CLOUD_NAME,
    api_key: ENV_VARS.CLODINARY_API_KEY,
    api_secret: ENV_VARS.CLODINARY_API_SECRET_KEY
})

const uploadImageClodinary = async (image) => {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "NeedYou" }, (error, uploadResult) => {
            return resolve(uploadResult)
        }).end(buffer)
    })

    return uploadImage
}

export default uploadImageClodinary