import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AboutCardsComponent } from './about-cards/about-cards.component';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { HmctsAnnotationUiModule } from './annotation-ui-lib/hmcts-annotation-ui.module';
import { JobMapComponent } from './job-map/job-map.component';
import * as firebase from 'firebase';
import { APIResolver } from './pdf-resolver';
import { ProjectsComponent } from './projects/projects.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { GumtreeProjectComponent } from './gumtree-project/gumtree-project.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full'},
  { path: 'about', component: AboutComponent,
    children: [
      {
        path: '',
        component: AboutCardsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
    ]
  },
  { path: 'pdf', component: ProjectsComponent, resolve: { items: APIResolver }},
  { path: 'gumtree', component: GumtreeProjectComponent },
  { path: '**', component: PageNotFoundComponent }
];

firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    PageNotFoundComponent,
    NavBarComponent,
    AboutCardsComponent,
    ProjectsComponent,
    JobMapComponent,
    ProfileComponent,
    FooterComponent,
    GumtreeProjectComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({apiKey: environment.googleApi.apiKey}),
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HmctsAnnotationUiModule
  ],
  providers: [GoogleMapsAPIWrapper, APIResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
