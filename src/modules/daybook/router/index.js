export default {
  name: 'daybook',
  component: () => import(/* webpackChunkName: "DaybookLayout" */ '@/modules/daybook/layouts/DaybookLayout'),
  children: [
    {
      path: '', 
      name: 'no-entry',
      component: () => import(/* webpackChunkName: "DaybookNoEntrySelected" */ '@/modules/daybook/views/NoEntrySelectedView'),
    },
    {
      path: 'entry/:id',
      name: 'entry',
      component: () => import(/* webpackChunkName: "DaybookEntry" */ '@/modules/daybook/views/EntryView'),
      props: (route) => {
        return {
          id: route.params.id,
        }
      }
    }
  ]
};