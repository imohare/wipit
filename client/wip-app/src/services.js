const methods = {
  getWips: async () => {
    const result = await fetch("http://localhost:3456/wips");
    return result.json();
  },

  //question: can you create a new wip with an emtpy wip_card?
  addWip: async (wip_title) => {
    const response = await fetch("http://localhost:3456/wips", {
    method: "POST", 
    headers: {'Content-type': "application/json"},
    body: JSON.stringify({wip_title: wip_title})
  })
  .then(response => response.json())
  return response
  },
  
  //question: do i search in here it like this? NO IDEA WHAT I'M DOING HERE
  // addCard: async (wipId, wip_card.img, wip_card.date, wip_card.seen_by_state, wip_card.seen_by_user, wip_card.seen_by_date) => {
  //   const response = await fetch(`http://localhost:3456/wips/${wipId}`), {
  //     method: 'PATCH', 
  //     headers: {'Content-type': 'application/json'},
  //     body: JSON.stringify({wip_card.img: wip_img, })
  //   }
  // },

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
}

export default methods  