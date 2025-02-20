
export default function CalendarView() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white flex-1 shadow-sm rounded-lg">
        <div className="calendar-component h-full">
          <CalendarView />
        </div>
      </div>
    </div>
  );
}
