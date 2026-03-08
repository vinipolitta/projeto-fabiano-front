import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './Layout/footer/footer.component';
import { HeaderComponent } from './Layout/header/header.component';

const components = [
  FooterComponent,
  HeaderComponent
]

@NgModule({
  imports: [
    CommonModule,
    ...components,
  ],
  declarations: [],
  exports: [...components],

})
export class SharedModule { }
