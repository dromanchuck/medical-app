import { useState, useCallback } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export const useTextInput = (): [
  string,
  (event: NativeSyntheticEvent<TextInputChangeEventData>) => void,
  () => void,
] => {
  const [text, setText] = useState('');

  const onChange = useCallback(
    event => {
      setText(event.nativeEvent.text);
    },
    [setText],
  );

  const clearText = useCallback(() => {
    setText('');
  }, [setText]);

  return [text, onChange, clearText];
};
