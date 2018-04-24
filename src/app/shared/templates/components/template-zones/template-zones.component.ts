import { Component, OnInit, Input } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-template-zones',
  templateUrl: './template-zones.component.html',
  styleUrls: ['./template-zones.component.scss']
})
export class TemplateZonesComponent implements OnInit {
  // Component inputs/outputs
  @Input() zones: any[];

  // Template elements references
  public imageFile: HTMLInputElement;
  public htmlCanvas: HTMLCanvasElement;

  // Component internal properties
  public canvas: fabric.Canvas;
  private htmlImage: HTMLImageElement;
  private _fReader: FileReader;

  constructor() {
    this.htmlImage = new Image();

    this._fReader = new FileReader();
    this._fReader.onload = (event) => this._onImageLoaded(event);
  }

  ngOnInit() {
    // init fabric object
    this.canvas = new fabric.Canvas(this.htmlCanvas);
  }

  /**
   * Triggered when user select a new template image
   * @param event 
   */
  onImageFileChange(event) {
    var file = this.imageFile.files[0];
    if (file) { 
      this._fReader.readAsDataURL(file);
    }
  }

  /**
   * When a new file is selected, upload to backoffice
   * @param event 
   */
  private _onImageLoaded(event) {
    // upload file to server
    var path = 'templates';
    const allowedMimeTypes = [
      'image/gif',
      'image/x-icon',
      'image/jpeg',
      'application/pdf',
      'image/svg+xml',
      'image/tiff',
      'image/webp'
    ];
  }
}
