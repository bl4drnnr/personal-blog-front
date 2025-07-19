import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration
} from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PagesModule } from '@pages/pages.module';
import { ComponentsModule } from '@components/components.module';
import { LayoutsModule } from '@layouts/layouts.module';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch
} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    PagesModule,
    ComponentsModule,
    LayoutsModule
  ],
  providers: [provideHttpClient(withFetch()), provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule {}
