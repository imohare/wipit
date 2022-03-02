const methods = {
  getTopics: async () => {
    const result = await fetch("http://localhost:3001/topics");
    return result.json();
  }
}
export default methods