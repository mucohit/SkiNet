import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BusyService } from "../services/busy.service";
import { catchError, delay ,finalize } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class LoadingInterceptors implements HttpInterceptor{

    constructor(private busyService: BusyService){}
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            this.busyService.busy();
            return next.handle(req).pipe(
                delay(1000),
                finalize(() => {
                    this.busyService.idle();
                })
            );
        }
   
}