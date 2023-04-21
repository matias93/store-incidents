import { IncidentModel, Store } from "./incidents-store";


const incidents = [
    
new IncidentModel("Descripción del incidente 1", new Date()), 
new IncidentModel("Descripción del incidente 2", new Date()),
new IncidentModel("Descripción del incidente 4", new Date()),
new IncidentModel("Descripción del incidente 3", new Date())];
const store = new Store(incidents);
//console.log("store====>",store)

const startDate = new Date("2023-04-01");
const endDate = new Date("2023-04-30");
const status = store.incident_status(startDate, endDate);
console.log("sts=====>",status);