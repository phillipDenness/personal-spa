import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AboutCardsComponent } from './about-cards/about-cards.component';
import { ResourcesComponent } from './resources/resources.component';
import { AboutCardComponent } from './about-card/about-card.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full'},
  { path: 'about', component: AboutComponent,
    children: [
      {
        path: '',
        component: AboutCardsComponent
      },
      {
        path: ':id',
        component: AboutCardComponent
      }
    ]
  },
  { path: 'projects', component: ResourcesComponent},
  { path: 'skills', component: ResourcesComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    PageNotFoundComponent,
    NavBarComponent,
    AboutCardsComponent,
    ResourcesComponent,
    AboutCardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
