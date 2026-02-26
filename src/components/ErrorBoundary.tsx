import { Component, type ErrorInfo, type ReactNode } from "react";
import { FiAlertCircle, FiHome } from "react-icons/fi";
import { Button, ButtonLink } from "./ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8">
          <FiAlertCircle
            className="text-red-500 dark:text-red-400"
            size={48}
            aria-hidden
          />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Something went wrong
          </h2>
          <p className="max-w-md text-center text-sm text-slate-500 dark:text-slate-400">
            {this.state.error.message ||
              "We encountered an unexpected error. Please try again or return home."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={this.handleRetry}
              aria-label="Retry loading the page"
            >
              Retry
            </Button>
            <ButtonLink
              to="/"
              variant="secondary"
              className="inline-flex items-center gap-2"
              aria-label="Go to home page"
            >
              <FiHome size={18} />
              Go to home
            </ButtonLink>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
