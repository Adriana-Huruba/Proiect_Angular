import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
    selector: 'app-movie-form-modal',
    standalone: true,
    imports: [CommonModule,
        ReactiveFormsModule,
        NzModalModule,
        NzRateModule,
        NzFormModule,
        NzInputModule,
        NzPaginationModule,
        FormsModule
    ],
    templateUrl: './movie-form-modal.component.html',
    styleUrl: './movie-form-modal.component.scss'
})
export class MoviesFormModalComponent implements OnInit {

    @Input() movie: any;
    form!: FormGroup;
    isVisible: any;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            title: [this.movie?.title || '', Validators.required],
            director: [this.movie?.director || '', Validators.required],
            year: [this.movie?.year || new Date().getFullYear(), [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
            genre: [this.movie?.genre || '', Validators.required],
            rating: [this.movie?.rating || 0],
            duration: [this.movie?.duration || 0, [Validators.required, Validators.min(1)]],
            description: [this.movie?.description || '', Validators.required]
        });
    }
}