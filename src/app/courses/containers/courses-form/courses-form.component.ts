import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';


@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location) {
  }

  ngOnInit(): void {

  }

  onSubmit () {
    this.service.save(this.form.value).subscribe({
      next: (result) => this.onSuccess(),
      error: () => this.onError
    })
  }

  private onSuccess () {
    this.snackBar.open('Curso salvo com sucesso!', '', {duration: 3000});
    this.onCancel();
  }

  onCancel () {
    this.location.back();
  }

  private onError () {
    this.snackBar.open('Erro ao salvar curso!', '', {duration: 3000});

  }

}
