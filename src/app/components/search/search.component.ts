import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,  // ✅ Make sure this is a standalone component
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {

 constructor(private router: Router) { }  

 ngOnInit(): void { }  // Empty ngOnInit() method to satisfy Angular requirement for standalone components

 doSearch(value: string): void {
  //  this.router.navigate(['/search', value]);
  console.log('Searching for: '+ value);  // This will log the search term in the console
  this.router.navigateByUrl(`/search/${value}`); 
 }
}
