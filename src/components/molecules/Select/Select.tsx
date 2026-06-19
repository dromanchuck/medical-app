import React, {
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
  memo,
} from 'react';

import {
  Keyboard,
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  View,
  TouchableOpacity,
} from 'react-native';

import styled from 'styled-components';
import { BaseButton, TextInput } from 'react-native-gesture-handler';
import { Portal } from 'react-native-paper';

import { BlurView, Icon, Input, Label } from 'atoms';
import { ISelectItem, ISelectWithChildrenItem } from 'types';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'services';

import { SelectList } from './SelectList';
import { SelectSectionList } from './SelectSectionList';

interface IProps {
  label: string;
  value: string;
  placeholder: string;
  items: ISelectItem[] | ISelectWithChildrenItem[];
  disabled?: boolean;
  isOptional?: boolean;
  error?: string;
  onFocus?: () => void;
  fetchOnChangeText?: (text: string) => void;
  onChange: (item: ISelectItem | null) => void;
}

export const Select = memo(
  ({
    label,
    value,
    placeholder,
    isOptional,
    items,
    error,
    disabled = false,
    onFocus,
    fetchOnChangeText,
    onChange,
  }: IProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef: Ref<TextInput> = useRef(null);
    const [searchText, setSearchText] = useState('');

    const hasChildren = (items as ISelectWithChildrenItem[]).every(
      (item: ISelectWithChildrenItem) => item.children,
    );

    useEffect(() => {
      if (fetchOnChangeText && isFocused) {
        fetchOnChangeText(searchText);
      }
    }, [searchText, isFocused]);

    const onSubmitEditing = useCallback(() => {
      setIsFocused(false);
      setSearchText('');
    }, [setIsFocused, setSearchText]);

    const handleOnFocus = useCallback(() => {
      if (!disabled) {
        onFocus?.();
        setIsFocused(true);
      }
    }, [setIsFocused, disabled, onFocus]);

    const onChangeText = useCallback(
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setSearchText(event.nativeEvent.text);
      },
      [setSearchText],
    );

    const handleOnChange = useCallback(
      (item: ISelectItem) => {
        onSubmitEditing();

        if (item.label === 'Не выбрано') {
          onChange(null);
        } else {
          onChange(item);
        }
      },
      [onSubmitEditing],
    );

    const clearText = useCallback(() => {
      setSearchText('');
    }, [setSearchText]);

    useEffect(() => {
      if (isFocused) {
        setTimeout(() => inputRef?.current?.focus?.(), 0);
      }
    }, [isFocused, inputRef]);

    return (
      <>
        {isFocused ? (
          <Portal>
            <Scroll style={{ elevation: 1000 }}>
              <Blur
                onPress={() => {
                  setIsFocused(false);
                  Keyboard.dismiss();

                  return true;
                }}
              />
              <Container>
                <Label>
                  <Input
                    ref={inputRef}
                    value={searchText}
                    onSubmitEditing={onSubmitEditing}
                    placeholder={value || placeholder}
                    onChange={onChangeText}
                  />
                </Label>
                <Clear onPress={clearText} activeOpacity={0.8}>
                  <Icon name={'clear'} />
                </Clear>
              </Container>
              <Wrapper>
                {hasChildren ? (
                  <SelectSectionList
                    items={items as ISelectWithChildrenItem[]}
                    searchText={searchText}
                    onChange={handleOnChange}
                    selectedValue={value}
                  />
                ) : (
                  <SelectList
                    items={items}
                    searchText={searchText}
                    onChange={handleOnChange}
                    selectedValue={value}
                  />
                )}
              </Wrapper>
            </Scroll>
          </Portal>
        ) : (
          <Label text={label} isOptional={isOptional}>
            <Btn onPress={handleOnFocus}>
              <SelectPlaceholder error={error} disabled={disabled}>
                <PlaceHolder disabled={disabled}>
                  {value || placeholder}
                </PlaceHolder>
                <IconWrapper>
                  <Icon
                    name={disabled ? 'selectArrowDisabled' : 'selectArrow'}
                  />
                </IconWrapper>
              </SelectPlaceholder>
            </Btn>
          </Label>
        )}
      </>
    );
  },
);

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 100px;
  padding-left: 12px;
  padding-right: 12px;
`;

const Wrapper = styled(View)`
  padding-left: 12px;
  padding-right: 12px;
`;

const SelectPlaceholder = styled(View)<{ error?: string; disabled?: boolean }>`
  border-radius: 6px;
  padding-right: 44px;
  padding-left: 12px;
  border: 1px solid ${({ error }) => (error ? '#FF8686' : '#dbe3f1')};
  height: 48px;
  width: 100%;
  background: ${({ disabled }) => (disabled ? '#F7F7F7' : '#f7fafe')};
  flex-direction: row;
  align-items: center;
`;

const Btn = styled(BaseButton)`
  margin-bottom: 12px;
`;

const PlaceHolder = styled(Text)<{ disabled: boolean }>`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  font-family: 'Open Sans';
  color: ${({ disabled }) => (disabled ? '#95989D' : '#262B37')};
`;

const IconWrapper = styled(View)`
  position: absolute;
  right: 0;
  width: 44px;
  align-items: center;
`;

const Clear = styled(TouchableOpacity)`
  position: absolute;
  bottom: 28px;
  right: 12px;
  width: 44px;
  align-items: center;
`;

const Scroll = styled(View)`
  width: 100%;
  z-index: 1000;
`;

const Blur = styled(BlurView)`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
`;
