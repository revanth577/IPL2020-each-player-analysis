const pug=require("pug");
const puppeteer=require("puppeteer")


async function  convertToPdf(player,filePath)
{

// player=[
//     {"runs":"0","balls":"5","fours":"0","sixes":"0","opponent":"Mumbai Indians","strikeRate":"0.00"},
//     {"runs":"2","balls":"2","fours":"0","sixes":"0","opponent":"Sunrisers Hyderabad","strikeRate":"100.00"}
//     ]

filePath=filePath.split(".json")[0];
let renderData=pug.renderFile('index.pug', {
  player:player
});

console.log(renderData)
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
<div>
${renderData}

</div>
</body>
</html>
`)
const buffer = await page.pdf({path:filePath+".pdf", format: "A4" });
await browser.close();

}



module.exports=convertToPdf;
