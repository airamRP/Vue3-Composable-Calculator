<template>
  <div class="container">
    <input type="text" class="number-input" v-model="expresion" readonly />
    <div class="button" v-for="i in 10" :key="i" :class="`number${i - 1}`" @click="addNumber(i - 1)">{{ i - 1 }}</div>
    <div class="button add" @click="addOperator('+')">+</div>
    <div class="button minus" @click="addOperator('-')">-</div>
    <div class="button multitply" @click="addOperator('*')">x</div>
    <div class="button division" @click="addOperator('/')">÷</div>
    <div class="button reset" @click="reset">&#x21ba;</div>
    <div class="button del" @click="back">&#x2b05;</div>
    <div class="button equal" @click="calculateWithPriorities">=</div>

  </div>
</template>

<script>
import useCalculator from "@/composables/useCalculator"
export default {
  setup() {
    const {
      expresion,
      calculateWithPriorities, addOperator, addNumber, reset, back } = useCalculator()
    return {
      expresion,
      calculateWithPriorities, addOperator, addNumber, reset, back
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding-top: 2rem;
  color: #fff;
  font-size: 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, 50px);
  grid-auto-rows: 50px;
  gap: .5rem;
  justify-content: center;
}

.number-input {
  grid-column: 1 / -1;
  border: none;
  margin-bottom: 1rem;
  text-align: end;
  font-size: 1.5rem;
  padding: .2rem;
  color: #fff;
}

.button {
  padding: .5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, .12);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all ease .5s;

  &:active {
    background-color: rgba(100, 100, 100, .5);
    transition: all ease .5s;
  }
}
.number9 {
  grid-column: 3;
  grid-row: 2;
}
.number8 {
  grid-column: 2;
  grid-row: 2;
}
.number7 {
  grid-column: 1;
  grid-row: 2;
}
.number6 {
  grid-column: 3;
  grid-row: 3;
}
.number5 {
  grid-column: 2;
  grid-row: 3;
}
.number4 {
  grid-column: 1;
  grid-row: 3;
}
.number3 {
  grid-column: 3;
  grid-row: 4;
}
.number2 {
  grid-column: 2;
  grid-row: 4;
}
.number1 {
  grid-column: 1;
  grid-row: 4;
}
.number0 {
  grid-column: 3;
  grid-row: 5;
}
.division {
  grid-column: 4;
  grid-row: 5;
}
.equal {
  grid-column: 4;
  color: rgb(45, 247, 45);
}
.reset {
  color: rgb(247, 217, 45);
}
</style>
