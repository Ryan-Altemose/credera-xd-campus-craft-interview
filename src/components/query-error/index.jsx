import './style.css';

export const QueryError = ({ message, onRetry }) => (
  <div className="query-error" role="alert">
    <p className="page-paragraph">{message}</p>
    <button type="button" onClick={onRetry}>
      Try again
    </button>
  </div>
);
