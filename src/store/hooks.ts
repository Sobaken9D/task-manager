import {useDispatch, useSelector} from 'react-redux';
import type {AppState, AppDispatch} from "@/store/store.ts";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();