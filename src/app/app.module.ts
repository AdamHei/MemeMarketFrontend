import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {QueryviewComponent} from "./queryview/queryview.component";
import {MdCardModule} from "@angular2-material/card";
import {MdButtonModule} from "@angular2-material/button";
import {MdInputModule} from "@angular2-material/input";
import {MdToolbarModule} from "@angular2-material/toolbar";
import {AccordionModule, ButtonModule, PanelModule, DataTableModule, InputTextModule, ChartModule, GrowlModule} from "primeng/primeng";
import {MemeserviceService} from "./memeservice.service";
import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {MdProgressCircleModule} from "@angular2-material/progress-circle";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        QueryviewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MdCardModule,
        MdButtonModule,
        MdInputModule,
        MdToolbarModule,
        AccordionModule,
        ButtonModule,
        PanelModule,
        DataTableModule,
        InputTextModule,
        ChartModule,
        GrowlModule,
        AutoCompleteModule,
        DropdownModule,
        MdProgressCircleModule
    ],
    providers: [MemeserviceService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
