import daybookRouter from '@/modules/daybook/router/';

describe('Daybook Router Test', () => {
  test('Should have the correct configuration', async () => {
    // console.log(daybookRouter)
    expect(daybookRouter).toMatchObject(
      {
        name: 'daybook',
        component: expect.any(Function),
        children: [
          {
            path: '',
            name: 'no-entry',
            component: expect.any(Function),
          },
          {
            path: 'entry/:id',
            name: 'entry',
            component: expect.any(Function),
            props: expect.any(Function),
          }
        ]
      }
    );
  });
  
  test('Should verify if components exists as children of the main route', async () => {
    // expect((await daybookRouter.children[0].component()).default.name).toBe('NoEntrySelectedView'); // Resuelve la promesa y luego accede al resto de valores
    // expect((await daybookRouter.children[1].component()).default.name).toBe('EntryView');  
    const promisesRoutes = []; // Init a eempty array
    daybookRouter.children.forEach((child) => promisesRoutes.push(child.component())); // Push all components in promises routes array
    const routes = (await Promise.all(promisesRoutes)).map((route) => route.default.name); // resolve all pending promises and map default name at routes array
    expect(routes).toContain('NoEntrySelectedView'); // Test if the component exists in the routes arrat
    expect(routes).toContain('EntryView');
  });

  test('Should return the route\'s id', () => {
    const routeProps = {
      params: {
        id:  'ABC123',
      },
    };
    const entryRoute = daybookRouter.children.find((route) => route.name === 'entry');
    expect(entryRoute.props(routeProps)).toEqual({ id: 'ABC123' });
  })
})