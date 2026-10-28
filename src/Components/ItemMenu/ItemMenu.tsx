import { useEffect, useRef, useState } from "react";

function ItemMenu({
  onEdit,
  onDelete,
}: {
  onEdit?: () => void;
  onDelete: () => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      if (!isOpen) return;

      function handleClickOutside(event: MouseEvent) {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return function () {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    [isOpen],
  );

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={(_) => setIsOpen(!isOpen)}
        className="text-2xl leading-none px-2 text-gray-500 rounded-full transition-colors hover:bg-comment-bg cursor-pointer"
      >
        ⋮
      </button>
      {isOpen && (
        <ul className="absolute right-0 top-full z-30 w-32 bg-white border border-rose-100 rounded-xl shadow-lg shadow-rose-200/50 p-1 text-sm">
          {onEdit && (
            <li
              onClick={(_) => {
                setIsOpen(false);
                onEdit();
              }}
              className="p-2 cursor-pointer rounded hover:bg-comment-bg transition-colors"
            >
              Edit
            </li>
          )}
          <li
            onClick={(_) => {
              setIsOpen(false);
              onDelete();
            }}
            className="p-2 cursor-pointer rounded hover:bg-comment-bg transition-colors"
          >
            Delete
          </li>
        </ul>
      )}
    </div>
  );
}

export default ItemMenu;
