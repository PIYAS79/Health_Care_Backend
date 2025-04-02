import bcrypt from 'bcrypt'

export const Bcrypt_Hash_Pass =async (hashedPass:string)=>{
    return await bcrypt.hash(hashedPass,10);
}
