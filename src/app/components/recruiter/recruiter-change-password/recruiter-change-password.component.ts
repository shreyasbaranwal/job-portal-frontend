import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { RecruiterService } from 'src/app/services/recruiter.service';

@Component({
  selector: 'app-recruiter-change-password',
  templateUrl: './recruiter-change-password.component.html',
  styleUrls: ['./recruiter-change-password.component.css']
})
export class RecruiterChangePasswordComponent {
  recruiterId:any;
  recruiterDetails:any;
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
  logout()
  {
    sessionStorage.removeItem('status');
    if(confirm('are you sure??'))
    {
    this.router.navigate(['recruiter-login']);
    }
  }


  changePassword(oldPassword:any, newPassword:any, retype:any)
  {
    console.log(oldPassword+' '+newPassword+' '+retype)
    if(newPassword==retype)
    {
    this.recruiterService.passwordUpdate(oldPassword,newPassword,this.recruiterId).subscribe(
      response =>{
        alert('Password updated successfully!!')
        this.router.navigate(['recruiter-profile']);
        //this.ngOnInit();

      },
      error =>{
        alert('Something went wrong!!')
      }
    );
  }

else
{
  alert('New password and confirm password must be same!!');
}
  }
}
