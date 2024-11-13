import { Component, Injector } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  user_name: string;
  user_surname: string;
  role_name: string;
  constructor(
    public injector: Injector,
    private userService: UserService
  ) {
    this.userService.getUser().subscribe(res => {
      let user: User = res.data.pop();
      this.user_name = user.name;
      this.user_surname = user.surname1;
      this.role_name = (user.rolename == null || user.rolename == "") ? "not_authorized" : user.rolename;
    },
      err => console.log(err)
    )
  }
}
