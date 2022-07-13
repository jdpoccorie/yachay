import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { HabitacionesComponent } from './Habitaciones/habitaciones.component';
import { HabitacionesRepository } from './DataAccess/habitaciones.repository';
import { HttpClientModule } from "@angular/common/http";
import { TotalSeleccionHabPipe } from './totalSeleccionHab.pipe';
import { TotalHabitacionesPipe } from './totalHabitaciones.pipe';
import { TotalHuepedesHabPipe } from './totalHuespedesHab.pipe';
import { CheckOutComponent } from './CheckOut/checkout.component';
import { CheckOutRepository } from './DataAccess/checkout.repository';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { ProcessDialogComponent } from './CheckOut/process-dialog.component';
import { DetalleOrdenComponent } from './Ordenes/detalle-orden.component';
import { DisponibilidadDialogComponent } from './Habitaciones/disponibilidad-dialog.component';
import {NgsRevealModule} from 'ngx-scrollreveal';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { HeaderPagesComponent } from './header-pages.component';
import { DatePipe } from '@angular/common';
import { MonedaFormatoPipe } from './monedaFormato.pipe';
import { StoreFirstGuard } from './storeFirst.guard';
import { FooterWebComponent } from './Web/footer.component';
import { HeaderWebComponent } from './Web/header.component';
import { HomeWebComponent } from './Web/home.component';
import { NosotrosWebComponent } from './Web/nosotros.component';
import { ContactoWebComponent } from './Web/contacto.component';
import { GaleriaWebComponent } from './Web/galeria.component';
import { ComercioWebComponent } from './Web/comercio.component';
import { RestauranteWebComponent } from './Web/restaurante.component';
import { HotelWebComponent } from './Web/hotel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { SistemaWebComponent } from './Web/sistema.component';

@NgModule({
  declarations: [
    AppComponent, HeaderPagesComponent, HeaderComponent, HabitacionesComponent, TotalSeleccionHabPipe, TotalHabitacionesPipe, TotalHuepedesHabPipe, MonedaFormatoPipe, CheckOutComponent,
    ProcessDialogComponent, DetalleOrdenComponent, DisponibilidadDialogComponent, FooterWebComponent, HeaderWebComponent, HomeWebComponent, NosotrosWebComponent, SistemaWebComponent,
    ContactoWebComponent, GaleriaWebComponent, ComercioWebComponent, HotelWebComponent, RestauranteWebComponent,
  ],
  imports: [
    BrowserModule,
    IvyCarouselModule,
    NgsRevealModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      { path: "home", component: HomeWebComponent },
      { path: "nosotros", component: NosotrosWebComponent },
      { path: "contacto", component: ContactoWebComponent },
      { path: "galeria", component: GaleriaWebComponent },
      { path: "comercio", component: ComercioWebComponent},
      { path: "sistema", component: SistemaWebComponent},
      { path: "restaurante", component: RestauranteWebComponent},
      { path: "hoteles", component:HotelWebComponent},
      { path: "booking/:checkIn/:checkOut/:nroPersonas", component: HabitacionesComponent },
      { path: "checkout", component: CheckOutComponent, canActivate: [StoreFirstGuard] },
      { path: "orden-detail", component: DetalleOrdenComponent, canActivate: [StoreFirstGuard] },
      { path: "**", redirectTo: "/home" },
      ], {useHash: true}),
    NgbModule
  ],
  exports:  [
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
  ],
  providers: [ DatePipe, HabitacionesRepository, CheckOutRepository, StoreFirstGuard, MatDialog, {provide: MAT_DATE_LOCALE, useValue: 'es-PE'} ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
