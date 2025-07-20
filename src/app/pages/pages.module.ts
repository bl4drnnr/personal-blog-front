import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '@components/components.module';
import { LayoutsModule } from '@layouts/layouts.module';
import { HomeComponent } from '@pages/home/home.component';
import { BlogComponent } from '@pages/blog/blog.component';
import { BlogDetailComponent } from '@pages/blog-detail/blog-detail.component';
import { ProjectsComponent } from '@pages/projects/projects.component';
import { ProjectDetailComponent } from '@pages/project-detail/project-detail.component';
import { ContactComponent } from '@pages/contact/contact.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { SubscribeComponent } from '@pages/subscribe/subscribe.component';
import { SiteflowComponent } from '@pages/siteflow/siteflow.component';
import { AboutMeComponent } from '@pages/about-me/about-me.component';
import { ChangelogComponent } from '@pages/changelog/changelog.component';
import { LicenseComponent } from '@pages/license/license.component';
import { PrivacyComponent } from '@pages/privacy/privacy.component';

const components: any = [
  HomeComponent,
  BlogComponent,
  BlogDetailComponent,
  ProjectsComponent,
  ProjectDetailComponent,
  ContactComponent,
  NotFoundComponent,
  SubscribeComponent,
  SiteflowComponent,
  AboutMeComponent,
  ChangelogComponent,
  LicenseComponent,
  PrivacyComponent
];

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:slug', component: BlogDetailComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:slug', component: ProjectDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'siteflow', component: SiteflowComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'changelog', component: ChangelogComponent },
  { path: 'licenses', component: LicenseComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [...components],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    ComponentsModule,
    LayoutsModule
  ],
  exports: [...components]
})
export class PagesModule {}
