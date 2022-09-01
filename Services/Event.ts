import {Event} from "../Models/IEvent";

type aggregationResult = {name: string, count: number}
export class EventService {

    constructor() {
    }
    static es: Map<string, Event[]> = new Map<string, Event[]>()


    public aggregateEvents(name: string, from: number, to: number, interval: number): aggregationResult[] {
        let result: aggregationResult[] = []
        let es = EventService.es.get(name)
        let eventsFromTo = es?.filter((event) => {
            return event.CreatedAt >= from && event.CreatedAt < to
        })
        for (let i = from; i < to; i += interval) {
            // if last iteration exceeds to
            if (i + interval > to) {
                interval = to - i
            }
            const eventsInInterval = eventsFromTo?.filter((event) => {
                return event.CreatedAt >= i && event.CreatedAt < i + interval
            })
            const counter = eventsInInterval?.length
            result.push({name: name, count: counter !== undefined ? counter : 0})
        }
        return result
    }

    public createEvent(name:string): Event {
        const e = <Event>{Name: name, CreatedAt: Math.floor(Date.now() / 1000)}
        let eventArray = EventService.es.get(name)
        eventArray?.push(e)
        return e
    }

}



