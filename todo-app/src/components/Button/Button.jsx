import "./Button.module.css";
import React from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

export default function Button({
  onClick,
  className,
  children,
  type = "button",
}) {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.button, className)}
      type={type}
    >
      {children}
    </button>
  );
}
