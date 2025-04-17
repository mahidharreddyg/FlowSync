const { Builder, By, until } = require("selenium-webdriver");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function loginTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  const email = "mahidhar.business@gmail.com";
  const password = "Testuser@1";

  try {
    await driver.get("http://localhost:5173/");
    await sleep(1000);

    await driver.wait(until.elementLocated(By.name("email")), 5000);
    await sleep(500);
    await driver.findElement(By.name("email")).sendKeys(email);

    await sleep(500);
    await driver.findElement(By.name("password")).sendKeys(password);

    await sleep(500);
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/workspace/"), 5000);
    console.log("Login test passed.");
    console.log("Credentials used:");
    console.log("Email:    ", email);
    console.log("Password: ", password);

    await sleep(5000);
  } catch (err) {
    console.error("Login test failed:", err);
    console.log("Attempted with:");
    console.log("Email:    ", email);
    console.log("Password: ", password);
  } finally {
    await driver.quit();
  }
})();
