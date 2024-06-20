import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import styles from '../estilos/DebouncedSearchInputStyles';

const DebouncedSearchInput = ({ onSearch, value, onChangeText }) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onSearch(text);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [text, onSearch]);

  useEffect(() => {
    setText(value); // Update local state when value changes from parent
  }, [value]);

  const handleChangeText = (newText) => {
    setText(newText);
    onChangeText(newText); // Pass the updated text to parent component
  };

  return (
    <TextInput
      style={styles.addressInput}
      placeholder="Dirección"
      onChangeText={handleChangeText}
      value={text}
    />
  );
};

export default DebouncedSearchInput;
