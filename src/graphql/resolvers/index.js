import eventsResolver from "./events.js";
import bookingResolver from "./booking.js";
import authResolver from "./auth.js";

export default {
  ...eventsResolver,
  ...bookingResolver,
  ...authResolver,
};
