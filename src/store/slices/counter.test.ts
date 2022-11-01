import { counter, ICounterSlice } from './counter';

describe('counter', () => {
  describe('reducers', () => {
    const initialState: ICounterSlice = { value: 15 };

    it('should increment the value', () => {
      const { increment } = counter.actions;
      const expected = 18;

      let state = counter.reducer(initialState, increment());
      state = counter.reducer(state, increment());
      state = counter.reducer(state, increment());

      expect(state.value).toBe(expected);
    });

    it('should decrement the value', () => {
      const { decrement } = counter.actions;
      const expected = 12;

      let state = counter.reducer(initialState, decrement());
      state = counter.reducer(state, decrement());
      state = counter.reducer(state, decrement());

      expect(state.value).toBe(expected);
    });

    it('should increment the value by a supplied amount', () => {
      const { incrementByAmount } = counter.actions;
      const expected = 17;

      let state = counter.reducer(initialState, incrementByAmount(2));

      expect(state.value).toBe(expected);
    });
  });
});
