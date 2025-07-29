function clickElementByTextContractID(textParam) {
  // Build the XPath using the input parameter
  
let xpath = "//div[contains(@class, 'ng-star-inserted')]//span[contains(normalize-space(.), '" + textParam + "')]";
  
  // Find the element
  let element = Aliases.browser.pageQms.FindElement(xpath);
  
  if (element.Exists) {
    element.Click();
    Log.Message("Clicked on the element associated with: " + textParam);
  } else {
    Log.Error("Element not found for text: " + textParam);
  }
}