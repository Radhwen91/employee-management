import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiDataService } from '../services/api-data.service';
import { Person } from '../models/person';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddDataComponent } from '../add-data/add-data.component';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss'],
})
export class ListDataComponent implements OnInit , AfterViewInit  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id','firstName','lastName', 'age', 'dob', 'email', 'salary', 'address', 'imageUrl', 'contactNumber', 'action'];
  globalFilter: string = '';
  dataSource = new MatTableDataSource<Person>();
 person : Person = {
  id : 0,
    age : 0,
    dob: '',
    email: '',
    salary: '',
    address: '',
    imageUrl: '',
    lastName: '',
    firstName: '',
    contactNumber: ''
 }
  constructor(private dataService: ApiDataService, public dialog: MatDialog) {}
  ngOnInit() {
    this.loadData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


applyGlobalFilter() {
    // Use the global filter to filter data across all columns
    this.dataSource.filterPredicate = (data: any, filter) => {
      const lowerCaseFilter = filter.toLowerCase();

      return (
        data.id.toString().includes(lowerCaseFilter) ||
        data.firstName.toLowerCase().includes(lowerCaseFilter) ||
        data.lastName.toLowerCase().includes(lowerCaseFilter) ||
        data.age.toString().includes(lowerCaseFilter) ||
        data.dob.toLowerCase().includes(lowerCaseFilter) ||
        data.email.toLowerCase().includes(lowerCaseFilter) ||
        data.salary.toString().includes(lowerCaseFilter) ||
        data.address.toLowerCase().includes(lowerCaseFilter) ||
        data.imageUrl.toLowerCase().includes(lowerCaseFilter) ||
        data.contactNumber.toLowerCase().includes(lowerCaseFilter)
      );
    };

    this.dataSource.filter = this.globalFilter.trim().toLowerCase();
  }

  loadData() {
    this.dataService.getData().subscribe((result) => {
      this.dataSource.data = result;
    });
  }

  deleteItem(index: number) {
    console.log(index);
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [...this.dataSource.data];
  }

  addItem(newItem: Person) {
    newItem.id = this.dataSource.data.length +2;
    this.dataSource.data.push(newItem);
    this.dataSource.data = [...this.dataSource.data];
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddDataComponent, {
      data : this.person,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.person = result;
      this.addItem(this.person);
    });
    
  }


}
