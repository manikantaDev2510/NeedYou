import jwt from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVars.js'

export const auth = async (request, response, next) => {
    try {
        const token = request.cookies.accessToken || request?.headers?.authorization?.split(" ")[1]

        if (!token) {
            return response.status(401).json({
                message: "Provide token"
            })
        }

        const decode = await jwt.verify(token, ENV_VARS.SECRET_KEY_ACCESS_TOKEN)

        if (!decode) {
            return response.status(401).json({
                message: "unauthorized access",
                error: true,
                success: false
            })
        }

        request.userId = decode.id

        next()

    } catch (error) {
        return response.status(500).json({
            message: "You have not login",///error.message || error,
            error: true,
            success: false
        })
    }
}