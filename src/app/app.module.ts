import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {MdCardModule} from "@angular2-material/card";
import {MdButtonModule} from "@angular2-material/button";
import {MdToolbarModule} from "@angular2-material/toolbar";
import {MdInputModule} from "@angular2-material/input";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MdCardModule,
        MdButtonModule,
        MdToolbarModule,
        MdInputModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
