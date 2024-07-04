import {Component, inject} from '@angular/core';
import {Order} from '../order.model';
import {OrderService} from '../order.service';
import {OrderListItemComponent} from './order-list-item/order-list-item.component';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    OrderListItemComponent,
    RouterLink,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {

  protected orders: Order[];
  private router = inject(Router);

  constructor(orderService: OrderService) {
    this.orders = orderService.getOrders();
  }

  protected onOpenOrder(id: string): void {
    this.router.navigate(['orders', id]);
  }
}
