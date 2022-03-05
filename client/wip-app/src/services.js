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

  addCard: async (wipId, wip_card) => {
    const response = await fetch(`http://localhost:3456/wips/${wipId}`, {
      method: "POST", 
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({wip_card: wip_card})
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