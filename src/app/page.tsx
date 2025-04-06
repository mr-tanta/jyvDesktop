// This is a minimal page that just shows a loading message
// The middleware will handle redirecting to the appropriate locale

export default function RootPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}