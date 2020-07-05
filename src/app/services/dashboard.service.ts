import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {

  getTargetBagsChart(companyNum) {
    let routes = `${environment.api}/getDashboardTargetSales?company_num=${companyNum}`;
    return this.get(routes);
  }

  getRatesChart(companyNum) {
    let routes = `${environment.api}/getDashboardSample?company_num=${companyNum}`;
    return this.get(routes);
  }
}
