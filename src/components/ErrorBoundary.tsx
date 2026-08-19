"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMsg: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMsg: ""
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMsg: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center border rounded-xl bg-red-900/20 border-red-500/50 backdrop-blur-sm z-50">
          <h2 className="text-lg font-semibold text-red-400">3D Component Crashed</h2>
          <p className="mt-2 text-sm font-mono text-red-200/80">{this.state.errorMsg}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
