"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="py-32 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <p className="text-white/30 text-sm tracking-widest uppercase">
                This section is unavailable
              </p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
