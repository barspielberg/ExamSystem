import React, { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { Header } from "../Header/Header";
import classes from "./PopupMessage.module.scss";

interface IPopupMessageProps {
  title: string;
  text: string;
  show: boolean;
  clear: () => void;
  action?: () => void;
  actionTag?: string;
  clearTag?: string;
  warning?: boolean;
}

export const PopupMessage: React.FC<IPopupMessageProps> = ({
  title,
  text,
  show,
  clear,
  action,
  actionTag,
  clearTag,
  warning,
}) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (show) setFade(true);
    else setFade(false);
  }, [show]);
  return show ? (
    <div>
      <div className={`${classes.backdrop} ${fade ? classes.dark : ""}`}></div>
      <div className={classes.container}>
        <div className={`${classes.content} ${fade ? classes.in : ""}`}>
          <Header warning={warning}>{title}</Header>
          <div className={classes.body}>
            <p>{text}</p>
            <footer>
              {action && (
                <Button danger onClick={action}>
                  {actionTag || "OK"}
                </Button>
              )}
              <div className={classes.filler} />
              <Button onClick={clear}>{clearTag || "OK"}</Button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
