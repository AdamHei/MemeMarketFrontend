import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'is or is it!!!';

    search(): void {
        console.log(event);
        console.log("You entered me");
    }
}
