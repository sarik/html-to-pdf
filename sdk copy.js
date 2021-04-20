const puppeteer = require("puppeteer");
const fs = require("fs");

async function genratePDf() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("file:///Users/user2/ws/express-pdf/report.html");
  let content = await page.content();
  content = content.replace("Orgname", "Shivom");
  content = content.replace("OrgDate", new Date().toJSON().slice(0,10).replace(/-/g,'-'));
  await page.setContent(content);

  const buffer = await page.pdf({ format: "A4" });
  await browser.close();
  console.log(buffer);
  fs.writeFileSync("abcdef.pdf", buffer);

  /*  fs.readFile("report.html", "utf8", async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    //console.log(data)
    //data = data.replace("OrgName","Check")
    //data = data.replace("Date","11-11-11")
    await page.setContent(data);
    const buffer = await page.pdf({ format: "A4" });
    await browser.close();
    console.log(buffer);
    fs.writeFileSync("abdc.pdf", buffer);
  });*/
}

genratePDf();
