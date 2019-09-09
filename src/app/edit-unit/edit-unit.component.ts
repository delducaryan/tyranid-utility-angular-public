import { Component, OnInit } from '@angular/core';
import Unit from '../../classes/unit';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.css']
})
export class EditUnitComponent implements OnInit {

  unit = new Unit();

  constructor() {
    
  }

  ngOnInit() {
  }

}
