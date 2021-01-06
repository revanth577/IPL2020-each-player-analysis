
const fs=require("fs");

const pdfConverter=require("./pdfConverter.js")

function generatePdf()
{
    console.log("generating pdf");
    
    let directory=__dirname+"/"+"IPL2020";
    
    fs.readdir(directory,(err,folders)=>{
        
        
        for(var i=0;i<folders.length;i++)
        {
        let folderPath=directory+"/"+folders[i];
        
        fs.readdir(folderPath,(err,files)=>{
            
            
            for(var k=0;k<files.length;k++)
            {
                let filePath=folderPath+"/"+files[k];
                let data=fs.readFileSync(filePath);
                
                data=JSON.parse(data);
                
                pdfConverter(data,filePath);
                
            }
            
        })
            
        }
        
        
        
        
        
    })
    

}



module.exports=generatePdf;