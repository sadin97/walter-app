import { Component, OnInit } from '@angular/core';
import { Worker } from '../../models/daily';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  model = new Worker('name', 'time', 'onTime');

  constructor() { }

  ngOnInit() {
  }

  adding = false;
  page = "list"
  editing = false;
  searchText = '';
  maxWorkers = 3;

  workers = [
    { id: 0, name: "Sadin", editing: false },
    { id: 1, name: "John", editing: false },
    { id: 2, name: "Erick", editing: false }
  ]


  dailyscrum = [
  ]

  str: string;
  SaveWorker(id, i): void {
    //console.log(this.str);
    //console.log(i);

    this.workers[i].name = this.str;
    this.workers[i].editing = false;

  }

  RemoveWorker(i, name) {
    this.workers.splice(i, 1);
    //console.log(i, name);
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
    console.log(this.workers);
  }

  ResetOthers(val) {
    for(var i=0; i < this.maxWorkers; i++) {
      if(i != val) {
        console.log("ova nije: " + i);
        this.workers[i].editing = false;
        console.log(this.workers[i].editing);
      }
    }
  }

  AddDailyScrum() {

  }

  submitted = false;

  onSubmit() {

    let uslov_h = false;
    let uslov_m = false;

    let prag_dolaska = 31500; // Broj sekundi koji je ustvari 8 sati i 45 minuta (8:45 je prag dolaska na vrijeme).

    let input = this.model.time;
    let fields = input.split(':');

    let hours = fields[0];
    let minutes = fields[1];

    //console.log("Dosao na posao u " + hours + " sati i " + minutes + " minuta.");

    hours = Number(hours);
    minutes = Number(minutes);

    let sekunde = (minutes * 60) + ((hours * 60) * 60); // Broj sekundi koje treba uporediti.
    if(sekunde > prag_dolaska)
      this.model.onTime = "Ne";
    else
      this.model.onTime = "Da";

    if(hours >= 0 && hours < 24) {
      // Ovo su pravilno uneseni sati.
      uslov_h = true;
    }

    if(minutes >= 0 && minutes < 60) {
      // Ovo su pravilno unesene minute.
      uslov_m = true;
    }


    if(uslov_h == true && uslov_m == true) {
      this.adding = false;
      this.submitted = true;
      this.dailyscrum.push(this.model);
      console.log(JSON.stringify(this.model));
      console.log(this.dailyscrum);
    }
    else {
      console.log("Vrijeme nije fino uneseno.");
    }

  }

}
