import { useState } from "react";
import "./VendorCalendar.css";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function VendorCalendar({ vendor }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const bookedDates = vendor?.bookedDates || [];

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  // Monday = 0 start
  const getFirstDayOffset = (month, year) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const isBooked = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return bookedDates.includes(dateStr);
  };

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return (
      selectedDate.day === day &&
      selectedDate.month === currentMonth &&
      selectedDate.year === currentYear
    );
  };

  const isPast = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const handleDayClick = (day) => {
    if (isBooked(day) || isPast(day)) return;
    setSelectedDate({ day, month: currentMonth, year: currentYear });
  };

  const formatSelected = () => {
    if (!selectedDate) return null;
    return `${selectedDate.day} ${MONTHS[selectedDate.month]} ${selectedDate.year}`;
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const offset = getFirstDayOffset(currentMonth, currentYear);
  const totalCells = Math.ceil((offset + daysInMonth) / 7) * 7;

  return (
    <div className="vc-wrap">
      <h3 className="vc-heading">Select Your Event Date</h3>

      <div className="vc-header">
        <button className="vc-nav" onClick={prevMonth}>&#8249;</button>
        <span className="vc-month-title">{MONTHS[currentMonth]} {currentYear}</span>
        <button className="vc-nav" onClick={nextMonth}>&#8250;</button>
      </div>

      <div className="vc-grid">
        {DAYS.map((d) => (
          <div key={d} className="vc-day-name">{d}</div>
        ))}
        {Array.from({ length: totalCells }).map((_, i) => {
          const day = i - offset + 1;
          const isValid = day >= 1 && day <= daysInMonth;

          if (!isValid) return <div key={i} className="vc-cell vc-empty" />;

          const booked = isBooked(day);
          const past = isPast(day);
          const todayDay = isToday(day);
          const selected = isSelected(day);

          let className = "vc-cell vc-day";
          if (booked) className += " vc-booked";
          else if (past) className += " vc-past";
          else if (selected) className += " vc-selected";
          else if (todayDay) className += " vc-today";

          return (
            <div key={i} className={className} onClick={() => handleDayClick(day)}>
              {day}
            </div>
          );
        })}
      </div>

      <div className="vc-legend">
        <div className="vc-legend-item">
          <div className="vc-dot vc-dot-avail"></div>
          <span>Available</span>
        </div>
        <div className="vc-legend-item">
          <div className="vc-dot vc-dot-booked"></div>
          <span>Booked</span>
        </div>
        <div className="vc-legend-item">
          <div className="vc-dot vc-dot-past"></div>
          <span>Past</span>
        </div>
      </div>

      {selectedDate && (
        <div className="vc-selected-info">
          Selected: <strong>{formatSelected()}</strong>
        </div>
      )}

      <button
        className={`vc-confirm-btn ${!selectedDate ? "vc-confirm-disabled" : ""}`}
        disabled={!selectedDate}
      >
        Confirm Date
      </button>
    </div>
  );
}