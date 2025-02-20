
export default function CalendarView() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white flex-1 shadow-sm rounded-lg p-6">
        <div className="calendar-component">
          <CalendarView />
        </div>
      </div>
    </div>
  );
}
