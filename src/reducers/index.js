import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';
import chores from './ChoresReducer';
import groupReducer from './GroupReducer';
import CalendarReducer from './CalendarReducer';

export default combineReducers({
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer,
  chores: chores,
  groupReducer: groupReducer,
  CalendarReducer
});
