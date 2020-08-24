router.get("getPaymentMethods", (req, res) => {
  checkout
    .paymentMethods({
      channel: "Web",
      merchantAccount: config.merchantAccount
    })
    .then(response => {
      // Adyen API response is passed to the client
      res.render("payment", {
        response: JSON.stringify(response)
      });
    });
});

module.exports = router;