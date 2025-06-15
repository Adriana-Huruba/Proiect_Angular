import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
    selector: 'app-movie-form-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NzRateModule, NzFormModule, NzInputModule],
})
export class MoviesFormModalComponent implements OnInit {
    @Input() movie: any;
    form!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            title: [this.movie?.title || '', Validators.required],
            director: [this.movie?.director || '', Validators.required],
            duration: [this.movie?.duration || 0, [Validators.required, Validators.min(1)]],
            genre: [this.movie?.genre || '', Validators.required],
            rating: [this.movie?.rating || 0]
        });
    }
}