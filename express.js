const puppeteer = require("puppeteer");
const http = require("http");
const express = require("express");


const app = express()
const port = 8081

app.get('/pdf', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(`
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>HTML to PDF Example</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <div id="invoice">
    <h1>Our Invoice</h1>
    <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvd2Vyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
  </div>
</body>
</html>
`)
  const buffer = await page.pdf({ format: "A4" });
  await browser.close();

    res.end(buffer);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})