import {format, parseISO} from "date-fns";

export function formatFromISO(isodate){
    return format(parseISO(isodate), "yyyy.MM.dd' 'HH:mm")
}
