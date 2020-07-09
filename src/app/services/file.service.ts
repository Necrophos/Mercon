import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FileService extends BaseService {
  typePhoto = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/tiff",
    "image/raw",
  ];

  resizeFile(file) {
    if (this.typePhoto.includes(file.type)) {
      console.log("this is img");
    }

    if (!this.typePhoto.includes(file.type)) {
      console.log("this is file");
    }
  }
}
