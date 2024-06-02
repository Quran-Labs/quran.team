import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeService } from 'src/app/services/tree.service';

@Component({
  selector: 'app-header-content',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadButtonComponent implements OnInit{
  isUploading: boolean;
  uploadable: boolean;

  constructor(
      private treeService: TreeService) {
   }

  ngOnInit(): void {
    this.treeService.isUploading$.subscribe((b) => { this.isUploading = b; });
    this.treeService.uploadable$.subscribe((b) => { this.uploadable = b; });
  }
  
  upload(){
    this.treeService.upload();
  }

}
