import { Component } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'component-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  isLoading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
