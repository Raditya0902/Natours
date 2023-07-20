const stripe = Stripe(
  "pk_test_51NVARvSDW1Zc90wObfNgrGuwGFbx410ij074Tu4TldkfEwQlnHsm4UC9cjXNn7kAx59MmrJ0bV19rN5WyPnO3HHt00R5eL9uNs"
);
const bookBtn = document.getElementById("book-tour");
const bookTour = async (tourId) => {
  try {
    // 1 get checkout session from API
    const session = await axios({
      method: "GET",
      url: `/api/v1/bookings/checkout-session/${tourId}`,
    });
    // const session = await fetch(`/api/v1/bookings/checkout-session/${tourId}`);
    //console.log(session);
    //2 Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};

if (bookBtn) {
  bookBtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing...";
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
