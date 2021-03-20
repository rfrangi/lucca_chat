export class User {
  email!: string;
  password!: string;
  pseudonyme!: string;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }
}
