const express=require("express");
const {google}=require("googleapis");
const app=express();

app.get("/",async(req ,res)=>{
    const auth=new google.auth.GoogleAuth({
        keyFile:"Credentials.json",
        scopes:"https://www.googleapis.com/auth/spreadsheets",
    })
    const client=await auth.getClient();
    const spreadsheetId="1aO6KMO89loSMlW5ZEITSjhOwKgzeemr-Nhc-K8ymUM0";    
    const googleSheets=google.sheets({version: "v4",auth:client});
        const metaData=await googleSheets.spreadsheets.get({
            auth,
            spreadsheetId,
        })
        const getRows=await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range:"Sheet1!A:A",
        })   
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range:"Sheet1!A:C",
            valueInputOption:"USER_ENTERED",
            resource:{  
                values:[
                    ["jay","jayaggarwall935@gmailcom","933258355747"]
                ]

            },
        })
         res.send(getRows.data);
})
app.listen(2000,(req,res)=>console.log("running on 3000"));