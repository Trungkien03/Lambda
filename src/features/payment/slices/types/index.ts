type paymentViewState = {
  isDialogOpen: boolean;
  isLoadingAddTransaction: boolean;
};

const initialPaymentViewState: paymentViewState = {
  isDialogOpen: false,
  isLoadingAddTransaction: false,
};

export { initialPaymentViewState };
export type { paymentViewState };
