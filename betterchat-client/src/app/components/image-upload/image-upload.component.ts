import { UploadImageAction } from './../../core/actions/auth.action';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  fileUploaded = false;
  fileToUpload: File;
  closeDialog = false;

  @ViewChild('previewImage')
  previewImage: ElementRef;

  constructor(private _renderer: Renderer2, private _store: Store) {}

  ngOnInit() {}

  uploadFile() {}

  isAdvancedUpload() {
    const div = document.createElement('div');
    return (
      ('draggable' in div || ('ondragstart' in div && 'ondrop' in div)) &&
      'FormData' in window &&
      'FileReader' in window
    );
  }
  allowDrop(ev: any) {
    ev.preventDefault();
  }

  drop(ev: any) {
    ev.preventDefault();
    const file = ev.dataTransfer.files[0];
    this.showNewFile(file);
  }

  onFileInput(files: File[]) {
    const file = files[0];
    this.showNewFile(file);
  }

  showNewFile(file: File) {
    this.fileToUpload = file;
    const reader = new FileReader();
    reader.onloadend = () => {
      this._renderer.setProperty(this.previewImage.nativeElement, 'src', reader.result);
    };
    if (file && file.type.includes('image/')) {
      reader.readAsDataURL(file);
      this.fileUploaded = true;
    } else {
      this.fileUploaded = false;
    }
  }
  upload() {
    this._store.dispatch(new UploadImageAction(this.fileToUpload));
    this.closeDialog = true;
  }
}
