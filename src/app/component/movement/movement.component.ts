import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MovementService} from '../../service/movement.service';
import {Transfer} from '../../model/transfer';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {
  displayedColumns: string[] = [
    'recipientAccountNumber',
    'senderAccountNumber',
    'description',
    'originalCurrency',
    'amount',
    'date'
  ];
  dataSource: Transfer[] = [];

  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageSize = 5;
  length = 100;
  pageEvent: PageEvent;

  orderByDateAscending: boolean = undefined;
  orderByAmountAscending: boolean = undefined;

  currentPageSize = 5;
  currentPageNumber = 0;

  constructor(private movementService: MovementService) {
  }

  ngOnInit(): void {
    this.updateMovements();
  }

  public getServerData(event?: PageEvent): PageEvent {
    this.currentPageSize = event.pageSize;
    this.currentPageNumber = event.pageIndex;
    this.updateMovements();
    return event;
  }

  public setOrderByDateAscending(event): void {
    this.orderByDateAscending = event.value;
    this.updateMovements();
  }

  public setOrderByAmountAscending(event): void {
    this.orderByAmountAscending = event.value;
    this.updateMovements();
  }

  private updateMovements(): void {
    this.movementService.getTransfers(this.orderByDateAscending, this.orderByAmountAscending,
      this.currentPageNumber, this.currentPageSize)
      .pipe().subscribe(response => {
      this.dataSource = response;
    });
  }


}
