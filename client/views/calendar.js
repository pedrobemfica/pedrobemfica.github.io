import { MONTHS } from '../models/entities.js';

export function initializeCalendar() {

    const calendarBody = document.getElementById('calendarBody');
    const monthAndYear = document.getElementById('monthAndYear');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    prevMonthButton.addEventListener('click', () => {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        showCalendar(currentDate, currentMonth, currentYear);
    });
    
    nextMonthButton.addEventListener('click', () => {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth + 1) % 12;
        showCalendar(currentDate, currentMonth, currentYear);
    });
    
    showCalendar(currentDate, currentMonth, currentYear); 
}

function showCalendar(actDate, month, year) {
    const firstDay = (new Date(year, month)).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    calendarBody.innerHTML = "";
    monthAndYear.innerHTML = `${MONTHS[month]} ${year}`;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement('td');
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement('td');
                let cellText = document.createTextNode(date);
                cell.appendChild(cellText);
                if (date === actDate.getDate() && year === actDate.getFullYear() && month === actDate.getMonth()) {
                    cell.classList.add("selected");
                }
                cell.addEventListener('click', (e) => {
                    selectDate(e, date, month, year);
                });
                row.appendChild(cell);
                date++;
            }
        }
        calendarBody.appendChild(row);
    }
}

function selectDate(e, date, month, year) {
    const selected = document.querySelectorAll('.selected');
    let selectedDate;
    selected.forEach(element => {
        element.classList.remove('selected');
    });

    e.target.classList.add('selected');
    selectedDate = new Date(year, month, date);
}
