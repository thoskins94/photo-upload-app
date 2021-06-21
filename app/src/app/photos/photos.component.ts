import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo, ListPhoto } from '../photos/photo';
import { PhotoService } from '../photos/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  url: any;
  msg = "";
  imageValid: boolean = false;
  private sub: any;
  id: any;
  photoName: any;
  file:any;
  @ViewChild("myInput") MyInputVariable!: ElementRef;
  userPhotos: Array<ListPhoto> = [];
  baseUrl = "http://localhost:3000/uploads";
  imagePath = "";


  constructor(private route: ActivatedRoute, private photoService: PhotoService) {
    this.route.params.subscribe(params => {
      this.id = params.id 
    })
   }

   selectFile = (event: any) => {
    
    if(!event.target.files[0]|| event.target.files[0].length === 0)
    {
      this.msg = "You must select an image";
      return;
    }

    let mimeType = event.target.files[0].type;

    if(mimeType.match(/image\/*/) == null){
      this.msg = "Only images are supported";
      return;
    }
    

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.file = event.target.files[0];
      this.msg = "";
      this.photoName = event.target.files[0].name;
      this.url = reader.result;
      this.imageValid = true;
    }
  }
  
  upload = async() => {
    let fb = new FormData();
    if(this.file !== null) {
      fb.append('image', this.file);
      fb.append('userId', this.id);
      await this.photoService.upload(fb);
      await this.getByUser()
      this.clearFile()
    }
  }

  deleteImage = async(id: string) => {
    await this.photoService.delete(id);
    await this.getByUser()
  }

  clearFile() {
    this.file = null,
    this.msg = '',
    this.photoName = null,
    this.url = null
    this.imageValid = false
    this.MyInputVariable.nativeElement.value = "";
  }
  
  getByUser = async() => {
    this.userPhotos = [];
    let photoList = await this.photoService.getByUser(this.id);
    if(photoList.length > 0) {
      for(let i = 0; i < photoList.length; i++) {
        this.userPhotos.push(photoList[i]);
      }       
    }
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.getByUser();
  }
}
