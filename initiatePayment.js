// Note the jsonParser instance to help read the bodies of incoming JSON data
router.post("/initiatePayment", (req, res) => {
  checkout
    .payments({
      amount: { currency: "EUR", value: 1000 },
      reference: "12345",
      merchantAccount: config.merchantAccount,
      channel: "Web",
      returnUrl: "http://localhost:8080/handleShopperRedirect",
      browserInfo: req.body.browserInfo,
      paymentMethod: req.body.paymentMethod
    })
    .then(response => {
      const { resultCode, action } = response;
 
      if (action.paymentData) {
        res.cookie("paymentData", action.paymentData);
      }
 
      res.json({ resultCode, action });
    });
});


module.exports = router;