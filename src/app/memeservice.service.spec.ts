/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {MemeserviceService} from './memeservice.service';

describe('Service: Memeservice', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MemeserviceService]
        });
    });

    it('should ...', inject([MemeserviceService], (service: MemeserviceService) => {
        expect(service).toBeTruthy();
    }));
});
