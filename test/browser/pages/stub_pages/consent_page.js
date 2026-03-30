const { expect } = require("@playwright/test");

class ConsentPage {
  constructor(page) {
    this.page = page;
    this.consentDVACheckbox = page.locator(
      'xpath=//*[@id="consentDVACheckbox"]'
    );
    this.consentDVLACheckbox = page.locator('xpath=//*[@id="consentCheckbox"]');
    this.consentContinueButton = page.locator('xpath=//*[@id="continue"]');
  }

  async assertUrlPathContains(path) {
    const escapeRegExp = (string) => {
      return string.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
    };
    const regex = new RegExp(escapeRegExp(path));
    await expect(this.page).toHaveURL(regex);
  }

  async clickConsentCheckbox(drivingLicenceConsent) {
    if (drivingLicenceConsent === "DVA") {
      await this.consentDVACheckbox.click();
    } else {
      await this.consentDVLACheckbox.click();
    }
  }

  async clickConsentPageContinue() {
    await this.consentContinueButton.click();
  }
}

module.exports = ConsentPage;
