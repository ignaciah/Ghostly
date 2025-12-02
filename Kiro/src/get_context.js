const activeWin = require('active-win');

module.exports = {
  name: 'get_context',
  description: 'Gets the title and owner of the currently active window to provide context.',
  async run() {
    try {
      const window = await activeWin();
      return {
        title: window.title,
        owner: {
          name: window.owner.name,
        },
      };
    } catch (error) {
      // Fallback if we can't get the active window
      return { title: 'Unknown', owner: { name: 'Unknown' } };
    }
  },
};
