﻿
function Verify_AddMargin(margin) {
  // Remove " USD" from original_margin and convert to number
  var originalMargin = Number(Project.Variables.original_margin.replace(" USD", ""));

  // Perform the addition
  var actualResult = Project.Variables.new_margin.replace(" USD", "");
  var expectedResult = margin + originalMargin;

  // Verify the result
  if (actualResult == expectedResult) {
    Log.Message("The result is correct: " + actualResult);
    return true;
  } else {
    Log.Error("The result is incorrect. Expected: " + expectedResult + ", but got: " + actualResult);
    return false;
  }
}
