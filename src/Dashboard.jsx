import React, { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./App.css";
import { createEventId, fd, addHours, INITIAL_EVENTS } from "./utils/constants";
import { Modal, closeModal, openModal } from "./components/Modals/Modal";
import EventModal from "./components/Modals/EventModal";

const getTime = (date = new Date()) => {
  let hrs = date.getHours();
  let mins = date.getMinutes();
  hrs < 10 && (hrs = `0${hrs}`);
  mins < 10 && (mins = `0${mins}`);
  return `${hrs}:${mins}`;
};

const defEndDate = () => {
  let modified_date = addHours();
  return getTime(modified_date);
};

export default function Dashboard() {
  const defaultEv = {
    start_date: fd(),
    end_date: fd(),
    start: getTime(),
    end: defEndDate(),
    allDay: false,
    title: "",
    desc: ""
  };

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [fcapi, setFcapi] = useState(null);
  const [event, setEvent] = useState(defaultEv);
  const [events, setEvents] = useState([...INITIAL_EVENTS]);

  console.log({ events });
  const handleDateSelect = (selectInfo) => {
    const d1 = fd(new Date());
    const d2 = fd(new Date(selectInfo.startStr));

    if (d1 > d2) {
      alert("Can't create events in the past");
      selectInfo.view.calendar.unselect();
    } else {
      setFcapi(selectInfo);
      setEvent({
        ...event,
        start_date: fd(selectInfo.start),
        end_date: fd(selectInfo.end)
      });
      openModal();
    }
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

      <EventModal
        fcapi={fcapi}
        event={event}
        setEvent={setEvent}
        setEvents={setEvents}
      />

      <div className="layout">
        <div className="layout__sidebar">
          <h4>Events</h4>

          {events.map((e) => {
            return (
              <div className="" key={e.id}>
                <h6>{e.title}</h6>
                <p>
                  {e.start_date} &mdash; {e.end_date}
                </p>
              </div>
            );
          })}
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
            // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            // eventAdd={function () {
            //   console.log({ event });
            // }}
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
