import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    Expense,
  ExpenseCriteria,
  ExpenseUpsertDto,
  Page
} from '../shared/domain';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private readonly apiUrl = `${environment.backendUrl}/categories`;
  private readonly apiV2Url = `${environment.backendUrl}/v2/categories`;

  constructor(private readonly httpClient: HttpClient) {}

  // Read

  getExpenses = (pagingCriteria: ExpenseCriteria): Observable<Page<Expense>> =>
    this.httpClient.get<Page<Expense>>(this.apiUrl, { params: new HttpParams({ fromObject: { ...pagingCriteria } }) });


  // Create & Update

  upsertExpenses = (expense: ExpenseUpsertDto): Observable<void> => this.httpClient.put<void>(this.apiUrl, expense);

  // Delete

  deleteExpenses = (id: string): Observable<void> => this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
}