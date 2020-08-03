import {Component, OnInit} from '@angular/core';
import {BackendApisService} from '../../services/backend-apis.service';
import {Todo} from '../../model/Todo';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public buttonStatus = true;

  constructor(private apiServices: BackendApisService, public route: ActivatedRoute, private router: Router) {
  }

  todos: any[];
  todo: Todo = {
    todoTask: '',
    todoDueDate: '',
    todoTime: '',
    todoStatus: ''
  };

  todoPageName = 'Todo';
  showSucessMessage: boolean;
  serverErrorMessages: boolean;


  id = this.route.snapshot.params.id;

  ngOnInit() {

    this.getTodoById(this.id);
  }


  getTodoById(id) {
    if (id) {
      this.apiServices.getTodoById(id).subscribe((response: any) => {
        this.todo = response.response;
      }, error => {
        throw  error;
      });
    } else {
      return false;
    }

  }


  addTodo(todoData: NgForm) {

    if (!this.id) {
      this.apiServices.createNewTodo(this.todo).subscribe((response: any) => {
        this.showSucessMessage = response.status.message;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(todoData);
      }, error => {
        this.serverErrorMessages = error.error.response;
        setTimeout(() => this.serverErrorMessages = false, 4000);
      });
    } else {
      const postData = {
        todoStatus: this.todo.todoStatus
      };
      this.apiServices.updateTodo(this.id, postData).subscribe((response: any) => {
        this.todos = response;
        this.showSucessMessage = response.status.message;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(todoData);
        this.router.navigate(['/users/home']);
      }, error => {
        this.serverErrorMessages = error.error.response;
        setTimeout(() => this.serverErrorMessages = false, 4000);
      });
    }
  }


  resetForm(form: NgForm) {
    this.todo = {
      todoTask: '',
      todoDueDate: '',
      todoTime: '',
      todoStatus: ''
    };
    form.resetForm();
  }

}
