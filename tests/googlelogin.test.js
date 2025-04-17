const { Builder, By, until } = require("selenium-webdriver");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function googleLoginTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:5173/");
    await sleep(1000);

    const googleLoginButton = await driver.findElement(By.xpath("//button[contains(., 'Login with Google')]"));
    await googleLoginButton.click();

    await driver.wait(until.elementLocated(By.css('div[jsname="LgbsSe"]')), 10000);

    const emailButton = await driver.findElement(By.xpath('(//div[@class="zfr3Q"])[1]'));
    await emailButton.click();

    await driver.wait(until.urlContains("/workspace"), 10000);

    console.log("Login test passed. User is redirected to the workspace.");

  } catch (err) {
    console.error("Google login test failed:", err);
  } finally {
    await driver.quit();
  }
})();
