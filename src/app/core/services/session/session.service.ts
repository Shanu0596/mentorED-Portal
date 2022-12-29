import { Injectable } from '@angular/core'
import { API_CONSTANTS } from '../../constants/apiUrlConstants'
import { map } from 'rxjs'
import { ApiService } from '../api/api.service'
import { ToastService } from '../toast/toast.service'

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    private toastService: ToastService,
    private apiService: ApiService,
  ) {}

  enrollSession(id: any) {
    const config = {
      url: API_CONSTANTS.ENROLL_SESSION + id,
      payload: {},
    }
    return this.apiService.post(config).pipe(
      map((result: any) => {
        this.toastService.showMessage(result.message, 'success')
        return result.result
      }),
    )
  }
  joinSession(id: any) {
    const config = {
      url: API_CONSTANTS.JOIN_SESSION + id,
      payload: {},
    }
    return this.apiService.get(config).pipe(
      map((result: any) => {
        this.toastService.showMessage(result.message, 'success')
        window.open(result.result.link)
      }),
    )
  }
  pastSession(obj:any){
    const config = {
      url:
        API_CONSTANTS.GET_SESSIONS_LIST +
        obj.page +
        '&limit=' +
        obj.limit +
        '&status=' +
        obj.status,
      payload: {},
    }
    return this.apiService.get(config).pipe(
      map((result: any) => {
       console.log(result)
       return result
      })
    )
  }
  allSession(obj:any){
    const config={
      url: API_CONSTANTS.SESSIONS+ obj.type+'&page='+ obj?.page + '&limit=' + obj?.limit,
    }
    return this.apiService.get(config).pipe(
      map((result: any) => {
       return result
      })
    )
  }
}
