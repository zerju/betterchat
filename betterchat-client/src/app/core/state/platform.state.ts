import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetPlatformAction } from '../actions/platfrom.action';

declare const navigator: any;

export interface PlatformStateModel {
  mobile?: boolean;
  desktop?: boolean;
  android?: boolean;
  ios?: boolean;
  windows?: boolean;
  linux?: boolean;
  macOs?: boolean;
}

@State<PlatformStateModel>({ name: 'platformState', defaults: {} })
export class PlatformState {
  @Selector() static isMobile(state: PlatformStateModel) {
    return state.mobile;
  }
  @Selector() static isDesktop(state: PlatformStateModel) {
    return state.desktop;
  }
  @Selector() static isAndroid(state: PlatformStateModel) {
    return state.android;
  }
  @Selector() static isIos(state: PlatformStateModel) {
    return state.ios;
  }
  @Selector() static isWindows(state: PlatformStateModel) {
    return state.windows;
  }
  @Selector() static isLinux(state: PlatformStateModel) {
    return state.linux;
  }
  @Selector() static isMacOs(state: PlatformStateModel) {
    return state.macOs;
  }

  @Action(GetPlatformAction)
  getPlatform(
    ctx: StateContext<PlatformStateModel>,
    action: GetPlatformAction
  ) {
    const state = ctx.getState();
    const platform: PlatformStateModel = {};
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) {
      platform.mobile = true;
      platform.android = true;
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      platform.mobile = true;
      platform.ios = true;
    } else if (/Linux/.test(userAgent)) {
      platform.desktop = true;
      platform.linux = true;
    } else if (/Win/.test(userAgent)) {
      platform.desktop = true;
      platform.windows = true;
    } else if (/Mac/.test(userAgent)) {
      platform.desktop = true;
      platform.macOs = true;
    }
    ctx.setState(platform);
  }
}
