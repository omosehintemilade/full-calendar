import React, { useState } from "react";
import { createEventId } from "../../../utils/constants";
import { closeModal, Modal } from "../Modal";

export default function EventModal({ fcapi, event, setEvent, setEvents }) {
  function createEvent() {
    const calendarApi = fcapi.view.calendar;
    calendarApi.addEvent({
      id: createEventId(),
      title: event.title,
      start: `${event.start_date}T${event.start}:00`,
      end: `${event.end_date}T${event.end}:00`,
      allDay: event.allDay
    });

    calendarApi.unselect();
  }

  return (
    <div className="">
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
              value={event.start_date}
              onChange={(e) => {
                console.log(e.target.value);
                setEvent({
                  ...event,
                  start_date: e.target.value
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
              type="date"
              value={event.end_date}
              onChange={(e) => {
                console.log(e.target.value);
                setEvent({
                  ...event,
                  end_date: e.target.value
                });
              }}
            />
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
            <br />
            <textarea
              cols="40"
              rows="5"
              onChange={(e) => {
                setEvent({
                  ...event,
                  desc: e.target.value
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
              if (!event.start_date) {
                alert("Event date is required");
                return;
              }
              setEvent({
                ...event,
                start: `${fcapi.startStr}T${event.start}:00`
              });
              createEvent();

              setEvents((prev) => [...prev, event]);

              // calendarApi.unselect(); // clear date selection
              closeModal();
            }}
          >
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
}
