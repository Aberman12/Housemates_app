import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import EmployeeFormReducer from "./EmployeeFormReducer";
import EmployeeReducer from "./EmployeeReducer";
// import choreList from "./ChoreListReducer";
import groupReducer from "./GroupReducer";

export default combineReducers({
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer,
  // choreList: choreList,
  groupReducer: groupReducer
});
