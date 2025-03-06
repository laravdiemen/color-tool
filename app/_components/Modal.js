"use client";

import { useState, useRef, useEffect } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import * as focusTrap from "focus-trap";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/app/_ui/Button";
import Heading from "@/app/_ui/Heading";
import Wrapper from "@/app/_ui/Wrapper";
import { checkCanFocusTrap } from "@/app/_lib/focus-trap";

export default function Modal({ heading, button, children }) {
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
    <>
      <Button onClick={focusTrapModal.activate}>{button}</Button>

      <dialog
        ref={ref}
        onCancel={focusTrapModal.deactivate}
        className="m-auto w-full max-w-4xl scale-90 bg-transparent p-4 opacity-0 transition-all transition-discrete duration-300 backdrop:pointer-events-none backdrop:bg-slate-950/0 backdrop:transition-all backdrop:transition-discrete backdrop:duration-300 open:scale-100 open:opacity-100 open:backdrop:bg-slate-950/50 dark:open:backdrop:bg-slate-50/50 starting:open:scale-90 starting:open:opacity-0 starting:open:backdrop:bg-slate-950/0"
      >
        <Wrapper>
          <div className="mb-3 flex items-start justify-between gap-2">
            <Heading as="h2">{heading}</Heading>
            <Button onClick={focusTrapModal.deactivate} className="!p-2">
              <XMarkIcon
                className="pointer-events-none size-5"
                aria-hidden="true"
              />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          {children}
        </Wrapper>
      </dialog>
    </>
  );
}
