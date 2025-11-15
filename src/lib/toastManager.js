import hotToast from "react-hot-toast";

let currentToastId = null;
let clearTimer = null;

function clearCurrent() {
  currentToastId = null;
  if (clearTimer) {
    clearTimeout(clearTimer);
    clearTimer = null;
  }
}

function show(kind, message, options = {}) {
  // If a toast is currently active, don't show another one
  if (currentToastId) return currentToastId;

  const duration = options.duration ?? 4000;
  let id;

  if (kind === "default") {
    id = hotToast(message, options);
  } else if (typeof hotToast[kind] === "function") {
    id = hotToast[kind](message, options);
  } else {
    id = hotToast(message, options);
  }

  currentToastId = id;
  if (clearTimer) clearTimeout(clearTimer);

  clearTimer = setTimeout(() => {
    clearCurrent();
  }, duration);

  return id;
}

const toast = {
  success: (msg, opts) => show("success", msg, opts),
  error: (msg, opts) => show("error", msg, opts),
  info: (msg, opts) => show("info", msg, opts),
  loading: (msg, opts) => show("loading", msg, opts),
  // generic show
  default: (msg, opts) => show("default", msg, opts),
  // expose a raw show for compatibility
  show: (msg, opts) => show("default", msg, opts),
  // dismiss a specific toast (and clear our state if it was current)
  dismiss: (id) => {
    if (id && id === currentToastId) clearCurrent();
    return hotToast.dismiss(id);
  },
  // expose the underlying hot-toast instance if needed
  _raw: hotToast,
};

export default toast;
export { toast };
