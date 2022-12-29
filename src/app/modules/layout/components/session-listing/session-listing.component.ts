import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services';
import { API_CONSTANTS } from 'src/app/core/constants/apiUrlConstants'
import { SessionService } from 'src/app/core/services/session/session.service';
import { localKeys } from 'src/app/core/constants/localStorage.keys';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
interface item {
  userId?: string;
}

@Component({
  selector: 'app-session-listing',
  templateUrl: './session-listing.component.html',
  styleUrls: ['./session-listing.component.scss']
})
export class SessionListingComponent implements OnInit {
  cardHeading: any;
  cardDetails: Array<item> = []
  mySessions: any;
  allSessions: any;
  start: any = 0;
  lastIndex: any = 4;
  selectedPage: any;
  page: any = 1;
  limit: any = 2
  noData: any="NO_ALL_SESSION_CONTENT"
  loading: boolean = false;
  userDetails: any;
  sessionsCount = 0
  allSession: any = []
  showLoadMoreButton: boolean = false
  dataCount = 0
  type: any

  constructor(
    private router: Router,
    private apiService: ApiService,
    private sessionService: SessionService,
    private localStorage: LocalStorageService,
  ) {
    this.selectedPage = router.url
  }

  async ngOnInit(){
    this.userDetails= JSON.parse(
      await this.localStorage.getLocalData(localKeys.USER_DETAILS),
    )
    this.cardHeading =
    this.selectedPage == '/enrolled-sessions' ? 'MY_SESSIONS' : 'ALL_SESSIONS'
    this.getAllSession()
  }

  onClickViewMore() {
    this.page = this.page + 1
    this.getAllSession()
  }
  getAllSession() {
    this.loading = true
    let type = this.type == 'enrolled-sessions' ? true : false
    let obj = {
      type: type,
      page: this.page,
      limit: this.limit,
    }
    this.sessionService.allSession(obj).subscribe((data: any) => {
      this.cardDetails = this.cardDetails.concat(data?.result[0]?.data)
      this.allSession = this.allSession.concat(data?.result[0]?.data)
      this.sessionsCount = data?.result[0]?.count
      this.showLoadMoreButton =
        this.allSession?.length === this.sessionsCount ? false : true
    })
  }
  buttonClick(event: any) {
    switch (event.action.type) {
      case 'enrollAction':
        this.sessionService
          .enrollSession(event.data._id)
          .subscribe((result) => {
            this.getAllSession()
          })
        break
      case 'joinAction':
        this.sessionService
          .joinSession(event.data._id)
          .subscribe((result) => {})
        break
    }
  }
}
