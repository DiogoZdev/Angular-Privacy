import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-smallest-integer',
  standalone: true,
  templateUrl: './smallest-integer.component.html',
  styleUrl: './smallest-integer.component.scss'
})
export class SmallestIntegerComponent implements OnInit {
    private readonly maxNumber = 1_000_000;

    /**
     * Add whatever tests you want to here
    */
    ngOnInit(): void {
        this.test([1, 6, 3, 4, 2, 1], 5);               // should log 5
        this.test([1, 2, 3, 4, 5], 6);                  // should log 6
        this.test([-1, -6, 4], 1);                      // should log 1

        // extras
        this.test([1, 2, 3, 4, 5, 6], 7);               // should log 7
        this.test([-1, -2, -3, -4, -5, -6, -7], 1);     // should log 8 (all elements are negative)
        this.test([1, 2, 3, 7, 8], 4);                  // should log 4
        this.test([2, 3, 4, 5], 1);                     // should log 1
        this.test([0], 1);                              // should log 1
        this.test([100], 1);                            // should log 1
        this.test([], 1);                               // should log 1 (empty array)
        this.test([1], 2);                              // should log 2
        this.test([1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 6], 7);// should log 7 (all elements are duplicates)
        this.test([1, 2, 2, 3, 3, 5], 4);               // should log 4
        this.test([1, 1000000], 2);                     // should log 2
        this.test([10, 11, 12], 1);                     // should log 1
        this.test([99, 98, 97, 96], 1);                 // should log 1
        this.test([1000, 2000, 3000], 1);               // should log 1 (startig at 1000
    }

    /**
     * Write your code inside this function
     */
    smallestMissingInt(A: number[]): number {
        const set = new Set(A)

        for (let i = 1; i < this.maxNumber ; i++) {
            if (!set.has(i)) {
                return i
            }
        }
        return this.maxNumber + 1
    }

    /**
     * Do not edit this function
     */
    private test(arr: number[], expected: number): void {
        const result = this.smallestMissingInt(arr);

        if (result === expected) {
            console.log(`Success: ${result} is the correct answer`);
        } else {
            console.error(`ERROR: ${result} !== ${expected}`);
        }
    }

}
