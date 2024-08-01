type DashboardSettingsNavType = {
  onCancel?: () => void;
  shouldProceed?: boolean;
  onCancel?: () => void;
  btnDisabled?: boolean;
  step?: string;
  title: string;
  onProceedBtn?: () => void;
  showBtn?: boolean;
  loading?: boolean;
};

interface DashboardSettingsLayoutType extends DashboardSettingsNavType {
  className?: string;
  children: React.ReactNode;
}

type EmptyStateType = {
  onBtnClick?: () => void;
  viewText?: string;
  loading?: boolean;
  href: string;
  textTitle: string;
  btnTitle: string;
  create?: boolean;
  icon?: React.ReactHTMLElement;
  onBulkUpload?: () => void;
  isNotBulkUpload?: boolean;
};

type FormLayoutType = {
  form: React.ReactNode;
  module: string;
  addText: string;
};

interface DialogContextType {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

interface ModalType {
  modalTitle?: string;
  onProceed: () => void;
}

interface DashboardModalType {
  onOpenChange?: () => void;
  open?: boolean;
  children: React.ReactNode;
  className?: string;
}
