import {create} from 'zustand';
import {createSelectors} from './createSelectors';
export type Screen = 'camera' | 'survey' | 'welcome' | 'submission';

interface AppState {
  activeScreen: Screen;
}

const appStore = create<AppState>(() => ({
  activeScreen: 'welcome',
}));

export const useAppStore = createSelectors(appStore);

export const setActiveScreen = (screen: Screen) => {
  useAppStore.setState({activeScreen: screen});
};
