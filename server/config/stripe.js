import stripe from 'stripe'
import { ENV_VARS } from './envVars.js'

const Stripe = stripe(ENV_VARS.STRIPE_SECRET_KEY)

export default Stripe