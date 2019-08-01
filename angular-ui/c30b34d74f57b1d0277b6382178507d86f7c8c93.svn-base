import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-fwbs-def-upload',
  templateUrl: './fwbs-def-upload.component.html',
  styleUrls: ['./fwbs-def-upload.component.scss']
})
export class FwbsDefUploadComponent implements OnInit {
  urls = [];
  url = '';
  closeResult: string;
  selectesFile: File = null;
  constructor(
    private http: HttpClient,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
  }

  onFileSelected(event){
     
  //   if (event.target.files && event.target.files[0]) {
  //     var filesAmount = event.target.files.length;
  //     for (let i = 0; i < filesAmount; i++) {
  //             var reader = new FileReader();

  //             reader.onload = (event:any) => {
  //               console.log(event.target.result);
  //                this.urls.push(event.target.result); 
  //             }

  //             reader.readAsDataURL(event.target.files[i]);
  //     }
  // }

  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event:any) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    }
  }


	}

	onUpload() {
		const fd = new FormData();
		fd.append('upload', this.selectesFile, this.selectesFile.name)
		this.http.post('./assets/media/upload', fd, {
			reportProgress: true,
			observe: 'events'
		}).subscribe(event => {
			console.log(event);
		})
  }
  

  open(content) {
    this.modalService.open(content).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
}

}
