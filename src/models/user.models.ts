export class User {

  id!: number;
  pseudonyme!: string;

  constructor(data: any = {}) {
    this.id = data.id ? data.id : Math.random();
    Object.assign(this, data);
  }
}
