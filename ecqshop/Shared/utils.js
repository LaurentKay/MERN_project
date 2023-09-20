export const Encrypt = (stringToEncript, encryptKey) =>{
    let currentChrANSI = 0;
    let sumofANSI = 0;
    //loop thru encryptkey
    for(var i = 0; i < encryptKey.length ;i++){
        let curChr = encryptKey.substr(i, 1);

        //Convert to ANSI number
        currentChrANSI = curChr.charCodeAt(0); // ord($curChr);
        sumofANSI += currentChrANSI;
    }
    //First Key
    const firstKey = Number(sumofANSI.toString().substr(0, 1));
    const secondKey = Number(sumofANSI.toString().substr(sumofANSI.toString().length-1,1));
    //Now loop thru the stringtoencrypt
    let res = '';
    let seperator = '';
    for(var j = 0; j < stringToEncript.length; j++){
        let curChr = stringToEncript.substr(j, 1);

        //convert to ANSI number
        let currentChrANSI = curChr.charCodeAt(0); //ord($);

        //Multiply by First Key
        
        let curChrOrd = currentChrANSI * firstKey;
        //console.log("Encoding: ", curChrOrd, currentChrANSI, firstKey)
        //Add second key
        curChrOrd += secondKey;
        //console.log("Encoding: ", curChrOrd, currentChrANSI, firstKey, secondKey);
        res = res.concat(seperator, curChrOrd);
        //console.log("Encoding: Res ", curChrOrd, currentChrANSI, firstKey, secondKey, res);
        seperator = "-";
    }
    //console.log("Encoding: End ", res);
    return res;
}
export function Decrypta(stringToDcrypt, encryptKey){
    let currentChrANSI = 0;
    let sumofANSI = 0;
    let res = "";
    //loop thru ecryptkey
    for(var i = 0; i < encryptKey.length; i++){
        let curChr = encryptKey.substr(i, 1);

        //Convert to ANSI number
        currentChrANSI = curChr.charCodeAt(0);
        sumofANSI += currentChrANSI;
    }
    //First Key
    let firstKey = Number(sumofANSI.toString().substr(0, 1));
    let secondKey = Number(sumofANSI.toString().substr(sumofANSI.toString().length-1,1));
    //Split stringToDecrypt into array
    let arrDec = stringToDcrypt.split("-");

    //loop thru stringtoDecrypt
    for(var j = 0; j < arrDec.length; j++){
        let curChrOrd = Number(arrDec[j]);
        //console.log(j , "=", curChrOrd, secondKey, firstKey);
        //Minus second key
        curChrOrd -= Number(secondKey);

        //Divide by first key
        curChrOrd = curChrOrd / Number(firstKey);

        //convert to chr
        //console.log(j , "After=", curChrOrd, secondKey, firstKey);
        let curChr = String.fromCharCode(curChrOrd);

        res += curChr+'';
    }
    return res;
}