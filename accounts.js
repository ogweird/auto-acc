const puppeteer = require("puppeteer");
const fs = require("fs/promises");

const emails = JSON.parse(fs.readFileSync("generated/emails.json", "utf-8"));
const passwords = JSON.parse(fs.readFileSync("generated/passwords.json", "utf-8"));

var generated = new Map();

async function create_account(email, password) {
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        console.error("Invalid email or password:", { email, password });
        return;
    }

    const browser = await puppeteer.launch({
        args: [
            '--incognito'
        ],

        headless: false
    });

    const page = await browser.newPage();

    try {
        await page.goto("https://example.app/register", { waitUntil: "networkidle2" });

        await page.type("#email-input", email);
        await page.type("#password-input", password);

        await page.click("#any-checkbox-input");

        await page.click('button[type="submit"]');

        await page.waitForNavigation();

        generated.set(email, password);
        console.log("Created: " + email + ":" + password);
    } catch (error) {
        console.error("Error creating account:", error);
    } finally {
        await browser.close();
    }
}

async function create_accounts() {
    const MIN_LEN = Math.min(emails.length, passwords.length);
    
    for (let i = 0; i < MIN_LEN; i++) {
        await create_account(emails[i], passwords[i]);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Delay between creation of accounts [OPTIONAL]
    }

    await fs.mkdir("generated", { recursive: true });

    await fs.writeFile(
        "generated/accounts.json",
        JSON.stringify(Object.fromEntries(generated), null, 2)
    );
}

create_accounts().catch(console.error);