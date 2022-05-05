import { ref } from 'vue'

export default function () {
  const expresion = ref('')             // Expresión que representa toda la operación
  let finOperation = false              // Diferenciar entre número y operación después de pulsar '='

  // Borrar expresión
  const reset = () => {
    expresion.value = ''
  }
  // Eliminar último carácter de la expresión - Retroceso
  const back = () => {
    expresion.value = expresion.value.slice(0, -1)
  }
  // Añadir una cifra a la expresión
  const addNumber = (value) => {
    if(finOperation) {
      expresion.value = value.toString()
    } else {
      expresion.value += value.toString()
    }
    finOperation = false
  }
  // Añadir un operador a la expresión
  const addOperator = (value) => {
    finOperation = false
    
    const lengthExpr = expresion.value.length
    if (!lengthExpr) {
      return
    }
    const last = expresion.value[lengthExpr - 1]
    if (isNaN(last)) {
      expresion.value = expresion.value.slice(0, -1) + value
    } else {
      expresion.value += value
    }
  }

  // Se ha pulsado '='.  Realizar cálculo. 
  const calculateWithPriorities = () => {
    finOperation = true

    let lengthExpr = expresion.value.length
    
    if (!lengthExpr) {
      return
    }

    const last = expresion.value[lengthExpr - 1]

    // Eliminar último elemento si es un operador
    const ops = ['+', '-', '*', '/']

    if (ops.includes(last)) {
      expresion.value = expresion.value.slice(0, -1)
      lengthExpr -= 1
    }

    // Crear arrays de números y operadores
    let aux = '';
    const numbers = [];
    const operators = [];

    [...expresion.value].forEach(item => {
      if (ops.includes(item)) {
        numbers.push(aux)
        operators.push(item)
        aux = ''
      } else {
        aux += item
      }
    })
    numbers.push(aux)

    // Realizar cállculo respetando prioridades
    const lowPriority = {
      '+': (a, b) => +a + +b,
      '-': (a, b) => +a - +b,
    }
    const highPriority = {
      '*': (a, b) => +a * +b,
      // '/': (a, b) => Math.floor(+a / +b),
      '/': (a, b) => +a / +b,
    }

    // Mantener los datos de menor prioridad
    let auxNumbers = []
    let auxOperators = []

    // Primero se realizan las operaciones de mayor prioridad
    operators.forEach(element => {
      if (element in highPriority) {
        numbers.unshift(highPriority[element](...numbers.splice(0, 2)))
      } else {
        auxNumbers.push(+numbers.shift())
        auxOperators.push(element)
      }
    });
    auxNumbers.push(numbers.shift())

    // Operaciones de menor prioridad
    auxOperators.forEach(element => {
      auxNumbers.unshift(lowPriority[element](...auxNumbers.splice(0, 2)))
    });

    // Formatear resultado
    // expresion.value = new Intl.NumberFormat('de-DE', {}).format(auxNumbers[0])
    expresion.value = auxNumbers[0].toString()
  }

  return {
    expresion,
    calculateWithPriorities,
    addOperator, addNumber, reset, back
  }
}