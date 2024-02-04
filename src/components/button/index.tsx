import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  onClick: () => void;
  text: string;
  color: string;
  backgroundColor: string;
}
export const Button = ({
  onClick,
  text,
  color,
  backgroundColor,
}: ButtonProps) => (
  <button
    className={styles.button}
    onClick={onClick}
    style={{ backgroundColor, color }}
  >
    {text}
  </button>
);
