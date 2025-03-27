"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import * as focusTrap from "focus-trap";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/app/_ui/Button";
import Heading from "@/app/_ui/Heading";
import { checkCanFocusTrap } from "@/app/_lib/focus-trap";

const ModalContext = createContext();

export default function Modal({ children }) {
  const ref = useRef();
  const [focusTrapModal, setFocusTrapModal] = useState({});

  useEffect(() => {
    const modal = ref.current;
    if (!modal) return;

    const createFocusTrapModal = focusTrap.createFocusTrap(modal, {
      clickOutsideDeactivates: true,
      checkCanFocusTrap,
      onActivate: () => {
        modal.showModal();
        disableBodyScroll(modal);
      },
      onDeactivate: () => {
        modal.close();
        enableBodyScroll(modal);
      },
    });

    setFocusTrapModal(createFocusTrapModal);
  }, [ref]);

  return (
    <ModalContext.Provider value={{ ref, focusTrapModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function ModalButton({ children }) {
  const { focusTrapModal } = useContext(ModalContext);

  return <button onClick={focusTrapModal.activate}>{children}</button>;
}

function ModalStyledButton({ children }) {
  const { focusTrapModal } = useContext(ModalContext);

  return <Button onClick={focusTrapModal.activate}>{children}</Button>;
}

function ModalDialog({ title, children }) {
  const { ref, focusTrapModal } = useContext(ModalContext);

  return (
    <dialog
      ref={ref}
      onCancel={focusTrapModal.deactivate}
      className="m-auto max-h-[calc(100%-4rem)] w-[calc(100%-2rem)] max-w-4xl scale-90 rounded-lg bg-slate-200 p-4 text-slate-950 opacity-0 transition-all transition-discrete duration-300 backdrop:pointer-events-none backdrop:bg-slate-950/0 backdrop:transition-all backdrop:transition-discrete backdrop:duration-300 *:first:mt-0 *:last:mb-0 open:scale-100 open:opacity-100 open:backdrop:bg-slate-950/50 md:max-h-[calc(100%-10rem)] md:rounded-2xl md:p-6 dark:bg-slate-900 dark:text-slate-50 dark:open:backdrop:bg-slate-50/50 starting:open:scale-90 starting:open:opacity-0 starting:open:backdrop:bg-slate-950/0"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <Heading as="h2">{title}</Heading>
        <Button onClick={focusTrapModal.deactivate} className="!p-2">
          <XMarkIcon
            className="pointer-events-none size-5"
            aria-hidden="true"
          />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      {children}
    </dialog>
  );
}

Modal.ModalStyledButton = ModalStyledButton;
Modal.ModalButton = ModalButton;
Modal.ModalDialog = ModalDialog;
