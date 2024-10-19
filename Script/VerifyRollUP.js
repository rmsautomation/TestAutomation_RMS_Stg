﻿function Verify_RololUp() {
 // Remove " USD" from original_margin and convert to number
  var original_total = Number(Project.Variables.total_price.replace(/,/g, '').replace(' USD', ''));
  var new_base_rate = Number(Project.Variables.new_baseRate.replace(/,/g, '').replace(' USD', ''));
  var base_rate_flat =Number(Project.Variables.base_rate_flat.replace(/,/g, '').replace(' USD', ''));
  // Perform the addition
  var actualResult_totalPrice = Number(Project.Variables.new_totalPrice.replace(/,/g, '').replace(' USD', ''));
  
  var expectedResult = new_base_rate + base_rate_flat;
  //Round the expected Result
  var expectedResultRound = Math.round(expectedResult * 100) / 100;

  // Verify the result
  if (actualResult_totalPrice == expectedResultRound && expectedResultRound == original_total  ) {
    Log.Message("The result is correct: " + actualResult_totalPrice);
    return true;
  } else {
    Log.Error("The result is incorrect. Expected: " + expectedResultRound + ", but got: " + actualResult_totalPrice);
    return false;
  }
}