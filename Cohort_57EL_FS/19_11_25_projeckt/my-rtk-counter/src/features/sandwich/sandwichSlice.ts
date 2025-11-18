import { createSlice } from '@reduxjs/toolkit';

interface SandwichState {
  sandwichStack: string[]; // Reihenfolge aller Zutaten
}

const initialState: SandwichState = {
  sandwichStack: [],
};

const sandwichSlice = createSlice({
  name: 'sandwich',
  initialState,
  reducers: {
    addBread: (state) => { state.sandwichStack.push("🍞"); },
    addSausage: (state) => { state.sandwichStack.push("🌭"); },
    addCheese: (state) => { state.sandwichStack.push("🧀"); },
    addSalad: (state) => { state.sandwichStack.push("🥬"); },

    removeLast: (state) => { state.sandwichStack.pop(); },

    resetSandwich: (state) => { state.sandwichStack = []; },
  },
});

export const {
  addBread, addSausage, addCheese, addSalad,
  removeLast, resetSandwich,
} = sandwichSlice.actions;

export default sandwichSlice.reducer;



