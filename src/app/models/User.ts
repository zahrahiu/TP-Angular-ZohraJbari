enum userType{
    Admin,
    Member,
    Guest
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export class User{
    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    private _firstName: string;
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    private _LastName: string;
    public get LastName(): string {
        return this._LastName;
    }
    public set LastName(value: string) {
        this._LastName = value;
    }
    private _age?: number | undefined;
    public get age(): number | undefined {
        return this._age;
    }
    public set age(value: number | undefined) {
        this._age = value;
    }

    private _UserType: userType;
    public get UserType(): userType {
        return this._UserType;
    }
    public set UserType(value: userType) {
        this._UserType = value;
    }

    constructor(id:number,firstName:string,LastName:string,age:number,UserType:userType){
        this._id=id;
        this._firstName=firstName;
        this._LastName=LastName;
        this._age=age;
        this._UserType=UserType;
    }

    public FullName(): string {
        return `${this._firstName} ${this._LastName}`;
    }

    public GreetUser()  {
       let name = `Bienvenu ${this.FullName}`
       switch (this._UserType){
        case userType.Admin:
            name += "Admin";
            break;
        case userType.Member:
            name += "Member";
            break;
        case userType.Guest:
            name += "Guest";
            break;
       }
       console.log(name);
    }

    public printUser():string{
        return "Id : " +this._id + "FirstName : " +this._firstName + "LastName : " +this._LastName + "age : " +this._age
    }

    

}