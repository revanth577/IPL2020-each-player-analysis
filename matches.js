let request=require("request")
let cheerio=require("cheerio")
let fs=require("fs")


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
    
    let batsmens=$(inn1).find(".cb-col.cb-col-100.cb-scrd-itms")
    
    let team=$(inn1).find(".cb-col.cb-col-100.cb-scrd-hdr-rw").text().split("Innings")[0].trim()
    console.log(team)
    
    for(i=0;i<batsmens.length;i++)
    {
        if($(batsmens[i]).text().includes("Extras"))
        {
            break;
        }
        let batsmen=$(batsmens[i]).find(".cb-col.cb-col-27").text()
        
        let runs=$(batsmens[i]).find(".cb-col.cb-col-8.text-right.text-bold").text()
        let remaining=$(batsmens[i]).find(".cb-col.cb-col-8.text-right")
        let balls=$(remaining[1]).text()
        
        let fours=$(remaining[2]).text()
        let sixes=$(remaining[3]).text()
        let strikeRate=$(remaining[4]).text()
        console.log(`${batsmen} scored ${runs} in ${balls} balls with ${fours} fours and ${sixes} sixes with strike rate ${strikeRate} `)
        
        
        
        
        
        
    }
    
    /*
    
    INNINGs 2 of a match
    
    
    */
    
    
     $=cheerio.load(html)
    
      let inn2=$("#innings_2 div.cb-col.cb-col-100.cb-ltst-wgt-hdr")
    
    batsmens=$(inn2).find(".cb-col.cb-col-100.cb-scrd-itms")
    team=$(inn2).find(".cb-col.cb-col-100.cb-scrd-hdr-rw").text().split("Innings")[0].trim()
    console.log(team)
    
    
    for(i=0;i<batsmens.length;i++)
    {
        
        if($(batsmens[i]).text().includes("Extras"))
        {
            break;
        }
        
        let batsmen=$(batsmens[i]).find(".cb-col.cb-col-27").text()
         let runs=$(batsmens[i]).find(".cb-col.cb-col-8.text-right.text-bold").text()
        let remaining=$(batsmens[i]).find(".cb-col.cb-col-8.text-right")
        let balls=$(remaining[1]).text()
        
        let fours=$(remaining[2]).text()
        let sixes=$(remaining[3]).text()
        let strikeRate=$(remaining[4]).text()
        console.log(`${batsmen} scored ${runs} in ${balls} balls with ${fours} fours and ${sixes} sixes with strike rate ${strikeRate} `)
        
        
        
    }
    
console.log("############################################################################################################################")  
}




module.exports=matchDetails
