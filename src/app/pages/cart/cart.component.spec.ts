import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { BookService } from "src/app/services/book.service";
import { CartComponent } from "./cart.component"
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Book } from "src/app/models/book.model";



describe('CartComponent', () => {
    //Arrange
    let component: CartComponent; // componente a testear
    let fixture: ComponentFixture<CartComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [CartComponent],
            providers: [BookService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get total price of cart', () => {
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

        const totalPrice = component.getTotalPrice(listBook);

        expect(totalPrice).toBe(95);
        expect(totalPrice).not.toBeNull;
        expect(totalPrice).toBeGreaterThan(0);

    });


/*     public onInputNumberChange(action: string, book: Book): void {
        const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
        book.amount = Number(amount);
        this.listCartBook = this._bookService.updateAmountBook(book);
        this.totalPrice = this.getTotalPrice(this.listCartBook);
      } */

      it('should Increment corectly', () => {
        const action = 'plus';
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 10,
            amount: 2
        };
        const service = fixture.debugElement.injector.get(BookService);
        const spyService = spyOn(service, 'updateAmountBook').and.callFake(() => null);
        const spyComponent = spyOn(component, 'getTotalPrice').and.callFake(()=> null);

        component.onInputNumberChange(action,book);
        expect(book.amount).toBe(3);

      })

      it('should decrement corectly', () => {
        const action = 'minus';
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 10,
            amount: 2
        };
        const service = fixture.debugElement.injector.get(BookService);
        const spyService = spyOn(service, 'updateAmountBook').and.callFake(() => null);
        const spyComponent = spyOn(component, 'getTotalPrice').and.callFake(()=> null);

        component.onInputNumberChange(action,book);
        expect(book.amount).toBe(1);

      })

})