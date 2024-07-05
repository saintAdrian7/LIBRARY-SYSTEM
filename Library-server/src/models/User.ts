export interface User {
    type: 'AMDMIN' | 'EMPLOYEE' | 'PATRON';
    firstName: string;
    lastName: string;
    email: string;
    password:string;
}