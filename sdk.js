const puppeteer = require("puppeteer");
const fs = require("fs");
const { exception } = require("console");
const { exit } = require("process");

async function genratePDf() {
  let browser;
  let page;
  try {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    //TODO:Relative path to script
    var data = fs.readFileSync("sample.json", "utf8");
    var config = JSON.parse(data);

    //TODO:Give absolute path beginning with file://
    await page.goto("file:///Users/user2/ws/express-pdf/report.html");
    //await page.goto("report.html");
    let content = await page.content();
    content = content.replace("Orgname", config.organistion);
    content = content.replace(
      "OrgDate",
      new Date().toJSON().slice(0, 10).replace(/-/g, "-")
    );
    await page.setContent(content);

    const buffer = await page.pdf({ format: "A4" });
    await browser.close();
    console.log(buffer);

    //TODO:Relative path to generated pdf
    fs.writeFileSync("abcdef.pdf", buffer);
  } catch (e) {
    console.log(e)
    await browser.close();
    //throw new Error('Something bad happened');
    await new Promise((res, rej) => setTimeout(() => res(""), 3000));
    //Check if the shell command waits
    /*await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('foo');
        }, 300);
      });*/
    console.log("somethign");
    process.exit(1);
  }
}

genratePDf();
