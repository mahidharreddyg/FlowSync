const { Builder, By, until } = require("selenium-webdriver");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateUniqueEmail() {
  const timestamp = Date.now();
  return `testuser${timestamp}@gmail.com`;
}

(async function signupTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  const email = generateUniqueEmail();
  const password = "Testuser@1";

  try {
    await driver.get("http://localhost:5173/sign-up");
    await sleep(1000);

    await driver.wait(until.elementLocated(By.name("name")), 5000);
    await sleep(300);
    await driver.findElement(By.name("name")).sendKeys("Test User");

    await sleep(300);
    await driver.findElement(By.name("email")).sendKeys(email);

    await sleep(300);
    await driver.findElement(By.name("password")).sendKeys(password);

    await sleep(500);
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/"), 5000);
    console.log("Signup test passed.");
    console.log("Credentials used:");
    console.log("Email:    ", email);
    console.log("Password: ", password);

    await sleep(1000);


    await driver.findElement(By.name("email")).sendKeys(email);
    await driver.findElement(By.name("password")).sendKeys(password);
    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/workspace"), 5000);
    console.log("Login test passed.");

    await sleep(2500); 

  } catch (err) {
    console.error("Test failed:", err);
    console.log("Attempted with:");
    console.log("Email:    ", email);
    console.log("Password: ", password);
  } finally {
    await driver.quit();
  }
})();
