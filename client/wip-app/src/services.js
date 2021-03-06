const methods = {
  getWips: async () => {
    const result = await fetch("http://localhost:3456/wips");
    return result.json();
  },

  addWip: async (wip_title, update_request, update_request_date) => {
    const response = await fetch("http://localhost:3456/wips", {
    method: "POST", 
    headers: {'Content-type': "application/json"},
    body: JSON.stringify({
      wip_title: wip_title, 
      update_request: update_request,
      update_request_date: update_request_date
    })
  })
  .then(response => response.json())
  return response
  },

  addCard: async (wipId, img_url, upload_date, seen_by_state, seen_by_user, seen_by_date) => {
    const response = await fetch(`http://localhost:3456/wips/${wipId}`, {
      method: "POST", 
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        img_url: img_url, 
        upload_date: upload_date, 
        seen_by_state: seen_by_state, 
        seen_by_user: seen_by_user, 
        seen_by_date: seen_by_date, 
      })
    })
    .then(response => response.json())
    return response
  },

  deleteWip: async (wipId) => {
    await fetch(`http://localhost:3456/wips/${wipId}`, 
    {method: "DELETE"});
  },

  deleteCard: async (wipId, cardId) => {
    await fetch(`http://localhost:3456/wips/${wipId}/card/${cardId}`,
    {method: "DELETE"});
  },

  updateCard: async (wipId, cardId, seen_by_state, seen_by_user, seen_by_date) => {
    try {
      await fetch(`http://localhost:3456/wips/updateCard/${wipId}/${cardId}`, {
      method: "PATCH", 
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({seen_by_state: seen_by_state, seen_by_user: seen_by_user, seen_by_date: seen_by_date})
    })
    } catch (e) {
      console.error(e)
    }
  },

  updateTitle: async (wipId, wip_title) => {
    try {
      await fetch(`http://localhost:3456/wips/updateTitle/${wipId}`, {
      method: "PATCH", 
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({wip_title: wip_title})
    })
    } catch (e) {
      console.error(e)
    }
  },

  updateRequest: async (wipId, update_request, update_request_date) => {
    try {
      await fetch(`http://localhost:3456/wips/updateRequest/${wipId}`, {
      method: "PATCH", 
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({update_request: update_request, update_request_date: update_request_date})
    })
    } catch (e) {
      console.error(e)
    }
  },

  getAllCards: async () => {
    const result = await fetch("http://localhost:3456/cards");
    return result.json();
  },

  addComment: async (cardId, comment, upload_date, seen_by_state, seen_by_user) => {
      const response = await fetch(`http://localhost:3456/wips/addComment/${cardId}`, {
        method: "PUT", 
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          comment: comment, 
          upload_date: upload_date, 
          seen_by_state: seen_by_state, 
          seen_by_user: seen_by_user
        })
      })
      .then(response => response.json())
      return response
    }
  }


export default methods  