import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "src/app/services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";


//Descripcion de suit que hace la refertencia al componente a probar
describe('CartComponent', () => {
    //Arrange
    let component: CartComponent; //componente a testear
    let fixture: ComponentFixture<CartComponent>; //se utiliza para extraer elementos del componente
    // refactorizacion de service
    //    let service: BookService;

    //beforeEach se ejecuta antes de cada test unitario
    beforeEach(waitForAsync(() => {
        // configura los elementos necesarios para ejecutar
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],//importamos los elementos necesarios para el test
            declarations: [CartComponent], // declaramos el componente a testear
            providers: [BookService], //servicios utilizados
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        //Instancia del test
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // activa el componente por el OnInit
    });

    //Test Unitarios
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});