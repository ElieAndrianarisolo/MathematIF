import { Component, OnInit } from '@angular/core';
import { SearchBarService } from '../searchbar.service';
import { FormControl, FormGroup } from "@angular/forms";
import { Element } from "../element";
import { MathematicianDetailService } from "../mathematician-detail.service";


@Component({
selector: 'app-searchbar',
templateUrl: './searchbar.component.html',
styleUrls: ['./searchbar.component.css']
})

export class SearchbarComponent implements OnInit {
	mathematicianTable: Element[] = [];
	domainTable: Element[] = [];
	theoremTable: Element[] = [];
	sparql: string = '';
  isLoading: boolean = false;
  top10Table: Element[] = [];

  filterForm = new FormGroup({
    mathematicians: new FormControl(true),
    domains: new FormControl(false),
    theorems: new FormControl(false),
  })

	constructor(
		private searchBarService: SearchBarService,
    private mathematicianService: MathematicianDetailService
	) {}

	ngOnInit(): void {
    this.mathematicianService.getTop10().subscribe((value) => {
      this.top10Table = value;
    })
	}

	search(input: string) {
    if((this.searchBarService.filters.domains || this.searchBarService.filters.mathematicians || this.searchBarService.filters.theorems) && input !=="")
    {
      this.isLoading = true;
      this.searchBarService.search(input).subscribe((value)=>{
        this.isLoading = false;
        let counter = 0;
        for (let valueFilter of Object.entries(this.searchBarService.filters))
        if (valueFilter[1] === true) {
          switch (valueFilter[0]) {
            case "mathematicians":
              this.mathematicianTable = value[counter];
              counter++;
              break;
            case "domains":
              this.domainTable = value[counter];
              counter++;
              break;
            case "theorems":
              this.theoremTable = value[counter];
              counter++;
              break;
          }
        }
      });
    }

	}

  updateFilters() {
    this.searchBarService.setFilters({
      mathematicians: this.filterForm.value.mathematicians || false ,
      domains: this.filterForm.value.domains || false,
      theorems: this.filterForm.value.theorems || false,
    });
  }

  protected readonly top = top;
}


