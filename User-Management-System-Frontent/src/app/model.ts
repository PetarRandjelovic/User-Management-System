export interface User{
    userId: number
    username: string,
    lastName: string,
    email: string,
    password: string,
   createuser:any,
    updateuser:any,
    readuser:any,
    deleteuser:any,
   
}
export interface LoginRequest{
    email: string,
    password: string
}

