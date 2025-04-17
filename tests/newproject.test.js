const { Builder, By, until } = require("selenium-webdriver");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomEmoji() {
  const emojis = ["🚀", "🎯", "📈", "🛠️", "💡", "📊", "🌟", "🔥", "💼"];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function getRandomProjectName() {
  const adjectives = ["Amazing", "Awesome", "Innovative", "Creative", "Dynamic", "Visionary"];
  const nouns = ["App", "Website", "System", "Platform", "Solution", "Project"];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
}

(async function loginAndCreateProjectTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  const email = "mahidhar.business@gmail.com";
  const password = "Testuser@1";

  const projectName = getRandomProjectName(); 
  const projectDescription = `This is a new project created automatically by Selenium.`;

  const emoji = getRandomEmoji();  

  try {
    await driver.get("http://localhost:5173/");
    await sleep(1000);


    await driver.wait(until.elementLocated(By.name("email")), 5000);
    await driver.findElement(By.name("email")).sendKeys(email);

    await driver.wait(until.elementLocated(By.name("password")), 5000);
    await driver.findElement(By.name("password")).sendKeys(password);

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/workspace/"), 5000);

    console.log("Login test passed.");
    console.log("Credentials used:");
    console.log("Email:    ", email);

    const newProjectButton = await driver.wait(
      until.elementLocated(By.xpath("//button[span[contains(text(),'New Project')]]")),
      5000
    );

    await driver.wait(until.elementIsVisible(newProjectButton), 2000);
    await driver.wait(until.elementIsEnabled(newProjectButton), 2000);

    await newProjectButton.click();

    console.log("Clicked 'New Project' button.");

    await driver.wait(
      until.urlContains("?new-project=true"),
      5000
    );
    console.log("New Project form is open.");


    await driver.wait(until.elementLocated(By.css("div[role='dialog']")), 5000);


    await driver.wait(until.elementLocated(By.name("name")), 5000);

    await driver.findElement(By.name("name")).sendKeys(projectName);
    await driver.findElement(By.name("description")).sendKeys(projectDescription);

    await driver.findElement(By.css("button[aria-label='Select Emoji']")).click();
    await driver.wait(until.elementLocated(By.xpath(`//span[text()='${emoji}']`)), 5000);
    await driver.findElement(By.xpath(`//span[text()='${emoji}']`)).click();

    await driver.findElement(By.css("button[type='submit']")).click();


    await driver.wait(until.urlContains("/project/"), 5000);

    console.log("Project creation test passed.");
    console.log("Project created:");
    console.log("Project Name: ", projectName);
    console.log("Emoji: ", emoji);
  } catch (err) {
    console.error("Test failed:", err);
    console.log("Attempted with:");
    console.log("Email:    ", email);
  } finally {
    await driver.quit();
  }
})();
