import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  ToggleSidebar,
  OpenSidebar,
  CloseSidebar
} from './../actions/layout.action';

export class LayoutStateModel {
  sidenavOpen: boolean;
}

@State<LayoutStateModel>({ name: 'layout', defaults: { sidenavOpen: true } })
export class LayoutState {
  @Selector() static getSidenavState(state: LayoutStateModel) {
    return state.sidenavOpen;
  }

  @Action(ToggleSidebar)
  toggle(context: StateContext<LayoutStateModel>) {
    const state = context.getState();
    context.patchState({ sidenavOpen: !state.sidenavOpen });
  }
  @Action(OpenSidebar)
  openSidebar(context: StateContext<LayoutStateModel>) {
    context.patchState({ sidenavOpen: true });
  }
  @Action(CloseSidebar)
  closeSidebar(context: StateContext<LayoutStateModel>) {
    context.patchState({ sidenavOpen: false });
  }
}
