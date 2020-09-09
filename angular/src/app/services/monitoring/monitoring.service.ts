import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Monitoring } from '../../data/monitoring.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MonitoringService implements ErrorHandler {
  private readonly apiUrl$: Observable<string>;

  constructor(
    config: ConfigService,
    private readonly monitoring: Monitoring,
    private injector: Injector
  ) {
    this.apiUrl$ = config.get().pipe(map((cfg) => cfg.api.monitoring));
  }

  // tslint:disable-next-line:no-any
  handleError(error: any): void {
    this.sendToLogging(error);
    const router = this.injector.get(Router);
    router.navigate(['/error']);
  }

  // tslint:disable-next-line:no-any
  sendToLogging(error: any): void {
    this.apiUrl$.subscribe((dsn) => {
      this.monitoring.sentry.init({
        dsn,
        environment: environment.name,
        release: environment.release,
      });
      this.monitoring.sentry.captureException(error.originalError || error);
    });
  }
}
