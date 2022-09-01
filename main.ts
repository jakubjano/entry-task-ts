import * as http from "http";
import {ApiController} from "./Controllers/EventController";
import {EventService} from "./Services/Event";

const controller = new ApiController(new EventService())

const server = http.createServer((req, res) => {
    if (req.method == "GET") {
        return controller.getEvents(req, res);
    }

    if (req.method == "POST") {
        return controller.createEvent(req, res);
    }
});

server.listen(5000, () => {
    console.log("Server is running on port 5000");
});


