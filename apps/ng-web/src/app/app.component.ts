import { JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {
  COLOR_GRID_ITEMS,
  ColorGridSelectComponent,
} from '@brew/ng/ui/components';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,

    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,

    ColorGridSelectComponent,
  ],
  selector: 'brew-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  validatedRGBs: any = [];
  public readonly form = this._fb.group({
    search: this._fb.control(''),
    color: this._fb.control(COLOR_GRID_ITEMS[2], {
      validators: [Validators.required],
    }),
  });

  search() {
    const colorChange: any = this.form.controls.search.value;
    this.validatedRGBs = this.form.controls.search.value;
    this.validatedRGBs = this.splitAndValidateRGB(colorChange);

    this.cdr.detectChanges();
  }

  splitAndValidateRGB(rgbStrings: string): string[] {
    const regex = /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/g;
    const matches = rgbStrings.match(regex) || [];
    return matches;
  }
}
