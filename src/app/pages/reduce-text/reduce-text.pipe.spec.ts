import { ReduceTextPipe } from "./reduce-text.pipe";

describe('ReduceTextPipe', () => {

    let pipe: ReduceTextPipe;

    beforeEach(() => {
        pipe = new ReduceTextPipe();
    });

    it('should create', () => {
        expect(pipe).toBeTruthy();
    });

/*     transform(value: string, ...args: number[]): string {
        return value.substring(0, args[0]);
      } */

      it('should reduce text to limit of characters', () => {
        const text = "This is a test for pipe ReduceText";
        const newText = pipe.transform(text, 5);
        expect(newText.length).toBe(5);
      });

});