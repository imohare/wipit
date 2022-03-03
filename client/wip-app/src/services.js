const methods = {
  getWips: async () => {
    const result = await fetch("http://localhost:3456/wips");
    return result.json();
  }
}
export default methods