
const fs=require("fs");

const convertToPdf=require("./pdfConverter.js")

async function generatePdf()
{
console.log("generating pdfs")
    let directory=__dirname+"/"+"IPL2020";
   
    
   
    const folders=fs.readdirSync(directory);
 
    for(var i=0;i<folders.length;i++)
        {
            let folderPath=directory+"/"+folders[i];
           let files= fs.readdirSync(folderPath);
           
            for(var k=0;k<files.length;k++)
            {
                let filePath=folderPath+"/"+files[k];
                
                let data=fs.readFileSync(filePath);
                data=JSON.parse(data);
               await convertToPdf(data,filePath);
        
            }
            
            
            
        }
}



module.exports=generatePdf;