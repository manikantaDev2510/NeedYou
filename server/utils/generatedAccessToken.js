import jwt from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVars.js'

const generatedAccessToken = async(userId)=>{
    const token = await jwt.sign({ id : userId},
        ENV_VARS.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn : '5h'}
    )

    return token
}

export default generatedAccessToken