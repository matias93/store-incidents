export class IncidentModel {
    description: string;
    reportedDate: Date;
    status: string;
    solvedDate?: Date;
    /**
     * 
     * @param description 
     * @param reportedDate 
     */
    constructor(description: string, reportedDate: Date) {
        this.description = description;
        this.reportedDate = reportedDate;
        this.status = "open";
    }

    solve(): void {
        this.status = "solved";
        this.solvedDate = new Date();
    }
}

export class Store {
    incidents: IncidentModel[];
    /**
     * 
     * @param incidents 
     */
    constructor(incidents: IncidentModel[]) {
        this.incidents = incidents;
    }
    /**
     * 
     * @param startDate 
     * @param endDate 
     * @returns 
     */
    incident_status(startDate: Date, endDate: Date): {
        open: number;
        solved: number;
        averageSolutionTime: number;
        currentMaxSolutionTime: number;
    } {
        let openCount = 0;
        let solvedCount = 0;
        let totalSolutionTime = 0;
        let maxSolutionTime = 0;
        
        this.incidents.forEach((incident) => {
            if (incident.reportedDate >= startDate && incident.reportedDate <= endDate) {
                if (incident.status === "open") {
                    openCount++;
                    const timeDiff = new Date().getTime() - incident.reportedDate.getTime();
                    if (timeDiff > maxSolutionTime) {
                        maxSolutionTime = timeDiff;
                    }
                } else {
                    solvedCount++;
                    totalSolutionTime += incident.solvedDate!.getTime() - incident.reportedDate.getTime();
                    const timeDiff = incident.solvedDate!.getTime() - incident.reportedDate.getTime();
                    if (timeDiff > maxSolutionTime) {
                        maxSolutionTime = timeDiff;
                    }
                }
            }
        });

        const averageSolutionTime = solvedCount > 0 ? totalSolutionTime / solvedCount : 0;
        const currentMaxSolutionTime = Math.max(maxSolutionTime, new Date().getTime() - startDate.getTime());

        return {
            open: openCount,
            solved: solvedCount,
            averageSolutionTime: averageSolutionTime,
            currentMaxSolutionTime: currentMaxSolutionTime,
        };
    }
}
