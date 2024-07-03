import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CowsComponent } from './cows/cows.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CartComponent } from './cart/cart.component';
import { ApiCowsService } from './services/api-productos.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CowsComponent,
    HomeComponent,
    GalleryComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ApiCowsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
