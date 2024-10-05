"use client";

import React from 'react';
import styles from './split.module.scss';

const WordSplit = ({ value = '' }) => {
  // Ensure value is a string before calling split
  const words = typeof value === 'string' ? value.split(' ') : [];

  return (
    <p className={styles.paragraphOne}>
      {words.map((word, i) => (
        <Word key={i}>{word}</Word>
      ))}
    </p>
  );
};

const Word = ({ children }) => {
  return (
    <span className={styles.wordOne}>
      {children.split('').map((letter, index) => (
        <span key={index} className={styles.letter}>
          {letter}
        </span>
      ))}
    </span>
  );
};

export default WordSplit;