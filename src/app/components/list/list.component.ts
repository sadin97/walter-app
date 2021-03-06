import { Component, OnInit } from '@angular/core';
import { Worker } from '../../models/daily';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  model = new Worker('name', 'time', 'onTime', 'editing');

  constructor() { }

  ngOnInit() {
  }

  adding = false;
  page = "list"
  editing = false;
  searchText = '';
  maxWorkers = 3;
  rowNumber = 1;
  editing_scrum = false;
  addedSuccess = false;
  addedFail = false;

  workers = [
    { id: 0, name: "Sadin", editing: false },
    { id: 1, name: "John", editing: false },
    { id: 2, name: "Erick", editing: false }
  ]


  dailyscrum = [
    { name: "Sadin", time: "6:00", onTime: "Da", editing: false }
  ]

  str: string;
  SaveWorker(id, i): void {
    this.workers[i].name = this.str;
    this.workers[i].editing = false;
  }

  RemoveWorker(i, name) {
    this.workers.splice(i, 1);
    this.maxWorkers -= 1;
  }

  AddWorker() {
    this.maxWorkers += 1;
    let worker = {
      id: this.maxWorkers,
      name: "Uposlenik " + this.maxWorkers,
      editing: false
    }
    this.workers.push(worker);
  }

  ResetOthers(val) {
    for(var i=0; i < this.maxWorkers; i++) {
      if(i != val) {
        this.workers[i].editing = false;
      }
    }
  }

  submitted = false;

  onSubmit() {
    let uslov_h = false;
    let uslov_m = false;

    const prag_dolaska = 31500; // Broj sekundi koji je ustvari 8 sati i 45 minuta (8:45 je prag dolaska na vrijeme).

    let input = this.model.time;
    let fields = input.split(':');

    let hours = fields[0];
    let minutes = fields[1];

    let h = Number(hours);
    let m = Number(minutes);

    let sekunde = (m * 60) + ((h * 60) * 60); // Broj sekundi koje treba uporediti.
    if(sekunde > prag_dolaska)
      this.model.onTime = "Ne";
    else
      this.model.onTime = "Da";

    if(h >= 0 && h < 24) { // Ovo su pravilno uneseni sati.
      uslov_h = true;
    }

    if(m >= 0 && m < 60) { // Ovo su pravilno unesene minute.
      uslov_m = true;
    }

    if(uslov_h == true && uslov_m == true) {
      let object = { name: this.model.name, time: this.model.time, onTime: this.model.onTime, editing: false };
      this.adding = false;
      this.submitted = true;
      this.dailyscrum.push(object);
      this.rowNumber += 1;
      this.addedFail = false;
      this.addedSuccess = true;
    }
    else {
      this.addedSuccess = false;
      this.addedFail = true;
    }
  }

  timeToEdit: string;
  nameToEdit: string;
  SaveScrum(i): void {
    let uslov_h = false;
    let uslov_m = false;

    const prag_dolaska = 31500; // Broj sekundi koji je ustvari 8 sati i 45 minuta (8:45 je prag dolaska na vrijeme).

    let input = this.timeToEdit;
    let fields = input.split(':');

    let hours = fields[0];
    let minutes = fields[1];

    let h = Number(hours);
    let m = Number(minutes);

    let sekunde = (m * 60) + ((h * 60) * 60); // Broj sekundi koje treba uporediti.
    if(sekunde > prag_dolaska)
      this.dailyscrum[i].onTime = "Ne";
    else
      this.dailyscrum[i].onTime = "Da";

    if(h >= 0 && h < 24) { // Ovo su pravilno uneseni sati.

      uslov_h = true;
    }

    if(m >= 0 && m < 60) { // Ovo su pravilno unesene minute.
      uslov_m = true;
    }

    if(uslov_h == true && uslov_m == true) {
      this.dailyscrum[i].time = this.timeToEdit;
      this.dailyscrum[i].name = this.nameToEdit;
      this.dailyscrum[i].editing = false;
    }
    else {
      this.addedFail = true;
    }
  }

  EditScrum(i) {
    this.dailyscrum[i].editing = true;
  }

  DeleteScrum(i) {
    this.dailyscrum.splice(i, 1);
    this.rowNumber -= 1;
  }

  CancelScrum(i) {
    this.dailyscrum[i].editing = false;
  }
}
