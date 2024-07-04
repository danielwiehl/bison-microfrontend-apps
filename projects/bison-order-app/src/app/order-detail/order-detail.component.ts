import {Component, inject, Signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {OrderService} from '../order.service';
import {Item, Order} from '../order.model';
import {OrderItemComponent} from './order-item/order-item.component';
import {CustomerInfoComponent} from './customer-info/customer-info.component';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    OrderItemComponent,
    CustomerInfoComponent,
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {

  private orderService = inject(OrderService);
  private router = inject(Router);

  protected order: Signal<Order>;

  constructor(route: ActivatedRoute) {
    this.order = toSignal(route.paramMap
      .pipe(
        map(params => params.get('id')!),
        map(id => this.orderService.getOrder(id)!),
        takeUntilDestroyed(),
      ), {requireSync: true});
  }

  protected onOrderItemClick(item: Item): void {
    this.router.navigate(['products', item.productId]);
  }
}
