import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { LoginRequest } from '../model';
import { Observable, catchError, throwError } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
    providedIn: 'root'
  })
export class BackendService{
  decoded: any;
  public changedEventToken: EventEmitter<void>=new EventEmitter<void>();
  savedToken: any;

  updateUser(id: string, username: string, lastName: string, email: string, can_read_users: any,can_delete_users: any,can_update_users: any,can_create_users: any
    ,password:string):Observable<any>  {
    return this.httpClient.put<HttpResponse<any>>(`http://localhost:8080/api/user/editUser/${id}`, {
     
    id:id,email: email, username: username, lastName: lastName,
     can_read_users: can_read_users,can_delete_users: can_delete_users,can_update_users: can_update_users,can_create_users: can_create_users ,password:password}, {

      headers:this.headers}).pipe(
        catchError(this.handleError)
      );

    

  }
    
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      })

      
    constructor(private httpClient: HttpClient) { 
          this.changedEventToken.subscribe(()=>{
       

            if( localStorage!=null){
                localStorage.setItem("token",this.savedToken)
            }

            this.updateHeaders();

          });


    }
  
    createUser(username: string, lastName: string, email: string, can_read_users: any,can_delete_users: any,can_update_users: any,can_create_users: any
      ,password:string):Observable<any>  {
      return this.httpClient.post<HttpResponse<any>>(`http://localhost:8080/api/user/addUser`, {
       
      email: email, username: username, lastName: lastName,
       can_read_users: can_read_users,can_delete_users: can_delete_users,can_update_users: can_update_users,can_create_users: can_create_users ,password:password}, {
  
        headers:this.headers}).pipe(
          catchError(this.handleError)
        );
  
      
  
    }

    login(email: string, password : string):Observable<any>{



     

      return this.httpClient.post<LoginRequest>('http://localhost:8080/auth/login',{email:email, password:password}).pipe(
        catchError(this.handleError)
      );


     
      
    }

    getAllUsers():Observable<any>{
  
      console.log(this.headers)

      return this.httpClient.get('http://localhost:8080/api/user/all', {headers:this.headers})

    }

  deleteUser(id: string):Observable<any>{
   
    return this.httpClient.delete(`http://localhost:8080/api/user/del/${id}`, {headers:this.headers}).pipe(
      catchError(this.handleError)
    );

  }

  getUserById(id: number): Observable<any> {

    return this.httpClient.get(`http://localhost:8080/api/user/${id}`, {headers: this.headers}).pipe(
      catchError(this.handleError)
    );
;
  }

  private updateHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
  }
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
      console.log("ulazim?")
      console.log(error)
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.error}\n`;
    }
    alert(errorMessage);
    // You can pass the error message to the component or log it as needed
    return throwError(errorMessage);
  }


}