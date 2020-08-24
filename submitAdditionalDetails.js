router.post("/submitAdditionalDetails", (req, res) => {
  // Create the payload for submitting payment details
  let payload = {};
  payload["details"] = req.body.details;
  payload["paymentData"] = req.body.paymentData;
  // Return the response back to client
  // (for further action handling or presenting result to shopper)
  checkout.paymentsDetails(payload).then(response => {
    let resultCode = response.resultCode;
    let action = response.action || null;
    res.json({ action, resultCode });
  });
});


module.exports = router;