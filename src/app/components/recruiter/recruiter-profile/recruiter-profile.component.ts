import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterService } from 'src/app/services/recruiter.service';

@Component({
  selector: 'app-recruiter-profile',
  templateUrl: './recruiter-profile.component.html',
  styleUrls: ['./recruiter-profile.component.css']
})
export class RecruiterProfileComponent implements OnInit {
  recruiterId:any;
  recruiterDetails:any;
  recruiterLogo:any="/assets/images/recruiter-avatar.png";
  constructor(private router:Router, private recruiterService:RecruiterService)
  {

  }
  ngOnInit(): void {
    this.recruiterId=sessionStorage.getItem('recruiterId');
     this.recruiterService.recruiterDetails(this.recruiterId).subscribe(
        response =>{
          this.recruiterDetails=response;
          if(this.recruiterDetails.logo!=undefined)
          {
            this.recruiterLogo="data:image/png;base64,"+this.recruiterDetails.logo;
          }
          console.log(this.recruiterDetails);
        }

     );
  }
  logout()
  {
    this.recruiterService.recruiterLogout();
  }
}
