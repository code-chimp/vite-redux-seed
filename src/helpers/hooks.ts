/* istanbul ignore file */
/*
 * There is no logic to test in this file as it is simply an implementation of
 * the pattern described in: https://redux.js.org/tutorial/typescript-quick-start
 * and is merely here to help TypeScript suss out typing around redux actions
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IStore } from '../store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IStore> = useSelector;
