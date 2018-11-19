import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScraperService } from './scraper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scraper-project',
  templateUrl: './scraper-project.component.html',
  styleUrls: ['./scraper-project.component.css'],
})
export class ScraperProjectComponent implements OnInit, OnDestroy {
  apiUpdate: string;
  private apiInformationSubscription: Subscription;

  constructor(private scraperService: ScraperService) {}

  ngOnInit() {
    this.apiInformationSubscription = this.scraperService.getApiInformationSubject()
      .subscribe((apiUpdate: string) => {
        this.apiUpdate = apiUpdate;
    });
  }

  ngOnDestroy() {
    if (this.apiInformationSubscription) {
      this.apiInformationSubscription.unsubscribe();
    }
  }
}
