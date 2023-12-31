import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobseekerService } from 'src/app/services/jobseeker.service';

@Component({
  selector: 'app-jobseeker-profile',
  templateUrl: './jobseeker-profile.component.html',
  styleUrls: ['./jobseeker-profile.component.css']
})
export class JobseekerProfileComponent implements OnInit{

  jobSeekerId:any;
  jobseekerDetails:any;
  jobseekerLogo:any="/assets/images/demo-user.png";
  constructor(private router:Router,private jobseekerService:JobseekerService)
  {

  }
  ngOnInit(): void {
    this.jobSeekerId=sessionStorage.getItem('jobSeekerId');
     this.jobseekerService.jobSeekerDetails(this.jobSeekerId).subscribe(
        response =>{
          this.jobseekerDetails=response;
          if(this.jobseekerDetails.image!=undefined)
          {
            this.jobseekerLogo="data:image/png;base64,"+this.jobseekerDetails.image;
          }
          console.log(this.jobseekerDetails);
        }

     );

    
  }
  logout()
  {
    this.jobseekerService.jobSeekerLogout();
  }
}
