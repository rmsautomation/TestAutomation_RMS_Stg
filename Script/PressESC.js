﻿function PerssEsc(baseUrl) {
  var browser = Sys.Browser("chrome");
  var page = browser.Page(baseUrl + "qms/#/rate-search");
  
  // Send the ESC key to the page
  page.Keys("[Esc]");
}

function PerssEscMargin(baseUrl) {
  var browser = Sys.Browser("chrome");
  var page = browser.Page(baseUrl + "qms/#/control-panel/margin-management");
  
  // Send the ESC key to the page
  page.Keys("[Esc]");
}

function PerssEscQF(baseUrl) {
  var browser = Sys.Browser("chrome");
  var page = browser.Page(baseUrl + "qms/#/control-panel/quote-form-builder");
  
  // Send the ESC key to the page
  page.Keys("[Esc]");
}
