 // function buildObject (n){
 //    const result = {};
 //
 //    for ( let i =1 ; i<=n;i++){
 //        const values =[]
 //        for(let j=0;j<=i;j++){
 //
 //             values.push(j)
 //        }
 //        console.log(values);
 //
 //        result[ i ] =values
 //
 //    }
 //    return result;
 //
 // }
 // console.log(buildObject(3))

 // function multiple (n){
 //    const result = [];
 //    for(let i=1;i<=n;i++){
 //        result[i]=[i*30]
 //    }
 //    return result
 // }
 //
 // console.log(multiple(3));

 // function generateRepeatedStringObject(n,string){
 //    const result = {};
 //    for (let i=1;i<=n;i++){
 //        result[i]=string.repeat(i);
 //    }
 //    return result;
 //
 // }
 //
 // console.log(generateRepeatedStringObject(3,"abc"))
 function tableauDesMots([string]){
    const result ={}
     const voyelles = ["a", "e", "i", "o", "u", "y"];

     for(let i=0; i<string.length; i++){
         const voyelleTrouve =[];

         result[string]={
             length:string.length
         }

     }
     return result

 }

 console.log(tableauDesMots(["mouad","chakib"]))