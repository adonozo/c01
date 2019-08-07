import { AbstractController } from './abstract-controller';

export class HealthController extends AbstractController {

    public register(): void {
        this.app.get('/api/v1/health', (req, res): void => {
            const healthService = this.service.HealthService;
            const health = healthService.getHealth();
            res.send(health);
        });
    }
}
