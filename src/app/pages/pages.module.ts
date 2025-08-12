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
import { NewsletterConfirmationComponent } from '@pages/newsletter-confirmation/newsletter-confirmation.component';
import { NewslettersUnsubscribeComponent } from '@pages/newsletters-unsubscribe/newsletters-unsubscribe.component';
import { PageMenuComponent } from '@pages/menu/page-menu.component';
import { AboutMeComponent } from '@pages/about-me/about-me.component';
import { ChangelogComponent } from '@pages/changelog/changelog.component';
import { LicenseComponent } from '@pages/license/license.component';
import { PrivacyComponent } from '@pages/privacy/privacy.component';
import { MaintenanceComponent } from '@pages/maintenance/maintenance.component';
import { PasswordProtectionComponent } from '@pages/password-protection/password-protection.component';
import { MaintenanceGuard } from '@guards/maintenance.guard';
import { MaintenancePageGuard } from '@guards/maintenance-page.guard';
import { PasswordProtectionGuard } from '@guards/password-protection.guard';

const components: any = [
  HomeComponent,
  BlogComponent,
  BlogDetailComponent,
  ProjectsComponent,
  ProjectDetailComponent,
  ContactComponent,
  NotFoundComponent,
  SubscribeComponent,
  NewsletterConfirmationComponent,
  NewslettersUnsubscribeComponent,
  PageMenuComponent,
  AboutMeComponent,
  ChangelogComponent,
  LicenseComponent,
  PrivacyComponent,
  MaintenanceComponent,
  PasswordProtectionComponent
];

const routes: Routes = [
  // Password protection route - no guards (must be accessible when protection is active)
  {
    path: 'password-protection',
    component: PasswordProtectionComponent
  },

  // Maintenance route - protected by MaintenancePageGuard (redirects to home if maintenance is off)
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    canActivate: [MaintenancePageGuard]
  },

  // All other routes protected by password protection guard first, then maintenance guard
  {
    path: '',
    component: HomeComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  {
    path: 'blog/:slug',
    component: BlogDetailComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  {
    path: 'projects/:slug',
    component: ProjectDetailComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  {
    path: 'subscribe',
    component: SubscribeComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  {
    path: 'newsletter-confirmation/:id',
    component: NewsletterConfirmationComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  {
    path: 'newsletters-unsubscribe/:id',
    component: NewslettersUnsubscribeComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  {
    path: 'menu',
    component: PageMenuComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  {
    path: 'about-me',
    component: AboutMeComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  {
    path: 'changelog',
    component: ChangelogComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  {
    path: 'licenses',
    component: LicenseComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [PasswordProtectionGuard, MaintenanceGuard]
  }
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
