import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Course } from '../../model/course';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['',
      [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
    category: ['', [Validators.required]]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({name: course.name, category: course.category, _id: course._id})
  }

  onSubmit () {
    this.service.save(this.form.value).subscribe({
      next: (result) => this.onSuccess(),
      error: error => this.onError()
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

  getMensagemErro(field: string) {
    const campo = this.form.get(field);
    if(campo?.hasError('required')) {
      return 'Campo obrigatorio';
    }

    if(campo?.hasError('minlength')) {
      const tamanhoMinimo: number = campo.errors ? campo.errors['minlength']['requiredLength']: 5;
      return `Tamanho mínimo de caractéres é de ${tamanhoMinimo}`;
    }

    if(campo?.hasError('maxlength')) {
      const tamanhoMaximo: number  = campo.errors ? campo.errors['maxlength']['requiredLength']: 100;
      return `Tamanho mánimo de caractéres é de ${tamanhoMaximo}`;
    }

    return 'Campo Inválido';
  }

}
