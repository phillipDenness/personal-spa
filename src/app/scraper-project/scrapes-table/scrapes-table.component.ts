import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Scrapes } from '../model/scrapes';

@Component({
  selector: 'app-scrapes-table',
  templateUrl: './scrapes-table.component.html',
  styleUrls: ['./scrapes-table.component.css']
})
export class ScrapesTableComponent implements OnInit, OnChanges {
  columns: {property: string, displayText: string}[];
  @Input() dataSource: Scrapes;

  constructor() {
  }

  ngOnInit() {
    this.columns = [{property: 'text', displayText: 'Found text'}, {property: 'tag', displayText: 'Tag'}];
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
  }
}
