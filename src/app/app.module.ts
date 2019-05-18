import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import * as firebase from 'firebase';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { WelcomeCardsComponent } from './welcome/welcome-cards/welcome-cards.component';
import { HmctsAnnotationUiModule } from './pdf//annotation-ui-lib/hmcts-annotation-ui.module';
import { JobMapComponent } from './job-map/job-map.component';
import { PdfResolver } from './pdf/pdf-resolver';
import { MyStoryComponent } from './my-story/my-story.component';
import { FooterComponent } from './common/footer/footer.component';
import { ScraperProjectComponent } from './scraper-project/scraper-project.component';
import { PdfComponent } from './pdf/pdf.component';
import { ScrapesTableComponent } from './scraper-project/scrapes-table/scrapes-table.component';
import { ScrapeSearchesComponent } from './scraper-project/scrape-searches/scrape-searches.component';
import { CreateSearchComponent } from './scraper-project/create-search/create-search.component';
import { ApiHttpService } from './pdf/annotation-ui-lib/data/api-http.service';
import { ScraperService } from './scraper-project/scraper.service';
import { ScraperResolver } from './scraper-project/scraper.resolver';
import { FloorplanScannerComponent } from './floorplan-scanner/floorplan-scanner.component';
import { FloorplanScannerService } from './floorplan-scanner/floorplan-scanner.service';
import { FundPriceComponent } from './fund-price/fund-price.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent,
    children: [
      {
        path: '',
        component: WelcomeCardsComponent
      },
      {
        path: 'my-story',
        component: MyStoryComponent
      },
    ]
  },
  {
    path: 'projects/pdf/:id',
    component: PdfComponent,
    runGuardsAndResolvers: 'always',
    resolve: { items: PdfResolver }
  },
  { path: 'projects/floorplan-scanner', component: FloorplanScannerComponent},
  { path: 'projects/pdf', component: PdfComponent, resolve: { items: PdfResolver }},
  { path: 'projects/scraper', component: ScraperProjectComponent,
    children: [
        {
          path: 'create',
          component: CreateSearchComponent
        },
        {
          path: 'searches',
          component: ScrapeSearchesComponent,
          resolve: { items: ScraperResolver }
        }
    ]
  },
  { path: 'projects/fund-price', component: FundPriceComponent },
  { path: '**', component: PageNotFoundComponent }
];

firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    NavBarComponent,
    WelcomeCardsComponent,
    JobMapComponent,
    MyStoryComponent,
    FooterComponent,
    ScraperProjectComponent,
    PdfComponent,
    ScrapesTableComponent,
    ScrapeSearchesComponent,
    CreateSearchComponent,
    FloorplanScannerComponent,
    FundPriceComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({apiKey: environment.googleApi.apiKey}),
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HmctsAnnotationUiModule
  ],
  providers: [
    ScraperResolver,
    ApiHttpService,
    GoogleMapsAPIWrapper,
    PdfResolver,
    ScraperService,
    FloorplanScannerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
