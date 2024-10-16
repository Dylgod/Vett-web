import Stripe from 'stripe';
import { STRIPE_SECRET } from '$env/static/private';

export const stripe = new Stripe(STRIPE_SECRET, {
  apiVersion: '2024-09-30.acacia',
  stripeAccount: 'acct_1MZkB4BwhpPE9Et6'
});