const methods = {
  getWips: async () => {
    const result = await fetch("http://localhost:3456/wips");
    return result.json();
  },

  addWip: async (wip_title) => {
    const response = await fetch("http://localhost:3456/wips", {
    method: "POST", 
    headers: {'Content-type': "application/json"},
    body: JSON.stringify({wip_title: wip_title})
  })
  .then(response => response.json())
  return response
  },

  addCard: async (wipId, img_url, upload_date, seen_by_state) => {
    const response = await fetch(`http://localhost:3456/wips/${wipId}`, {
      method: "POST", 
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({img_url: img_url, upload_date: upload_date, seen_by_state:seen_by_state})
    })
    .then(response => response.json())
    return response
  },

  deleteWip: async (wipId) => {
    await fetch(`http://localhost:3456/wips/${wipId}`, 
    {method: "DELETE"});
  },

  deleteCard: async (cardId) => {
    await fetch(`http://localhost:3456/wips/card/${cardId}`,
    {method: "DELETE"});
  },

  updateCard: async (wipId, cardId) => {
    await fetch(`http://localhost:3456/wips/card/${wipId}/${cardId}`,
    {method: "PATCH"});
  }
  ///surely something else needs to happen here
}

export default methods  