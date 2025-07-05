'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Dialog({ children, ...props }: DialogPrimitive.DialogProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogContent({
  children,
  className,
  ...props
}: DialogPrimitive.DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-white dark:bg-neutral-900 p-6 shadow-lg',
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <X className="h-5 w-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
export const DialogClose = DialogPrimitive.Close;
