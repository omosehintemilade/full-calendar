import React, { useRef, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./App.css";
import { createEventId, INITIAL_EVENTS } from "./utils/constants";
import Modal from "./components/modal";
import { closeModal, openModal, toggleModal } from "./components/modal/helpers";

// const fmd = (date) => {
//   return formatDate(date, {
//     month: "2-digit",
//     year: "numeric",
//     day: "numeric"
//   });
// };

const getTime = (datetime) => {
  const d = new Date(datetime);
  let h = d.getHours();
  let m = d.getMinutes();
  h < 10 && (h = `0${h}`);
  m < 10 && (m = `0${m}`);
  return `${h}:${m}`;
};

const addHours = function (h) {
  const a = new Date();
  a.setHours(a.getHours() + h);
  return a;
};
function App() {
  const [detailsForm, showDetailsForm] = useState(false);
  const [selectionInfo, setSelectionInfo] = useState(null);
  const [events, setEvents] = useState([...INITIAL_EVENTS]);
  const defaultEv = {
    date: "",
    start: "",
    end: "",
    allDay: false,
    title: ""
  };
  const [event, setEvent] = useState(defaultEv);

  const calendarApi = useRef(null);

  const handleDateSelect = (selectInfo) => {
    calendarApi.current = selectInfo.view.calendar;
    const start = getTime(new Date());

    const t = addHours(1);
    const end = getTime(t);

    setEvent({
      date: selectInfo.startStr,
      start: start,
      end: end
    });
    openModal();
  };

  function createEvent(event) {
    const api = calendarApi.current;
    console.log({
      eventFromCreE: {
        id: createEventId(),
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay
      }
    });
    api.addEvent({
      id: createEventId(),
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay
    });

    // Update events
    // setEvents([
    //   ...events,
    //   {
    //     id: createEventId(),
    //     title: event.title,
    //     start: event.start,
    //     end: event.end,
    //     allDay: event.allDay
    //   }
    // ]);
    // // Reset Event
    setEvent(defaultEv);
  }

  const handleEvents = (events) => {
    console.log({ events });
    setEvents(events);
  };
  return (
    <div className="app">
      <h2 className="app__owner">Olayinka's Calendar</h2>
      <Modal>
        <div className="eventModal">
          <h2>Create Event</h2>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Event Title..."
            value={event.title}
            onChange={(e) => {
              setEvent({
                ...event,
                title: e.target.value
              });
            }}
          />
          <br />
          <label>Time</label>{" "}
          <div className="">
            <input
              type="date"
              value={event.date}
              onChange={(e) => {
                console.log(e.target.value);
                setEvent({
                  ...event,
                  date: e.target.value
                });
              }}
            />
            <input
              type="time"
              value={event.start}
              onChange={(e) => {
                console.log(e.target.value);
                setEvent({
                  ...event,
                  start: e.target.value
                });
              }}
            />{" "}
            &mdash;{" "}
            <input
              type="time"
              value={event.end}
              onChange={(e) => {
                console.log(e.target.value);
                setEvent({
                  ...event,
                  end: e.target.value
                });
              }}
            />
          </div>
          <button
            onClick={() => {
              if (!event.title) {
                alert("Event title is required");
                return;
              }
              if (!event.date) {
                alert("Event date is required");
                return;
              }

              createEvent(event);
              closeModal();
            }}
          >
            Create
          </button>
        </div>
      </Modal>

      <div className="layout">
        <div className="layout__sidebar">
          {detailsForm && (
            <div className="">
              <h4>Create Event</h4>
              <div className="">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" />
                <br />
                <h6>Select Range</h6>
                <label htmlFor="from">From</label>
                <input
                  type="time"
                  name="from"
                  value={getTime(new Date())}
                  disabled
                />
                <br />
                <label htmlFor="to">To</label>
                <input type="time" name="to" />
              </div>

              <button
                onClick={() => {
                  createEvent({ props: selectionInfo });
                }}
              >
                Done
              </button>
            </div>
          )}

          <h4>General Settings</h4>
          <div className="weekends">
            <p>Show Weekends</p>
            <input name="toggle-weekend" type="checkbox" />
            <label htmlFor="toggle-weekend">Toggle Weekend</label>
          </div>

          <div className="view">
            <p> Default View</p>
            <input name="month" type="checkbox" />
            <label htmlFor="month">Month</label>
            <input name="week" type="checkbox" />
            <label htmlFor="week">Week</label>
            <input name="day" type="checkbox" />
            <label htmlFor="day">Day</label>
          </div>

          <h4>Appearance</h4>
          <p>Background</p>
          <input type="color" />

          <button onClick={() => openModal()}>Togglr Modal</button>
        </div>

        <div className="layout__main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            initialView="dayGridMonth"
            editable={true}
            initialEvents={events}
            selectable={true}
            selectMirror={true}
            select={handleDateSelect}
            eventsSet={handleEvents} //
          />
        </div>
      </div>
    </div>
  );
}

export default App;
