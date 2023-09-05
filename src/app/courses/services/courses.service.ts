import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Course } from './../model/course';

@Injectable({
  providedIn: 'root'
})
  // o serviço é responsável para passar as informações para o componente
export class CoursesService {
  // aqui eu criei uma variavel privada com o readonly para evitar modificações e chamei ela de API e passei o caminho do json que eu criei com os dados que quero passar do array de course
  private readonly  API = 'api/courses';

  // aqui é onde usamos o HttpClient, que no caso é onde é feito a chamada da api para pegar dados do backend/bd
  constructor(private httpClient: HttpClient) { }
  // método aplicado para retornar as categorias passadas na interface/models e para ser renderizado na tela atraves di service
  list() {
    //aqui o meu método list virou um Observable, onde eu consigo fazer a chamada da minha API para pegar o array Course
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        //neste caso o first é utilizado para chamar os dados uma vez só, já que não se trata de um streaming e que ocorre varias mudanças.
        first(),
        // o delay é para que seja configurado o tempo que o spinner vai ficar carregando antes das informações chegarem.
          delay(500),
      );

  }

  loadById (id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save (record: Partial<Course>) {
    if(record._id) {
      return this.update(record)
    }
    return this.create(record);
  }

  private create (record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());

  }

}
