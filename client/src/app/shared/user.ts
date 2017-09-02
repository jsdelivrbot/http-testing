export class User {
    constructor(
      public userName: string,
      public firstName: string,
      // public middleName?: string,
      public lastName: string,
      public password: string,
      public education?: string,
      public dataType?: string
      // public age?: number,
      // public education?: string
    ){}
}
