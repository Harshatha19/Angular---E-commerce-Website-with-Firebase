import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
categories$;  // this is an observable
product;
id;

  constructor(private categoryservice: CategoryService,
    private productservice: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
   

    this.categories$ = categoryservice.getCategories();
    console.log(this.categories$)

    this.id = this.route.snapshot.paramMap.get('id');
    this.product = {};

    if (this.id) {
     this.productservice.getProduct(this.id).pipe(take(1)).subscribe(p => {
      this.product = p.payload.val();
      console.log(this.product);
    } );
    }
    
    
  }

  ngOnInit(): void {
  }
  save(product) { //save product to firebase
    if(this.id) this.productservice.updateProduct(this.id, product);
    else  this.productservice.create(product);
    this.router.navigate(['/admin/products']);
  }

  Delete(){
    if(!confirm('confirm delete?')) return;

      this.productservice.deleteProduct(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
