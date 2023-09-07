const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const Property = require("../models/propertyModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./FactoryHandler");
const AppError = require("../utils/AppError");

const CLIENT_URL =
  process.env.NODE_ENV === "dev"
    ? `http://localhost:5173`
    : `https://homyz-amb.netlify.app`;

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.propertyId);

  if (!property) {
    return next(new AppError("Property does not exists", 404));
  }

  if (property.isBooked) {
    return next(new AppError("Property already Booked", 400));
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: property.title,
            description: property.description,
          },
          unit_amount: property.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer_email: req.user.email,
    success_url: `${CLIENT_URL}/payment/success/property/${property._id}`,
    cancel_url: `${CLIENT_URL}/payment/cancel`,
  });

  res.json({ id: session.id });
});

const createCheckout = async (session, status) => {
  const property = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.display_items[0].amount / 100;

  if (status === "success") {
    await Transaction.create({ property, user, price });
    await Property.findByIdAndUpdate(
      property,
      { isBooked: true },
      { runValidators: true, new: true }
    );
  } else {
    await Transaction.create({ property, user, price, status: "failed" });
  }
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  )
    createCheckout(event.data.object, "success");
  else if (
    event.type === "checkout.session.async_payment_failed" ||
    event.type === "checkout.session.expired"
  )
    createCheckout(event.data.object, "fail");

  // switch (event.type) {
  //   case 'checkout.session.async_payment_failed':
  //     const checkoutSessionAsyncPaymentFailed = event.data.object;
  //     // Then define and call a function to handle the event checkout.session.async_payment_failed
  //     break;
  //   case 'checkout.session.async_payment_succeeded':
  //     const checkoutSessionAsyncPaymentSucceeded = event.data.object;
  //     // Then define and call a function to handle the event checkout.session.async_payment_succeeded
  //     break;
  //   case 'checkout.session.completed':
  //     const checkoutSessionCompleted = event.data.object;
  //     // Then define and call a function to handle the event checkout.session.completed
  //     break;
  //   case 'checkout.session.expired':
  //     const checkoutSessionExpired = event.data.object;
  //     // Then define and call a function to handle the event checkout.session.expired
  //     break;
  //   // ... handle other event types
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  res.status(200).json({ received: true });
};

exports.createTransaction = factory.createDoc(Transaction);
exports.getTransaction = factory.getDoc(Transaction);
exports.getAllTransactions = factory.getAllDocs(Transaction);
exports.updateTransaction = factory.updateDoc(Transaction);
exports.deleteTransaction = factory.deleteDoc(Transaction);
