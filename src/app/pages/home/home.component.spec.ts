import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { of } from "rxjs";
import { Book } from "src/app/models/book.model";
import { BookService } from "src/app/services/book.service";
import { HomeComponent } from "./home.component";

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
];

const bookServiceMock = {
    getBooks: () => of(listBook)
};

@Pipe({name: 'reduceText'})
class ReduceTextPipeMock implements PipeTransform{
    transform(): string{
        return '';
    }
};



describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [HomeComponent, ReduceTextPipeMock],
            providers: [
                //BookService
                {
                    provide: BookService,
                    useValue: bookServiceMock
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /*     public getBooks(): void {
            this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
              this.listBook = resp;
            });
          }
     */

    it('should get a list of books from subscription', () => {
        const service = fixture.debugElement.injector.get(BookService);
//        const spyService = spyOn(service, 'getBooks').and.returnValue(of(listBook));

        component.getBooks();

        expect(component.listBook.length).toBe(3);


    });

});