import { BaseModel } from '../../_base/crud';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';
import { StringNullableChain } from 'lodash';

export class User extends BaseModel {
    // id: number;
    username: string;
    password: string;
    // email: string;
    accessToken: string;
    refreshToken: string;
    roles: number[];
    pic: string;
    fullname: string;
    occupation: string;
	companyName: string;
	phone: string;
    address: Address;
    socialNetworks: SocialNetworks;

    id: number;
    firstname: string;
    lastname: string;
    email:string;
    phonenumber: string;

    clear(): void {
        this.id = undefined;
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.phonenumber = '';

        this.username = '';
        this.password = '';
        // this.email = '';
        this.roles = [];
        this.fullname = '';
        this.accessToken = 'access-token-' + Math.random();
        this.refreshToken = 'access-token-' + Math.random();
        this.pic = './assets/media/users/default.jpg';
        this.occupation = '';
        this.companyName = '';
        this.phone = '';
        this.address = new Address();
        this.address.clear();
        this.socialNetworks = new SocialNetworks();
        this.socialNetworks.clear();
    }
}
