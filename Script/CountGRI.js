function countGRIElementsStaging() {

  var griElements = Aliases.browser.pageQms2.FindElements("//div[contains(text(), 'GRI')]");

  var griCount = griElements.length;

  Log.Message("There are 'GRI':" + griCount);
 
  Project.Variables.countGRIStaging = griCount;

  return griCount;
}

function countGRIElementsProd() {

  var griElements = Aliases.chrome.pageQms2.FindElements("//div[contains(text(), 'GRI')]");

  var griCountProd = griElements.length;

  Log.Message("There are 'GRI':" + griCountProd);
 
  Project.Variables.countGRIProd = griCountProd;

  return griCountProd;
}

function countGRIElementsStagingMSC() {

  var griElements = Aliases.browser.pageQms2.FindElements("//div[contains(text(), 'GRI')]");

  var griCountMSC = griElements.length;

  Log.Message("There are 'GRI':" + griCountMSC);
 
  Project.Variables.countGRIStagingMSC = griCountMSC;

  return griCountMSC;
}

function countGRIElementsProdMSC() {

  var griElements = Aliases.chrome.pageQms2.FindElements("//div[contains(text(), 'GRI')]");

  var griCountProdMSC = griElements.length;

  Log.Message("There are 'GRI':" + griCountProdMSC);
 
  Project.Variables.countGRIProdMSC = griCountProdMSC;

  return griCountProdMSC;
}


