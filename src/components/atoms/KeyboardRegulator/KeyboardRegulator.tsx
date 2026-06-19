import React, { memo, useState, useCallback, ReactNode } from 'react';
import { View } from 'react-native';

interface IProps {
  children: ReactNode;
}

export const KeyboardRegulator = memo(({ children }: IProps) => {
  const [style, setStyle] = useState({ flex: 1 });

  const setAppHeight = useCallback(({ nativeEvent }) => {
    const {
      layout: { height },
    } = nativeEvent;
    setStyle({ height });
  }, []);

  return (
    <View onLayout={setAppHeight} style={style}>
      {children}
    </View>
  );
});
