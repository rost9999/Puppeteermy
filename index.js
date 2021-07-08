const puppeteer = require('puppeteer');
const fs = require('fs')

const url = process.argv[2];



async function Parse(url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080});
  await page.goto(url);
  await page.addScriptTag({path: './content.js'});
  const getData = async() => {
    return await page.evaluate(async () => {
        return await new Promise(resolve => {
          setTimeout(() => {
                resolve(makeSnapshot(document.querySelector("body")));
          }, 3000)
      })
    })
  }  
  let data = await getData();
  let output = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style type="text/css">
        ${data['styles']}
      </style>
  </head>
  <body>
  ${data['html']}
  </body>
  </html>
  `


  // fs.writeFile('htmlsites.html', output, function (err) {
  //   if (err) return console.log(err);
  // });
  // fs.writeFile('csssites.html', data['styles'], function (err) {
  //   if (err) return console.log(err);
  //   console.log('done css');
  // });

  await browser.close();
  console.log(output);
  
}

Parse(url);
