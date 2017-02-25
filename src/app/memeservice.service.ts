import {Injectable} from '@angular/core';
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';


@Injectable()
export class MemeserviceService {

    hostAddress: string = 'http://localhost:3000/';

    constructor(private http: Http) {
    }

    getMemeHistory(meme: string): Observable<Response> {
        return this.http
            .get(this.hostAddress + 'meme/' + meme);
    }

    getAllMemes(): Observable<Response> {
        return this.http
            .get(this.hostAddress + 'allmemes');
    }
}
