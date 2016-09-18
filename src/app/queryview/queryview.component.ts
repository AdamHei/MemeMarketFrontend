import {Component, OnInit} from "@angular/core";
import {InputText, Dropdown} from "primeng/primeng"
import {Message, SelectItem} from "primeng/components/common/api";
import {MemeserviceService} from "../memeservice.service";
import {Response} from "@angular/http";

@Component({
    selector: 'app-queryview',
    templateUrl: './queryview.component.html',
    styleUrls: ['./queryview.component.css']
})
export class QueryviewComponent implements OnInit {

    data: any = {labels : []};
    msgs: Message[];
    options: any;

    meme: string = '';
    altMeme: string = '';
    compare: boolean = false;
    searching: boolean = false;

    memeList: SelectItem[];
    memeMap: {} = {};


    constructor(private memeService: MemeserviceService) {
        this.data = {
            labels: [],
            datasets: []
            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            // datasets: [
            //     // {
            //     //     label: 'First Dataset',
            //     //     data: [65, 59, 80, 81, 56, 55, 40],
            //     //     fill: false,
            //     //     borderColor: '#4bc0c0'
            //     // },
            //     // {
            //     //     label: 'Second Dataset',
            //     //     data: [28, 48, 40, 19, 86, 27, 90],
            //     //     fill: false,
            //     //     borderColor: '#565656'
            //     // }
            // ]
        };
        this.memeList = [];
        this.options = {
            title: {
                display: true,
                text: this.meme + ' Price History',
                fontSize: 16
            },
            legend: {
                position: 'bottom'
            }
        };
    }

    ngOnInit() {
        this.memeService.getAllMemes()
            .subscribe(
                res => this.parseMemes(res),
                error => console.log(error)
            );
    }

    parseMemes(res: Response){
        let body: {} = res.json();
        let self = this;
        Object.keys(body).forEach(function (val) {
            let splitUrl: string[] = body[val].split("/");
            self.memeMap[val] = splitUrl[splitUrl.length - 1];
            self.memeList.push({label: val, value: val});
        });
        this.meme = this.memeList[0].value;
        console.log(this.memeMap);
    }

    selectData(event) {
        this.msgs = [];
        this.msgs.push({
            severity: 'info',
            summary: 'Data Selected',
            'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]
        });
    }

    search(): void {
        this.data = {
            labels: [],
            datasets: []
        };
        this.searching = true;
        if (this.compare){
            this.memeService.getMemeHistory(this.memeMap[this.meme])
                .subscribe(
                    val => this.mergeFetch(val.json()),
                    error => console.log(error)
                );
        }
        else {
            this.memeService.getMemeHistory(this.memeMap[this.meme])
                .subscribe(
                    val => this.handleData(val.json()),
                    error => console.log(error)
                );
        }
    }

    mergeFetch(history: {}[]): void {
        this.memeService.getMemeHistory(this.memeMap[this.altMeme])
            .subscribe(
                val => this.mergeHistories(history, val.json()),
                error => console.log(error)
            );
    }

    toggle(): void {
        this.compare = !this.compare;
    }

    handleData(history: {}[]){
        console.log(history);
        this.options.title.text = this.meme + '\'s Price History';
        this.data = {
            labels: [],
            datasets: []
        };
        let dataset: {} = {
            label: this.meme,
            fill: false,
            borderColor: '#ff6600',
            data: []
        };
        for (let key in history){
            let obj: {} = history[key];
            // this.data.labels.push(obj['timestamp']);

            var date = new Date(obj['timestamp']);
            var hours = date.getHours();
            date.toLocaleString();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            this.data.labels.push(formattedTime);

            dataset['data'].push(obj['score']);
        }
        this.data.datasets.push(dataset);
        this.searching = false;
        console.log(this.data);
    }

    mergeHistories(history1: {}[], history2: {}[]): void {
        this.options.title.text = this.meme + ' vs ' + this.altMeme;
        this.data = {
            labels: [],
            datasets: []
        };
        let labels: string[] = [];
        let firstPtr: number = 0;
        let secondPtr: number = 0;
        let dataset1: {} = {
            label: this.meme + ' Dataset',
            data: [],
            fill: false,
            borderColor: '#565656'
        };
        let dataset2: {} = {
            label: this.altMeme + ' Dataset',
            data: [],
            fill: false,
            borderColor: '#ff6600'
        };
        console.log(history1);
        console.log(history2);
        while (firstPtr < history1.length && secondPtr < history2.length){
            let entry1: {} = history1[firstPtr];
            let entry2: {} = history2[secondPtr];
            let date1: Date = new Date(entry1['timestamp']);
            let date2: Date = new Date(entry2['timestamp']);
            if (date1 < date2){
                this.data.labels.push(date1.toLocaleString());
                firstPtr++;
                dataset1['data'].push(entry1['score']);
                // dataset2['data'].push(undefined);
                dataset2['data'].push(dataset2['data'][dataset2['data'].length - 1]);
            }
            else if (date2 < date1){
                this.data.labels.push(date2.toLocaleString());
                secondPtr++;
                dataset2['data'].push(entry2['score']);
                // dataset1['data'].push(undefined);
                dataset1['data'].push(dataset1['data'][dataset1['data'].length - 1]);
            }
            else {
                this.data.labels.push(date2.toLocaleString());
                firstPtr++;
                secondPtr++;
                dataset1['data'].push(entry1['score']);
                dataset2['data'].push(entry2['score']);
            }
        }
        while (firstPtr < history1.length){
            console.log("History 1 was longer");
            let entry1: {} = history1[firstPtr];
            let date1: Date = new Date(entry1['timestamp']);
            this.data.labels.push(date1.toLocaleString());
            dataset1['data'].push(entry1['score']);
            dataset2['data'].push(dataset2['data'][dataset2['data'].length - 1]);
            firstPtr++;
        }
        while (secondPtr < history2.length){
            console.log("History 2 was longer");
            let entry2: {} = history2[secondPtr];
            let date2: Date = new Date(entry2['timestamp']);
            this.data.labels.push(date2.toLocaleString());
            dataset2['data'].push(entry2['score']);
            dataset1['data'].push(dataset1['data'][dataset1['data'].length - 1]);
            secondPtr++;
        }
        this.data.datasets.push(dataset1);
        this.data.datasets.push(dataset2);
        this.searching = false;
        console.log(this.data);
    }
}