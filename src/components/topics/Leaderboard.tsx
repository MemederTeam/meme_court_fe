export default function Leaderboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Leaderboard</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-lg text-white">1</span>
            <span className="font-semibold text-white">User 1</span>
          </div>
          <span className="text-gray-300">1000 points</span>
        </div>
        <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-lg text-white">2</span>
            <span className="font-semibold text-white">User 2</span>
          </div>
          <span className="text-gray-300">950 points</span>
        </div>
        <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg bg-gray-800">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-lg text-white">3</span>
            <span className="font-semibold text-white">User 3</span>
          </div>
          <span className="text-gray-300">900 points</span>
        </div>
      </div>
    </div>
  );
}