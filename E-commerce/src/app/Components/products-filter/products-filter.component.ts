import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';  

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  categories$;
  @Input('category') category: any;
  constructor(private categoryservice: CategoryService) {

    this.categories$ = categoryservice.getCategories();
   }

  ngOnInit(): void {
  }

}
