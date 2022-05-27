import { Event } from "../../models/event.js";
import { User } from "../../models/user.js";
import { dateToString } from "../../helpers/date.js";

export const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      id: user._id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (error) {
    throw error;
  }
};

export const events = async (eventIDs) => {
  try {
    const events = await Event.find({ _id: { $in: eventIDs } });
    return events.map((event) => transformEvent(event));
  } catch (error) {
    throw error;
  }
};

export const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (error) {
    throw error;
  }
};

export const transformEvent = (event) => {
  return {
    ...event._doc,
    id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator),
  };
};


export const transformBooking = booking => {
  return {
    ...booking._doc,
    id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};