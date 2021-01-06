let request=require("request")
let cheerio=require("cheerio")
let fs=require("fs")
let path=require("path")


function matchDetails(url){
    

request(url,macthLink)
    
}

//"https://www.cricbuzz.com/cricket-scores/30330/mi-vs-csk-1st-match-indian-premier-league-2020"


function macthLink(err,res,html)
{
    
    if(err==null && res.statusCode==200)
    {
        giveScoreCardLink(html)
    }
    else if(res.statusCode==404)
    {
        console.log("invliad page")
    }
    else{
        console.log(err)
        console.log(res)
    }


}


function giveScoreCardLink(html)
{
   let $=cheerio.load(html)
   let matches=$(".cb-nav-tab")
   let link=$(matches[1]).attr("href")
   let fullLink="https://www.cricbuzz.com"+link
   
   request(fullLink,getScoreCardLink)
   
}


function getScoreCardLink(err,res,html)
{
    
    if(err==null && res.statusCode==200)
    {
        getScoreCard(html)
    }
    else{
        console.log(err)
        console.log(res)
    }
    
    
    
}



function getScoreCard(html)
{
    
    // fs.writeFileSync("data.html",html)
    
    /*
    
    INNINGs 1 of a match
    
    
    */
    
    
    
    let $=cheerio.load(html)
    
    let inn1=$("#innings_1 div.cb-col.cb-col-100.cb-ltst-wgt-hdr")
    let inn2=$("#innings_2 div.cb-col.cb-col-100.cb-ltst-wgt-hdr")
    let batsmens=$(inn1).find(".cb-col.cb-col-100.cb-scrd-itms")
   let opponent=$(inn2).find(".cb-col.cb-col-100.cb-scrd-hdr-rw").text().split("Innings")[0].trim()
    let team=$(inn1).find(".cb-col.cb-col-100.cb-scrd-hdr-rw").text().split("Innings")[0].trim()
    
    
    for(i=0;i<batsmens.length;i++)
    {
        if($(batsmens[i]).text().includes("Extras"))
        {
            break;
        }
        let batsmen=$(batsmens[i]).find(".cb-col.cb-col-27").text().trim()
        batsmen=batsmen.split(" ")
        let name="";
        for(var k=0;k<batsmen.length;k++)
        {
            if(batsmen[k][0]!='(')
            {
                name+=batsmen[k];
            }
            else{
                break;
            }
        }
        batsmen=name;
        
        
        let runs=$(batsmens[i]).find(".cb-col.cb-col-8.text-right.text-bold").text()
        let remaining=$(batsmens[i]).find(".cb-col.cb-col-8.text-right")
        let balls=$(remaining[1]).text()
        
        let fours=$(remaining[2]).text()
        let sixes=$(remaining[3]).text()
        let strikeRate=$(remaining[4]).text()
        
        handlePlayer(batsmen,runs,balls,fours,sixes,team,opponent,strikeRate)
        
        
        
        
    }
    
    /*
    
    INNINGs 2 of a match
    
    
    */
    
    
     $=cheerio.load(html)
    
      
    batsmens=$(inn2).find(".cb-col.cb-col-100.cb-scrd-itms")
    opponent=team
    team=$(inn2).find(".cb-col.cb-col-100.cb-scrd-hdr-rw").text().split("Innings")[0].trim()
    
    for(i=0;i<batsmens.length;i++)
    {
        
        if($(batsmens[i]).text().includes("Extras"))
        {
            break;
        }
        
        let batsmen=$(batsmens[i]).find(".cb-col.cb-col-27").text()
        batsmen=batsmen.split(" ")
         let name="";
        for(var k=0;k<batsmen.length;k++)
        {
            if(batsmen[k][0]!='(')
            {
                name+=batsmen[k];
            }
            else{
                break;
            }
        }
        batsmen=name;
        
         let runs=$(batsmens[i]).find(".cb-col.cb-col-8.text-right.text-bold").text()
        let remaining=$(batsmens[i]).find(".cb-col.cb-col-8.text-right")
        let balls=$(remaining[1]).text()
        
        let fours=$(remaining[2]).text()
        let sixes=$(remaining[3]).text()
        let strikeRate=$(remaining[4]).text()
         handlePlayer(batsmen,runs,balls,fours,sixes,team,opponent,strikeRate)
        
        
        
        
    }
    
console.log("############################################################################################################################")  
}


function handlePlayer(player,runs,balls,fours,sixes,team,opponent,strikeRate)
{
    
    let directory=path.join(__dirname,"IPL2020",team)
    
    if(!fs.existsSync(directory))
    {
       fs.mkdirSync(directory)
    }
    
    let filePath=path.join(__dirname,"IPL2020",team,player+".json")
    
    if(!fs.existsSync(filePath))
    {
       let data=[]
        let entry={}
        entry.runs=runs
        entry.balls=balls
        entry.fours=fours
        entry.sixes=sixes
        entry.opponent=opponent
        entry.strikeRate=strikeRate
        
        data.push(entry)
        
        data=JSON.stringify(data)
        fs.writeFileSync(filePath,data)
    //   var xls = json2xls(data);
    //     fs.writeFileSync(filePath+".xlsx",xls,'binary')
        
        
        
        
        
    }
    else{
        
        let data=fs.readFileSync(filePath,"utf-8")
        
        data=JSON.parse(data)
        let entry={}
      entry.runs=runs
        entry.balls=balls
        entry.fours=fours
        entry.sixes=sixes
        entry.opponent=opponent
        entry.strikeRate=strikeRate
        
        data.push(entry)
        data=JSON.stringify(data)
        fs.writeFileSync(filePath,data)
        // var xls = json2xls(data);
        // fs.writeFileSync(filePath+".xlsx", xls, 'binary');
        
        
        
    }
    
    
}



module.exports=matchDetails
