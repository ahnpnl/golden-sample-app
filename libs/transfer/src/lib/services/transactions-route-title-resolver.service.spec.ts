import { ActivatedRouteSnapshot } from '@angular/router';
import { MakeTransferJourneyConfiguration } from './make-transfer-journey-config.service';
import { MakeTransferRouteTitleResolverService } from './make-transfer-route-title-resolver.service';

describe('MakeTransferRouteTitleResolverService', () => {
  function createInstance(config: Partial<MakeTransferJourneyConfiguration>) {
    return new MakeTransferRouteTitleResolverService(
      config as MakeTransferJourneyConfiguration
    );
  }

  it('should route the title if the `slimMode` configuration is set as false', () => {
    const service = createInstance({ slimMode: false });
    const result = service.resolve(
      {
        data: {
          title: 'hello',
        },
      } as any,
      {} as any
    );

    expect(result).toBe('hello');
  });

  it('should route the title if the `slimMode` configuration is set as false', () => {
    const service = createInstance({ slimMode: true });
    const result = service.resolve(
      {
        data: {
          title: 'hello',
        },
      } as any,
      {} as any
    );

    expect(result).toBe('');
  });
});