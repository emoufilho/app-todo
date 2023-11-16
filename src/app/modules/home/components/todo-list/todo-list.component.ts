import { Component, DoCheck, Input, OnInit } from '@angular/core';

//Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("localStorageTaskList") || "[]");

  constructor() { }

  ngOnInit(): void {
  } 

  ngDoCheck(): void {
    //Sort the list by checked
    this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
    //Set local storage
    this.setLocalStorage();
  }

  public setEmitTaskList(event: string){
    this.taskList.push({task: event, checked: false});
  }

  public deleteItemTaskList(event: number){
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList(){
    const confirm = window.confirm('Are you sure you want to delete all tasks?');
    if(confirm){
      this.taskList = [];
    } 
  }

  public validationInput(event: string, index: number){
    
    if(!event.length){
      const confirm = window.confirm('Are you sure you want to delete this task?');
      if(confirm){
        this.taskList.splice(index, 1);
      }
    }

  }

  public setLocalStorage(){
    if(this.taskList){
      localStorage.setItem("localStorageTaskList", JSON.stringify(this.taskList));
    }
  }

}