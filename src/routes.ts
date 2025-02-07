import { Express } from "express"
// import { createBooking } from "./controllers/booking.controller"
// import { getAllCarsHandler } from "./controllers/car.controller"
import { createUserSessionHandler, deleteSessionsHandler, getUserSessionsHandler, } from "./controllers/session.controller"
import { createUserHandler, getAllUsersHandler, getUserByIdHandler, } from "./controllers/user.controller"
import requireAdmin from "./middlewares/requireAdmin"
import requireUser from "./middlewares/requireUser"
import validate from "./middlewares/validateResource"
import createSessionSchema from "./schemas/session.schema"

const routes = (app: Express) => {
  // users
  app.get("/api/users", requireAdmin, getAllUsersHandler)
  app.get("/api/users/:id", getUserByIdHandler)
  app.post("/api/users", createUserHandler)

  // sessions
  app.get("/api/sessions", requireUser, getUserSessionsHandler)
  app.post("/api/sessions", validate(createSessionSchema), createUserSessionHandler)
  app.delete("/api/sessions", requireUser, deleteSessionsHandler)

  // // Rental
   app.post("api/rent", requireUser, createBooking)
  
  // Car
   app.get("api/cars", getAllCarsHandler);
};

export default routes;
