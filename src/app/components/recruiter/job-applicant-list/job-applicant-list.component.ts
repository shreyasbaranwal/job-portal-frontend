import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterService } from 'src/app/services/recruiter.service';

@Component({
  selector: 'app-job-applicant-list',
  templateUrl: './job-applicant-list.component.html',
  styleUrls: ['./job-applicant-list.component.css']
})
export class JobApplicantListComponent implements OnInit{
  recruiterId:any;
  recruiterDetails:any;
  applicationList:any;
  application:any;
  constructor(private router:Router, private recruiterService:RecruiterService)
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

     this.recruiterService.jobApplicationsByRecruiter(this.recruiterId).subscribe(
      response =>{
        this.applicationList=response;
        console.log(this.applicationList);
      }
     );
  }

  statusUpdate(id:any,status:any)
  {
    //alert(id)
    //alert(status)
    //console.log(this.application);
    this.recruiterService.updateJobApplicationstatus(status,id).subscribe(
      (response)  =>{
        alert('application status updated!!')
        this.ngOnInit();
      },
      (error)=>{
        console.log(error)
      }
    );
  }
  logout()
  {
    this.recruiterService.recruiterLogout();
  }
  generateResume(pdf:any, resume:any) {
    const source = `data:application/pdf;base64,${pdf}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${resume}.pdf`
    link.click();
  }
 
}
