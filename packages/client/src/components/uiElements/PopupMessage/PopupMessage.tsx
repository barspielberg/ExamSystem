import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Header from "../Header/Header";
import classes from "./PopupMessage.module.scss";

interface IPopupMessageProps {
  title: string;
  text: string;
  show: boolean;
  clear: () => void;
}

const PopupMessage: React.FC<IPopupMessageProps> = ({
  title,
  text,
  show,
  clear,
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
          <Header>{title}</Header>
          <div className={classes.body}>
            <p>{text}</p>
            <footer>
              <Button onClick={clear}>OK</Button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PopupMessage;
