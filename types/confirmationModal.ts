export interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}
