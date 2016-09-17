import {Component, OnInit} from '@angular/core';
import {Menu} from "primeng/components/menu/menu";
import {MenuItem} from "primeng/components/common/api";

@Component({
    selector: 'app-queryview',
    templateUrl: './queryview.component.html',
    styleUrls: ['./queryview.component.css']
})
export class QueryviewComponent implements OnInit {

    private items: MenuItem[];

    constructor() {

    }

    ngOnInit() {
        this.items = [{
            label: 'File',
            items: [
                {label: 'New', icon: 'fa-plus'},
                {label: 'Open', icon: 'fa-download'}
            ]
        },
            {
                label: 'Edit',
                items: [
                    {label: 'Undo', icon: 'fa-refresh'},
                    {label: 'Redo', icon: 'fa-repeat'}
                ]
            }];
    }

    search(): void {
        console.log("You entered me");
    }
}