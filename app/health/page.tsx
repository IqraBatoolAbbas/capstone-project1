async function getHealthStatus() {
  // Simple mock data fetch
  return {
    status: "Healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  };
}

export default async function HealthPage() {
  const health = await getHealthStatus();

  return (
    <main className="min-h-screen p-8 bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-xl font-bold text-gray-800 mb-4">System Health Check</h1>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong className="text-gray-800">Status:</strong> <span className="text-green-600 font-semibold">{health.status}</span></p>
          <p><strong className="text-gray-800">Timestamp:</strong> {health.timestamp}</p>
          <p><strong className="text-gray-800">Environment:</strong> {health.environment}</p>
        </div>
      </div>
    </main>
  );
}