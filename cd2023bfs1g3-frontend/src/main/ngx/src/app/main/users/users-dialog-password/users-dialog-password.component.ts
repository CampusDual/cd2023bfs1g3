import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-users-dialog-password',
  templateUrl: './users-dialog-password.component.html',
  styleUrls: ['./users-dialog-password.component.css']
})
export class UsersDialogPasswordComponent implements OnInit {
  hide: boolean = true;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: string, pass: string}) {  }
  
  ngOnInit() {
  }

}
