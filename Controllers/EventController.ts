import { ServerResponse, IncomingMessage } from "http";
import {EventService} from "../Services/Event";
import {GetNameFromRoute, ParseGetRequestURL} from "../Helpers/RequestHelper";

export class ApiController {
    constructor( private readonly es: EventService) {
    }
    public getEvents(req: IncomingMessage, res: ServerResponse) {
        try {
            const u = new URL(req.url || '', `http://${req.headers.host}`)
            const parsedUrl = ParseGetRequestURL(u)
            const aggregationResult = this.es.aggregateEvents(parsedUrl.eventName,
                parsedUrl.queryParams.from,
                parsedUrl.queryParams.to,
                parsedUrl.queryParams.interval)
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify(aggregationResult))
        } catch (e) {
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify({
                error: e
            }))
        }
    }
    public createEvent(req: IncomingMessage, res: ServerResponse) {
        try {
        const u = new URL (req.url || '', `http://${req.headers.host}`)
        const eventName = GetNameFromRoute(u)
        const event = this.es.createEvent(eventName)
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(event))
    } catch (e) {
            res.writeHead(400, {"Content-Type": "application/json"})
            res.end(JSON.stringify({
                    error: e
                }))
        }
    }
}
