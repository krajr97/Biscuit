import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calc',
  imports: [FormsModule],
  templateUrl: './calc.component.html',
  styleUrl: './calc.component.scss',
})
export class CalcComponent {
  currentInput: string = ''; // holds the current input in the display
  private operation: string = '';
  private firstOperand: number = 0;
  // Append number or operator to current input
  appendToInput(value: string): void {
    this.currentInput += value;
  }
  // Perform basic arithmetic operations
  performOperation(operator: string): void {
    if (this.currentInput === '') return;

    this.firstOperand = parseFloat(this.currentInput);
    this.currentInput = ''; // Clear the input for the next number
    this.operation = operator; // Save the operation (e.g., '+', '-', '*', '/')
  }
  // Clear the current input
  clearInput(): void {
    this.currentInput = '';
    this.firstOperand = 0;
    this.operation = '';
  }
  // Calculate the result based on the current operation
  calculateResult(): void {
    if (this.operation && this.currentInput !== '') {
      const secondOperand = parseFloat(this.currentInput);
      switch (this.operation) {
        case '+':
          this.currentInput = (this.firstOperand + secondOperand).toString();
          break;
        case '-':
          this.currentInput = (this.firstOperand - secondOperand).toString();
          break;
        case '*':
          this.currentInput = (this.firstOperand * secondOperand).toString();
          break;
        case '/':
          if (secondOperand === 0) {
            this.currentInput = 'Error'; // Handle division by zero
          } else {
            this.currentInput = (this.firstOperand / secondOperand).toString();
          }
          break;
        default:
          break;
      }
      this.operation = ''; // Reset operation after calculation
    }
  }
}
