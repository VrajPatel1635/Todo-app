"use client";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function ConfirmDialog({
  open,
  onClose,
  title = "Delete task",
  message = "Are you sure you want to delete this task? This action cannot be undone.",
  onConfirm
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p>
      <div className="flex items-center justify-end gap-2 mt-6">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={() => { onConfirm(); onClose(); }}>Delete</Button>
      </div>
    </Modal>
  );
}