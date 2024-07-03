// api-productos.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cow } from '../../utils/cow';
//defino una url constante para usarla
const URL = "https://664e6bdffafad45dfae00442.mockapi.io/cows";

@Injectable({
  providedIn: 'root'
})
export class ApiCowsService {
  constructor(private http: HttpClient) { }

  getData(): Observable<Cow[]> { //mantiene un observable ante cambios
    return this.http.get<Cow[]>(URL)
      .pipe(
        tap((cows: Cow[]) => cows.forEach(cow => cow.vendidos = 0)) //agrego vendidos en valor 0
      );
  }
  deleteCow(id: string): Observable<void> {
    return this.http.delete<void>(`${URL}/${id}`); //en caso de querer eliminar vacas creo un metodo para eso
  }
  addCow(newCow: Cow): Observable<Cow> {
    return this.http.post<Cow>(URL, newCow); //en el caso de agregar vacas creo un metodo para eso
  }
}
