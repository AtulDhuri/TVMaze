import { Component, OnInit, OnDestroy } from '@angular/core';
import { MazeapiService } from '../shared/mazeapi.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { takeWhile, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  searchControl: FormControl = new FormControl();
  programsList: any;
  airdate: any;
  private alive: boolean;
  isLoading: boolean;
  isErr: boolean;
  isSearchOn: boolean;
  constructor(private mas: MazeapiService) { }

  ngOnInit() {
    this.isErr = false;
    this.alive = true;
    this.getSchedules();
    this.setupSearch();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getSchedules() {
    this.isLoading = true;
    this.mas.getFullSchedule().pipe(
      takeWhile(() => this.alive),
      finalize(() => this.isLoading = false )
     )
    .subscribe(data => {
       this.programsList = data;
       console.log(data);
      }, error => {
        this.isErr = true;
        console.log(error);
      });
  }

  private setupSearch() {
    if(this.searchControl.value = ''){
      return;
    }
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.mas.searchShows(query))
    ).subscribe(shows => {
       console.log(shows);
       this.programsList = shows;
       
    });
  }
}
