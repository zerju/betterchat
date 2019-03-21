import { LogoutUserAction } from './../actions/auth.action';
import { getActionTypeFromInstance } from '@ngxs/store';

export function logoutPlugin(state, action, next) {
  // Use the get action type helper to determine the type
  if (getActionTypeFromInstance(action) === LogoutUserAction.type) {
    // if we are a logout type, lets erase all the state
    state = {};
  }

  // return the next function with the empty state
  return next(state, action);
}
