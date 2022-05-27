import { Event } from "../../models/event.js";
import { User } from "../../models/user.js";
import { transformEvent } from "./merge.js";

export default {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => transformEvent(event));
    } catch (error) {
      throw error;
    }
  },

  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: "628fa8fe2c7077f3b24fb560",
      });

      const creator = await User.findById("628fa8fe2c7077f3b24fb560");

      if (!creator) {
        throw new Error("User with id  '628fa8fe2c7077f3b24fb560' not found.");
      }

      creator.createdEvents.push(event);
      await creator.save();

      const result = await event.save();
      return transformEvent(result);
    } catch (error) {
      throw error;
    }
  },
};
