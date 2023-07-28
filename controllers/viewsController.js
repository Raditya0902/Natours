const Tour = require("./../models/tourModal");
const Booking = require("./../models/bookingModal");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/userModal");

exports.renderTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });

  if (!tour) {
    next(new AppError("There is no tour with that name", 404));
  }

  //1)get the data, for the requested tour(including reviews and guides)

  //2)build the template

  //3)Render template using data from 1)
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://*.mapbox.com https://*.stripe.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("tour", {
      title: `${tour.name} tour`,
      tour,
    });
});

exports.renderOverview = catchAsync(async (req, res) => {
  //1) get tour data from collection
  const tours = await Tour.find();
  //2) Build template

  //3) Render that template using tour data from 1)
  res
    .status(200)
    // .set(
    //   "Content-Security-Policy",
    //   "connect-src 'self' https://cdnjs.cloudflare.com"
    // )
    .render("overview", {
      title: "All tours",
      tours,
    });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res
    .status(200)
    // .set(
    //   "Content-Security-Policy",
    //   "connect-src 'self' https://cdnjs.cloudflare.com"
    // )
    .render("login", {
      title: "Login into your account",
    });
});

exports.getSignupForm = catchAsync(async (req, res, next) => {
  res.status(200).render("signup", { title: "Log into your account" });
});

exports.getAccount = (req, res) => {
  res
    .status(200)
    // .set(
    //   "Content-Security-Policy",
    //   "connect-src 'self' https://cdnjs.cloudflare.com"
    // )
    .render("account", {
      title: "Your account",
    });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).render("account", {
    title: "Your account",
    user: updatedUser,
  });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  //1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });
  //2) Find tours with the returned Ids
  const tourIds = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });
  console.log(tours);
  res.status(200).render("overview", {
    title: "My Tours",
    tours,
  });
});

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === "booking")
    res.locals.alert =
      "Your booking was successful! Please check you email for a confirmation. If your booking doesn't show up here immediately, please come back later.";
  next();
};
