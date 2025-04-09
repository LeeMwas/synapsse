// components/ErrorBoundary.jsx
import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-900 text-white rounded-lg m-4">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <details className="whitespace-pre-wrap bg-red-950 p-4 rounded overflow-auto">
            <summary className="cursor-pointer mb-2 font-semibold">Error details (click to expand)</summary>
            <p className="mb-2">{this.state.error && this.state.error.toString()}</p>
            <p className="text-xs font-mono">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </p>
          </details>
          <button 
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}