router.get("/handleShopperRedirect", (req, res) => {
  // Create the payload for submitting payment details
  let payload = {};
  payload["details"] = req.query;
  payload["paymentData"] = req.cookies["paymentData"];
 
  checkout.paymentsDetails(payload).then(response => {
    // Clear paymentData cookie after initially setting it in the /initiatePayment endpoint
    res.clearCookie("paymentData");
    // Conditionally handle different result codes for the shopper
    switch (response.resultCode) {
      case "Authorised":
        res.redirect("/success");
        break;
      case "Pending":
        res.redirect("/pending");
        break;
      case "Refused":
        res.redirect("/failed");
        break;
      default:
        res.redirect("/error");
        break;
    }
  });
});
router.post("/handleShopperRedirect", (req, res) => {
  let payload = {};
  payload["details"] = req.body;
  payload["paymentData"] = req.cookies["paymentData"];
 
  checkout.paymentsDetails(payload).then(response => {
    res.clearCookie("paymentData");
    switch (response.resultCode) {
      case "Authorised":
        res.redirect("/success");
        break;
      case "Pending":
        res.redirect("/pending");
        break;
      case "Refused":
        res.redirect("/failed");
        break;
      default:
        res.redirect("/error");
        break;
    }
  });
});

module.exports = router;