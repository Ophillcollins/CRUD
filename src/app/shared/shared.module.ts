import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';




@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    DialogConfirmationComponent

  ],
  imports: [
    CommonModule,
    AppMaterialModule,

  ],
  exports: [
    CategoryPipe,
    ErrorDialogComponent,
    DialogConfirmationComponent
  ]
})
export class SharedModule { }
