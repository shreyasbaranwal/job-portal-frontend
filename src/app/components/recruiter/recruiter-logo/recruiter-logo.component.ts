import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterService } from 'src/app/services/recruiter.service';

@Component({
  selector: 'app-recruiter-logo',
  templateUrl: './recruiter-logo.component.html',
  styleUrls: ['./recruiter-logo.component.css']
})
export class RecruiterLogoComponent {
  recruiterId:any;
  recruiterDetails:any;
  demoImage:any="/assets/images/user.png";
  files:any;
  target:any;
  constructor(private router:Router,private recruiterService:RecruiterService)
  {

  }
  ngOnInit(): void {
    this.recruiterId=sessionStorage.getItem('recruiterId');
     this.recruiterService.recruiterDetails(this.recruiterId).subscribe(
        response =>{
          this.recruiterDetails=response;
          console.log(this.recruiterDetails);
        }

     );
      }



      handleFileInput(event: Event) {
        this.target = event.target as HTMLInputElement;
        this.files = this.target.files as FileList;
        //console.log(this.files);
        
      }

  updateImage()
  {
    
    this.recruiterService.updateProfileImage(this.files[0],this.recruiterId).subscribe(
      response =>{console.log(response);
       alert('Image Updated Successfully');
                 }
    );

    //console.log(this.post);
  
  }
  logout()
  {
    this.recruiterService.recruiterLogout();
  }
}
