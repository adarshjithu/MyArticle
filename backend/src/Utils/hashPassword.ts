import bcrypt from "bcrypt";
const saltRound = 10;
export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, saltRound);
};


export const comparePassword = async(curPassword:string,oldPassword:string)=>{

    return await bcrypt.compare(curPassword,oldPassword)
}