export default  () => ({
  isLoading: false,
  entries: [
    {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque dolor sed doloribus sequi expedita! Vel veritatis deleniti quaerat eum doloribus.',
      picture: null,
    },
    {
      id: new Date().getTime() + 1000,
      date: new Date().toDateString(),
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque dolor sed doloribus sequi expedita! Vel veritatis deleniti quaerat eum doloribus.',
      picture: null,
    },
    {
      id: new Date().getTime() + 2000,
      date: new Date().toDateString(),
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque dolor sed doloribus sequi expedita! Vel veritatis deleniti quaerat eum doloribus.',
      picture: null,
    },
  ],
});