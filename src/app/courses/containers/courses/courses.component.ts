import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  //inicializando a variável aqui..

  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private routes: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
    }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {
    // aqui o courses é atribuido pelo cousesService que é o serviço que usamos, no caso a classe que exportamos, junto com seu método aplicado no services
  }


  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.routes })
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.routes })
  }
  onDelete(course: Course) {
    this.coursesService.delete(course._id).subscribe(
      () => {
        this.refresh()
        this.snackBar.open('Curso removido com sucesso!', 'X', {duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
        });
      },
        () => this.onError('Erro ao tentar remover curso!')
    );
  }

  refresh() {
    this.courses$ = this.coursesService.list()
      .pipe(
        catchError((error) => {
          this.onError('Erro ao carregar cursos.');
        return of([]);
        })
      );
  }

}
