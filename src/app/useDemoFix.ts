import type { DemoFix } from '../models/lecturer';
import { useAppSelector } from './store';

export const useDemoFix = (fix: DemoFix): boolean => useAppSelector((state) => state.lecturer.fixes[fix]);
