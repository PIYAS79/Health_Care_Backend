export const PickExactKeys = <T extends Record<string,unknown>,k extends keyof T>(obj:T,keys:k[]):Partial<T>=>{
    const finalObj:Partial<T>={};

    for(let key of keys){
        if(obj && Object.hasOwnProperty.call(obj,key)){
            finalObj[key]=obj[key]
        }
    }

    return finalObj;
}
