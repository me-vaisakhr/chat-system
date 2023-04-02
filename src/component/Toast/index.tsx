import React, { FC, PropsWithChildren } from "react";
import { MdClose } from "react-icons/md";
import "./index.scss";

interface ToastProps {
  open: boolean;
  showCloseButton?: boolean;
  onClose?: Function;
}

const Toast: FC<PropsWithChildren<ToastProps>> = ({
  open,
  children,
  showCloseButton,
  onClose,
}) => {
  return (
    <article className={`toast__container ${open && "toast__open"}`}>
      {open && <div>{children}</div>}
      {showCloseButton && (
        <button className="toast__close_wrapper" onClick={() => onClose?.()}>
          <MdClose size={24} />
        </button>
      )}
    </article>
  );
};

export default Toast;
