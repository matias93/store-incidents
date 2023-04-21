import { IncidentModel, Store } from "./incidents-store";

describe("Incident constructor", () => {
  it("debe crear un objeto de incidente con las propiedades correctas", () => {
      const description = "Test incident";
      const reportedDate = new Date();
      const incident = new IncidentModel(description, reportedDate);
      expect(incident.description).toBe(description);
      expect(incident.reportedDate).toBe(reportedDate);
      expect(incident.status).toBe("open");
  });
});

describe("Metodo Incident solve", () => {
  it("debe establecer el estado del incidente en 'resuelto' y establecer la propiedad resolveDate", () => {
      const description = "Test incident";
      const reportedDate = new Date();
      const incident = new IncidentModel(description, reportedDate);
      incident.solve();
      expect(incident.status).toBe("solved");
      expect(incident.solvedDate).toBeDefined();
  });
});

describe("Metodo Store incident_status ", () => {
  it("debe devolver el resumen de estado de incidente correcto para un intervalo de fechas determinado", () => {
      const startDate = new Date("2022-01-01");
      const endDate = new Date("2022-12-31");
      const incidents = [
        new IncidentModel("incident 1", new Date("2022-01-02")),
        new IncidentModel("incident 2", new Date("2022-02-01")),
        new IncidentModel("incident 3", new Date("2022-03-01")),
        new IncidentModel("incident 4", new Date("2022-04-01")),        ];
      incidents[0].solve();
      incidents[1].solve();
      incidents[2].solve();
      const store = new Store(incidents);
      const summary = store.incident_status(startDate, endDate);
      expect(summary.open).toBe(1);
      expect(summary.solved).toBe(3);
      expect(summary.averageSolutionTime).toBeGreaterThan(0);
      expect(summary.currentMaxSolutionTime).toBeGreaterThan(0);
  });
});


