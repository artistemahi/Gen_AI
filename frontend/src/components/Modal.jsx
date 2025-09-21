
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurry dark background */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      ></div>

      {/* Card */}
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md z-10">
        {/* Close button (optional) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
