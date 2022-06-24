import React, { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./App.css";
import { createEventId, INITIAL_EVENTS } from "./utils/constants";
import Modal from "./components/modal";
import { closeModal, openModal } from "./components/modal/helpers";

const getTime = (date = new Date()) => {
  let hrs = date.getHours();
  let mins = date.getMinutes();
  hrs < 10 && (hrs = `0${hrs}`);
  mins < 10 && (mins = `0${mins}`);
  return `${hrs}:${mins}`;
};

const addHours = function (date = new Date(), hours = 1) {
  const a = date;
  a.setHours(a.getHours() + hours);
  return a;
};

// Format Date
export const fd = () => {
  const date = {
    year: "",
    month: "",
    day: ""
  };
  const d = new Date();
  date.year = d.getFullYear();
  date.month = d.getMonth() + 1;
  date.day = d.getDate();
  if (+date.day <= 9) {
    date.day = `0${date.day}`;
  }
  if (+date.month <= 9) {
    date.month = `0${date.month}`;
  }
  const formattedDate = `${date.year}-${date.month}-${date.day}`;
  return formattedDate;
};
export default function Dashboard() {
  const [detailsForm, showDetailsForm] = useState(false);
  const [selectionInfo, setSelectionInfo] = useState(null);

  const defEndDate = () => {
    let modified_date = addHours();
    return getTime(modified_date);
  };

  const defaultEv = {
    date: fd(),
    start: getTime(),
    end: defEndDate(),
    allDay: false,
    title: ""
  };

  console.log({ defaultEv });
  const [event, setEvent] = useState(defaultEv);

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [events, setEvents] = useState([]);
  const [fcapi, setFcapi] = useState(null);

  function createEvent(calendarApi) {
    const ev = fcapi;
    // console.log({ ev });
    // console.log({ event });

    calendarApi.addEvent({
      id: createEventId(),
      title: event.title,
      // start: "2022-06-24T12:00:00", //  event.startStr,
      // end: "2022-06-24T16:00:00", //event.endStr,
      start: `${event.date}T${event.start}:00`,
      end: `${event.date}T${event.end}:00`,
      allDay: event.allDay
    });
  }

  const handleEvents = (events) => {
    console.log({ events });
    setEvents(events);
  };
  const handleDateSelect = (selectInfo) => {
    setFcapi(selectInfo);
    openModal();
    // let calendarApi = selectInfo.view.calendar;
  };

  const handleEventClick = (clickInfo) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
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
              let calendarApi = fcapi.view.calendar;

              createEvent(calendarApi);
              console.log({ calendarApi });

              // calendarApi.unselect(); // clear date selection
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
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            // eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    </div>
  );
}
