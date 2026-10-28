import { Button } from "@heroui/react";

function ConfirmDelete({ isOpen, isPending, onConfirm, onCancel, title }: {
  isOpen: boolean;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl shadow-rose-200/50 p-8 w-full max-w-sm mx-4 fade-up">
        <h2 className="text-2xl text-center mb-2 text-ink">{title}</h2>
        <p className="text-center text-gray-500 mb-6">This action can't be undone.</p>
        <div className="flex flex-row gap-3">
          <Button
            className="flex-1 bg-main-color text-white shadow-md shadow-rose-300/40 transition-transform duration-200 hover:scale-105"
            isPending={isPending}
            onPress={onConfirm}
          >
            Delete
          </Button>
          <Button
            className="flex-1 bg-[#B8AEB0] text-white shadow-md shadow-stone-300/40 transition-transform duration-200 hover:scale-105"
            onPress={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;