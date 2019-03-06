import { PlatformState } from './platform.state';
import { AuthStateModel } from './auth.state';
import { LayoutStateModel } from './layout.state';

export interface AppState {
  auth: AuthStateModel;
  platformState: PlatformState;
  layoutState: LayoutStateModel;
}
