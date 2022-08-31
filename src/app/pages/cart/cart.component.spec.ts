//Zona de Imports

import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "src/app/services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";

/* export interface Book {
    id?: string;
    name: string;
    author: string;
    isbn: string;
    description?: string;
    photoUrl?: string;
    price?: number;
    amount?: number;
  } */

const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 10,
        amount: 2
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 3
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 1
    }

]

//Descripcion de suit que hace la refertencia al componente a probar
describe('CartComponent', () => {
    //Arrange
    let component: CartComponent; //componente a testear
    let fixture: ComponentFixture<CartComponent>; //se utiliza para extraer elementos del componente
    // refactorizacion de service
    let service: BookService;

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
    /* 
        ngOnInit(): void {
            this.listCartBook = this._bookService.getBooksFromCart();
            this.totalPrice = this.getTotalPrice(this.listCartBook);
          } */

    beforeEach(() => {
        //Instancia del test
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(BookService);
        spyOn(service, 'getBooksFromCart').and.callFake(() => listBook);
        fixture.detectChanges(); // activa el componente por el OnInit
    });

    //Test Unitarios
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /*     public getTotalPrice(listCartBook: Book[]): number {
            let totalPrice = 0;
            listCartBook.forEach((book: Book) => {
              totalPrice += book.amount * book.price;
            });
            return totalPrice;
          } */

    it('should get total price of cart', () => {
        const totalPrice = component.getTotalPrice(listBook);
        expect(totalPrice).toBeGreaterThan(0);
        expect(totalPrice).not.toBe(0);
        expect(totalPrice).not.toBeNull();
    });

    /*     public onInputNumberChange(action: string, book: Book): void {
            const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
            book.amount = Number(amount);
            this.listCartBook = this._bookService.updateAmountBook(book);
            this.totalPrice = this.getTotalPrice(this.listCartBook);
          } */
    it('should increment correctly', () => {
        const action = 'plus';
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 10,
            amount: 2
        };

        //        llama al metodo eso es incorrecto
        //        const spyService = spyOn(service,'updateAmountBook'));
        //      no llama esto es correcto
        const spyService = spyOn(service, 'updateAmountBook').and.callFake(() => null);
        // espia al metodo del componente
        const spyComponent = spyOn(component, 'getTotalPrice').and.callFake(() => null);

        expect(book.amount).toBe(2);
        component.onInputNumberChange(action, book);
        expect(book.amount === 3).toBeTrue();

        expect(spyService).toHaveBeenCalled();
        expect(spyComponent).toHaveBeenCalled();
    });

    it('should decrement correctly', () => {
        const action = 'minus';
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 10,
            amount: 2
        };

        //        llama al metodo eso es incorrecto
        //        const spyService = spyOn(service,'updateAmountBook'));
        //      no llama esto es correcto
        const spyService = spyOn(service, 'updateAmountBook').and.callFake(() => null);
        // espia al metodo del componente
        const spyComponent = spyOn(component, 'getTotalPrice').and.callFake(() => null);

        expect(book.amount).toBe(2);
        component.onInputNumberChange(action, book);
        expect(book.amount === 1).toBeTrue();

        expect(spyService).toHaveBeenCalled();
        expect(spyComponent).toHaveBeenCalled();

    });

    /* 
        public onClearBooks(): void {
            if (this.listCartBook && this.listCartBook.length > 0) {
              this._clearListCartBook();
            } else {
               console.log("No books available");
            }
          }
        
          private _clearListCartBook() {
            this.listCartBook = [];
            this._bookService.removeBooksFromCart();
          } */

    //como se prueban los metodos privados se acceden por el metodo publico
    it('should clear list cart book correctly', () => {
        const spyComponent = spyOn((component as any), '_clearListCartBook').and.callThrough();
        const spyService = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);
        component.listCartBook = listBook;
        component.onClearBooks();

        expect(component.listCartBook.length).toBe(0);
        expect(spyComponent).toHaveBeenCalled();
    });

    it('should not clear list cart book becuase the list is empty', () => {
        component.listCartBook = [];
        component.onClearBooks();

        expect(component.message).toBe("No books available");

    });



});