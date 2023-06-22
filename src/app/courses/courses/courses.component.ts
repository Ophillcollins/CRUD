import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';

import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  //inicializando a variável aqui..

  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'time'];

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesService.list()
      .pipe(
        catchError((error) => {
          this.onError('Erro ao carregar cursos!');
        return of([]);
        })
      );
    }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {
    // aqui o courses é atribuido pelo cousesService que é o serviço que usamos, no caso a classe que exportamos, junto com seu método aplicado no services
  }
}
