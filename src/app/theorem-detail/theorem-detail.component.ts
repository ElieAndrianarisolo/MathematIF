import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TheoremDetail } from '../theorem-detail';
import { TheoremDetailService } from '../theorem-detail.service';


@Component({
  selector: 'app-theorem-detail',
  templateUrl: './theorem-detail.component.html',
  styleUrls: ['./theorem-detail.component.css']
})
export class TheoremDetailComponent implements OnInit {
  @Input() theorem?: TheoremDetail;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private theoremDetailService: TheoremDetailService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe( params =>
    {
      this.getTheorem();
    });
  }

  getTheorem() {
		const name = this.route.snapshot.paramMap.get('value');
    console.log(name)
    if (name != null) {
      this.isLoading = true;
			this.theoremDetailService.getTheoremFast(name).subscribe((value)=>{
        let index = value.findIndex((v: any) => v.name === name);
        console.log(value)
        console.log(index, name)
        if (index != -1) {
          this.theorem = value[index];
        }else {
          // this.theoremDetailService.getTheoremMore(name).subscribe((value)=>{
          //   let index = value.findIndex((v: any) => v.name === name);
          //   console.log(value)
          //   console.log(index, name)
          //   if (index != -1) {
          //     this.theorem = value[index];
          //   }else {
          //     this.theorem = value[0];
          //   }
          // });
          this.theorem = value[0];
        }
        console.log(this.theorem);
        this.isLoading = false;
			});
		}
	}
}




