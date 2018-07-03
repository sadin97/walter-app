import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Dodao za input neki binding.

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { SearchPipe } from './filters/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
