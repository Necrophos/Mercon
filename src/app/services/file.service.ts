import { Injectable } from "@angular/core";
import { Ng2ImgMaxService } from 'ng2-img-max';

@Injectable({
  providedIn: "root",
})
export class FileService {

  constructor( private ng2ImgMax: Ng2ImgMaxService) {}
  typePhoto = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/tiff",
    "image/raw",
  ];

  resizeImg(file) {
    if (this.typePhoto.includes(file.type)) {
      return this.ng2ImgMax.compressImage(file, 2)
    }
  }

  resizeFile(file) {
    if (!this.typePhoto.includes(file.type)) {
      return file.size > 20971520 ? true : false;
    }
  }
}
