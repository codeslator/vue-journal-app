import journalApi from "@/api/journalApi";
// export const action = async ({ commit }) => {


// };

export const fetchEntries = async ({ commit }) => {
  const { data } = await journalApi.get('/entries.json');
  if (!data) {
    commit('setEntries', []);
    return;
  }
  const entries = [];
  for(let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id]
    });
  }
  commit('setEntries', entries);
};


export const saveEntry = async ({ commit }, entry) => {
  const { data } = await journalApi.post(`/entries.json`, entry);
  entry.id = data.name;
  // console.log(data);
  commit('addEntry', { ...entry });
  return entry.id;
};

export const updateEntry = async ({ commit }, entry) => {
  const { id, date, picture, text } = entry;
  const dataToSave = {
    date,
    picture,
    text,
  }
  await journalApi.put(`/entries/${id}.json`, dataToSave);
  commit('updateEntry', { ...entry })
};

export const deleteEntry = async ({ commit }, id) => {
  await journalApi.delete(`/entries/${id}.json`);
  commit('deleteEntry', id);
};