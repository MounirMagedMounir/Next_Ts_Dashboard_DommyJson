export class User {

    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;

    constructor(id: number, username: string,
        email: string,
        firstName: string,
        lastName: string,
        gender: string,
        image: string,
        token: string ){
            this.id=id;
            this.username =username;
            this.email= email;
            this.firstName =firstName;
            this.lastName=lastName;
            this.gender=gender;
            this.image=image;
            this.token=token;
        }

    toJSON(): object {
    return {
        id:   this.id,
        username: this.username,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        image: this.image,
        token: this.token,
    };
}

static fromJSON(json: any) {
    return new User(json.id,json.username,json.email,json.firstName,json.lastName,json.gender,json.image,json.token);
}
  }