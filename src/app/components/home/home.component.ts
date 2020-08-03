import {Component, OnInit} from '@angular/core';
import {BackendApisService, UserDetails} from '../../services/backend-apis.service';
import {Todo} from '../../model/Todo';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todo: Todo = {
    todoTask: ''
  };
  pageOfItems = [];
  searchOfItems = [];
  pageNo = 0;
  searchSorting = 1;
  todos: any;
  searchTodo: any;
  eSearch: boolean;
  dataLoading: boolean;
  showSucessMessage: boolean;
  serverErrorMessages: boolean;

  constructor(private apiServices: BackendApisService) {
  }


  ngOnInit() {

    this.getAllTodo();

  }


  getAllTodo() {
    this.apiServices.getAllTodo(this.pageNo, this.searchSorting).subscribe((response: any) => {
      
      this.todos = response.response.data;
      this.searchTodo = response.response.data;
      const countPage = response.response.totalCount / this.apiServices.pageLimit;
      for (let i = 0; i < countPage; i++) {

        this.pageOfItems[i] = 0;
        this.searchOfItems[i] = 0;
      }
    }, error => {
      throw  error;
    });
  }

  clickPage(data) {
    this.pageNo = data;

    if (this.eSearch === true) {
      this.getSearchTask();
    } else {
      this.getAllTodo();
    }
  }

  sorting(sort) {
    this.searchSorting = sort;


    if (this.eSearch === true) {
      this.getSearchTask();
    } else {
      this.getAllTodo();
    }

  }

  getSearchTask() {
    if (this.todo.todoTask.length > 0) {
      this.apiServices.getSearchTask(this.todo.todoTask, this.pageNo, this.searchSorting).subscribe((response: any) => {
        this.todos = response.response.data;
        const countPage = response.response.totalCount / this.apiServices.pageLimit;
        this.pageOfItems.length = 0;
        for (let i = 0; i < countPage; i++) {
          this.pageOfItems[i] = 0;
        }
        this.eSearch = true;
        this.dataLoading = false;
        if (response.response.totalCount === 0) {
          this.dataLoading = true;
          this.eSearch = false;
        }
      }, error => {
        throw  error;
      });
    } else {
      if (this.todo.todoTask.length === 0) {
        this.todos = this.searchTodo;
        this.pageOfItems = this.searchOfItems;
        this.eSearch = false;
        this.dataLoading = false;
      }
    }
  }


  deleteTodo(id) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.apiServices.deleteTodo(id).subscribe((response: any) => {
        this.getAllTodo();
        this.showSucessMessage = response.response;
        setTimeout(() => this.showSucessMessage = false, 4000);
      }, error => {
        this.serverErrorMessages = error.response;
        setTimeout(() => this.serverErrorMessages = false, 4000);
      });
    }
  }


}
