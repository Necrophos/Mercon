import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DocumentService extends BaseService {
  downloadDocument() {}

  sendByMail(body) {
    let url = `${environment.api}/sendShipmentFileByMail`;
    return this.post(url, body);
  }
}
