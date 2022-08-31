import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BookService } from "./book.service";

describe('Bookservice', () => {

    let service: BookService;
    let httpMock: HttpTestingController;

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[BookService],
            schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
        });
    });

    beforeEach( () => {
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    })
    
    fit('should create service', () => {
        expect(service).toBeTruthy();
    });

});