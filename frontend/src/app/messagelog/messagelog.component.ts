import { Component, OnInit } from '@angular/core';
import {MessagelogService} from "./messagelog.service";

@Component({
  selector: 'app-messagelog',
  templateUrl: './messagelog.component.html',
  styleUrls: ['./messagelog.component.css']
})
export class MessagelogComponent implements OnInit {

  constructor(private messageService:MessagelogService) { }

  ngOnInit() {
  }

}
