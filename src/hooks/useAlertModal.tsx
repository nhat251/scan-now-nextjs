import { useCallback, useMemo, useState } from "react";

import { AlertModal, type AlertModalProps } from "@/components/molecules/alert-modal";

type Props = AlertModalProps & {};

export const useAlertModal = () => {
  const [open, setOpen] = useState(false);
  const [props, setProps] = useState<Partial<Props>>({});

  const handleClose = useCallback(() => {
    setOpen(false);
    props.onClose?.();
  }, [props]);

  const handlePositive = useCallback(() => {
    setOpen(false);
    props.onPositive?.();
  }, [props]);

  const showAlertModal = useCallback((nextProps: Partial<Props>) => {
    setProps(nextProps);
    setOpen(true);
  }, []);

  const Modal = useMemo(() => {
    return function AlertModalRenderer() {
      return (
        <AlertModal {...props} open={open} onClose={handleClose} onPositive={handlePositive} />
      );
    };
  }, [open, props, handleClose, handlePositive]);

  return {
    showAlertModal,
    AlertModal: Modal,
  };
};
