
let request=require("request")
let cheerio=require("cheerio")
let fs=require("fs")

let matchDetails=require("./matches.js")


fs.mkdirSync("IPL2020")

request("https://www.cricbuzz.com/cricket-series/3130/indian-premier-league-2020",requireUrl)

function requireUrl(err,res,html)
{
    
    if(err==null && res.statusCode==200)
    {
        getMatchesUrl(html)
    }
    else if(res.statusCode=404)
    {
        console.log("invlaid page")
    }
    else{
        console.log(err)
        console.log(res.statusCode)
    }
}



function getMatchesUrl(html)
{
    
    // fs.writeFileSync("data.html",html)
    
    let $=cheerio.load(html)
    let home=$(".cb-nav-tab")
    let allMathesLink=$(home[1]).attr("href")
    
    request("https://www.cricbuzz.com"+allMathesLink,getMatches)
}


function getMatches(err,res,html)
{
    if(err==null && res.statusCode==200)
    {
        everyMatch(html)
        
    }
    else if(res.statusCode==404)
    {
        console.log("invliad page")
    }
    else{
        console.log(err)
        console.log(res.statusCode)
    }
    
    
}




function everyMatch(html)
{
    
    let $=cheerio.load(html)
    let matches=$(".cb-col-60.cb-col.cb-srs-mtchs-tm a.text-hvr-underline")
    
    
    for(i=0;i<matches.length;i++)
    {
        let link=$(matches[i]).attr("href")
        
        let fullLink="https://www.cricbuzz.com"+link
        
        matchDetails(fullLink)
        
   
    }
    
    
}




























