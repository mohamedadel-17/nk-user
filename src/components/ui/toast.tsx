'use client';

import { toast as hotToast, ToastOptions } from 'react-hot-toast';
import React from 'react';

type ToastType = 'success' | 'error' | 'loading' | 'info';

interface ServerError {
  statusCode: number;
  message: string;
  error: string;
}

interface ToastProps {
  message: string;
  type?: ToastType;
  options?: ToastOptions;
  serverError?: ServerError;
}

// Custom Error Toast Component
const ErrorToastComponent = ({ serverError, message }: { serverError?: ServerError; message: string }) => {
  if (serverError) {
    return (
      <div className="min-w-80 max-w-md p-4 bg-red-600 text-white rounded-lg shadow-lg border border-red-700">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 rounded-full bg-red-800 flex items-center justify-center">
              <span className="text-xs font-bold">!</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold">{serverError.statusCode}</span>
              <span className="text-sm font-medium text-red-200">{serverError.error}</span>
            </div>
            <div className="text-sm leading-relaxed">{serverError.message}</div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-w-72 max-w-sm p-3 bg-red-600 text-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-red-800 flex items-center justify-center">
          <span className="text-xs font-bold">!</span>
        </div>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
};

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    return hotToast.success(message, {
      duration: 4000,
      position: 'bottom-right',
      ...options,
    });
  },

  error: (message: string, options?: ToastOptions, serverError?: ServerError) => {
    if (serverError) {
      return hotToast.custom(
        <ErrorToastComponent serverError={serverError} message={message} />,
        {
          duration: 6000,
          position: 'bottom-right',
          ...options,
        }
      );
    }
    
    return hotToast.custom(
      <ErrorToastComponent message={message} />,
      {
        duration: 5000,
        position: 'bottom-right',
        ...options,
      }
    );
  },

  loading: (message: string, options?: ToastOptions) => {
    return hotToast.loading(message, {
      duration: 10000,
      position: 'bottom-right',
      ...options,
    });
  },

  info: (message: string, options?: ToastOptions) => {
    return hotToast(message, {
      duration: 4000,
      position: 'bottom-right',
      ...options,
    });
  },

  dismiss: (id?: string) => {
    hotToast.dismiss(id);
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    options?: ToastOptions
  ) => {
    return hotToast.promise(promise, messages, {
      duration: 4000,
      position: 'bottom-right',
      ...options,
    });
  },
};

export default toast;
