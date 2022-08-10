const credentials = require('./credentials.json');
const puppeteer = require('puppeteer');
const email = credentials.email;
const password = credentials.password;

async function weekend(link) {
    const browser = await puppeteer.launch({
        headless: false, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    });
    const page = await browser.newPage();
    await page.goto('https://facebook.com');

    //Sign into facebook
    await page.focus('#email');
    await page.keyboard.type(email);
    await page.focus('#pass');
    await page.keyboard.type(password);
    await page.click('button[name=login]');

    //Go to Group Messenger
    await page.waitForNavigation();
    await page.goto(credentials.chatroom);

    //Enter tweet
    await page.waitForSelector('div[aria-label="Message"]');
    await page.focus('div[aria-label="Message"]');
   
    await page.keyboard.press('Enter');
    await page.keyboard.type(link);
    await page.keyboard.press('Enter');
    
    await browser.close();
}
    
module.exports.weekend= weekend;