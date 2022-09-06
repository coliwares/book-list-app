import { ComponentFixture, TestBed } from "@angular/core/testing"
import { async } from "rxjs/internal/scheduler/async"
import { BookService } from "src/app/services/book.service";
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";


describe('CartComponent', () => {

    let fixture: ComponentFixture<CartComponent>;
    let component: CartComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations:[CartComponent],
            imports:[HttpClientTestingModule],
            providers:[BookService],
            schemas:[]
        }).compileComponents();
    });

    beforeEach(() =>{
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

})