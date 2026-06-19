import { useEffect } from 'react';
import { Keyboard, KeyboardEventListener, Platform } from 'react-native';

export const KEYBOARD_SHOW_EVENT =
  Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
export const KEYBOARD_HIDE_EVENT =
  Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

export function useKeyboardListener(
  onShow: KeyboardEventListener | null,
  onHide: KeyboardEventListener | null,
) {
  useEffect(() => {
    if (onShow) {
      const showListner = Keyboard.addListener(KEYBOARD_SHOW_EVENT, onShow);

      return () => {
        showListner.remove();
      };
    }
  }, [onShow]);

  useEffect(() => {
    if (onHide) {
      const hideListner = Keyboard.addListener(KEYBOARD_HIDE_EVENT, onHide);

      return () => {
        hideListner.remove();
      };
    }
  }, [onHide]);
}
