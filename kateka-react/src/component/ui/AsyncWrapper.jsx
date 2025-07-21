export default function AsyncWrapper({ loading, error, children, retry }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-olive-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-xl">Error loading data: {error}</p>
          {retry && (
            <button
              onClick={retry}
              className="mt-4 px-4 py-2 bg-olive-600 text-white rounded hover:bg-olive-700"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return children;
}
