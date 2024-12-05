// Load environment variables
require("dotenv").config();

// Utility function to parse cookies from environment variables
function getTrelloCookies() {
  try {
    const cookies = JSON.parse(process.env.TRELLO_COOKIE); // Parse cookies
    console.log("Parsed cookies:", cookies);
    return cookies;
  } catch (error) {
    console.error("Failed to parse TRELLO_COOKIE:", error.message);
    process.exit(1); // Exit if cookies are invalid
  }
}

// Utility function to set cookies in the browser
async function setBrowserCookies(cookies) {
  console.log("Setting cookies...");
  for (const cookie of cookies) {
    try {
      await browser.setCookies(cookie); // Apply each cookie
      console.log(`Set cookie: ${cookie.name}`);
    } catch (error) {
      console.error(`Failed to set cookie: ${cookie.name}`, error);
    }
  }
}

describe("Trello Board Page", () => {
  before(async () => {
    // Navigate to Trello Boards page
    console.log("Navigating to Trello Boards page...");
    await browser.url("https://trello.com/u/balazscservenak/boards");

    // Get cookies from environment variables
    const cookies = getTrelloCookies();

    // Set cookies in the browser
    await setBrowserCookies(cookies);

    // Refresh the page to apply cookies
    console.log("Refreshing page to apply cookies...");
    await browser.refresh();
  });

  it("should check if the 'Create' button is displayed", async () => {
    // Locate the "Create" button
    const createButton = await browser.$(
      '[data-testid="header-create-menu-button"]'
    );
    const isDisplayed = await createButton.isDisplayed();

    console.log("Is 'Create' button displayed?", isDisplayed);

    // Assert that the "Create" button is visible
    expect(isDisplayed).toBe(true);
  });
});
