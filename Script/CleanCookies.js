function launchChromeWithClearCookies() {
  var options = "--user-data-dir=C:\\Temp\\TestProfile --disable-cache";
  var browser = Browsers.Item(btChrome);
  browser.RunOptions = options;
  browser.Run();
  
  Log.Message("Chrome launched with a clean profile to ensure no cookies are retained.");
}
