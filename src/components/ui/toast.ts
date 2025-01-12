type ToastType = 'success' | 'error' | 'info' | 'warning';

class Toast {
  private show(message: string, type: ToastType) {
    // Simple alert for now - can be replaced with a proper toast component
    alert(`${type.toUpperCase()}: ${message}`);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }
}

export const toast = new Toast();