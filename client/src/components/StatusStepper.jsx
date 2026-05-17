const statuses = [
  "Order Received",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

const icons = {
  "Order Received": "✓",
  Preparing: "🍳",
  "Out for Delivery": "🛵",
  Delivered: "🏠",
};

function StatusStepper({ currentStatus }) {
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 relative">
        {statuses.map((status, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;

          return (
            <div
              key={status}
              className="flex md:flex-col items-center md:flex-1 gap-4 md:gap-3 relative z-10"
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-bold ${
                  isCompleted
                    ? "bg-[#ad2c00] text-white"
                    : "bg-gray-200 text-gray-500"
                } ${isActive ? "ring-4 ring-orange-100" : ""}`}
              >
                {icons[status]}
              </div>

              <p
                className={`font-bold text-sm md:text-center ${
                  isCompleted
                    ? "text-[#ad2c00]"
                    : "text-gray-500"
                }`}
              >
                {status}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatusStepper;