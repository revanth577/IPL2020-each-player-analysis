const pug=require("pug");
const puppeteer=require("puppeteer")
const fs=require("fs");
async  function  convertToPdf(player,filePath)
{
    
    fs.unlinkSync(filePath);
    filePath=filePath.split(".json")[0];
    console.log(filePath);
  

let renderData=pug.renderFile('index.pug', {
  player:player
});

  
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
console.log("pdf done")
await browser.close();

}




module.exports=convertToPdf;
