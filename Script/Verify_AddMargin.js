
function Verify_AddMarginOLD(margin) {
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

function Verify_AddMargin(margin) {
  // Validate original_margin
  var rawOriginal = Project.Variables.original_margin;

  if (!rawOriginal) {
    Log.Error("original_margin is NULL or undefined. Value received: " + rawOriginal);
    return false;
  }

  // Clean and convert original margin
  var originalMargin = Number(
    rawOriginal.replace(" USD", "").replace(",", "").trim()
  );

  if (isNaN(originalMargin)) {
    Log.Error("originalMargin could not be converted to a number. Value: " + rawOriginal);
    return false;
  }

  // Clean and convert new_margin
  var actualResult = Number(
    Project.Variables.new_margin.replace(" USD", "").replace(",", "").trim()
  );

  if (isNaN(actualResult)) {
    Log.Error("new_margin could not be converted to a number. Value: " + Project.Variables.new_margin);
    return false;
  }

  // Expected result
  var expectedResult = margin + originalMargin;

  // Compare
  if (actualResult === expectedResult) {
    Log.Message("The result is correct: " + actualResult);
    return true;
  } else {
    Log.Error("The result is incorrect. Expected: " + expectedResult + ", but got: " + actualResult);
    return false;
  }
}
