import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecruiterSignup } from '../models/RecruiterSignup';
import { RecruiterLogin } from '../models/RecruiterLogin';
import { Recruiter } from '../models/Recruiter';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {

 
  baseUrl="http://localhost:9090/api/auth/recruiter/"
 
  constructor(private http:HttpClient, private route:Router) { }

 recruiterSignup(obj:RecruiterSignup):Observable<Object>
  {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(obj);
    return this.http.post(this.baseUrl+'signup',body,{'headers':headers});
  }

  recruiterLogin(obj:RecruiterLogin):Observable<Object>
  {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(obj);
    return this.http.post(this.baseUrl+'signin',body,{'headers':headers})

  }

  recruiterDetails(id:any):Observable<Object>
  {
    return this.http.get("http://localhost:9090/api/auth/recruiter/"+id);
  }

  
  jobs():Observable<Object>
  {
    
    return this.http.get("http://localhost:9090/api/job/jobs");

  }
  
  job(jobId:any):Observable<Object>
  {
    
    return this.http.get("http://localhost:9090/api/job/"+jobId);

  }

  jobsByCategory(categoryId:any):Observable<Object>
  {
    
    return this.http.get("http://localhost:9090/api/job/category/"+categoryId);

  }

  recruiterProfileUpdate(id:any, obj:Recruiter):Observable<Object>
  {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(obj);
    return this.http.put("http://localhost:9090/api/auth/recruiter/profile/update/"+id,obj);
  }

  recruiterLogout()
  {
    
    if(confirm('are you sure??'))
    {
      
    sessionStorage.removeItem('status');
    sessionStorage.removeItem('role');
    this.route.navigate(['recruiter-login']);
    }
  }

  jobspostedByRecruiter(recruiterId:any):Observable<Object>
  {
    return this.http.get("http://localhost:9090/api/job/recruiter/"+recruiterId);
  }


  jobApplicationsByRecruiter(recruiterId:any):Observable<Object>
  {
    return this.http.get("http://localhost:9090/api/job/application/recruiter/"+recruiterId);
  }

  postJob(obj:any):Observable<Object>
  {
    const formData: FormData = new FormData();
    formData.append("title", obj.title);
    formData.append("description", obj.description);
    formData.append("salary", obj.salary);
    formData.append("experience", obj.experience);
    formData.append("location", obj.location);
    formData.append("jobType", obj.jobType);
    formData.append("numberOfVacancy", obj.numberOfVacancy);
    formData.append("categoryId", obj.categoryId);
    formData.append("recruiterId", obj.recruiterId);
    formData.append("lastdate", obj.lastDate);
    return this.http.post("http://localhost:9090/api/job/addjob",formData);
  }

  updateJobApplicationstatus(applicationStatus:any,id:any):Observable<Object>
  {
    //alert(applicationStatus)
   // let queryParams = new HttpParams();
    //queryParams.append("status",applicationStatus);
   // queryParams.append("id",id);
    return this.http.put("http://localhost:9090/api/job/application/state?status="+applicationStatus+"&id="+id,null);
  }


  updateJobStatus(status:any,id:any):Observable<Object>
  {
    //alert(applicationStatus)
    //let queryParams = new HttpParams();
    //queryParams.append("status",applicationStatus);
    //queryParams.append("id",id);
    return this.http.put("http://localhost:9090/api/job/status?status="+status+"&id="+id,null);
  }
  updateProfileImage(image:File,jobSeekerId:any):Observable<any>
  {
    const formData:FormData=new FormData();
  
    formData.append("image",image);
   
    
    return this.http.put("http://localhost:9090/api/auth/recruiter/picture/"+jobSeekerId,formData  );
  }
  passwordUpdate(oldPassword:any,newPassword:any,jobSeekerId:any):Observable<Object>
  {
    const formData:FormData=new FormData();
    formData.append("oldPassword",oldPassword);
    formData.append("newPassword",newPassword);
    return this.http.put("http://localhost:9090/api/auth/recruiter/password/"+jobSeekerId,formData);
  }
}
