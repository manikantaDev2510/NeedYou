import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import { ENV_VARS } from './config/envVars.js'
import { connectDB } from './config/db.js'
import userRouter from './routes/user.route.js'
import categoryRouter from './routes/category.route.js'
import uploadRouter from './routes/upload.route.js'
import subCategoryRouter from './routes/subCategory.route.js'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'
import addressRouter from './routes/address.route.js'
import orderRouter from './routes/order.route.js'


const app = express()
app.use(cors({
    credentials: true,
    origin: ENV_VARS.FRONTEND_URL,
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"));
app.use(helmet({
    crossOriginResourcePolicy: false
}))

const PORT = ENV_VARS.PORT

app.get('/', (req, res) => {
    res.json({
        message: `✅ Server is running on port ${PORT}`
    });
});

app.use('/api/user', userRouter)
app.use("/api/category", categoryRouter)
app.use("/api/file", uploadRouter)
app.use("/api/subcategory", subCategoryRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)
app.use('/api/order', orderRouter)

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
    connectDB();
})