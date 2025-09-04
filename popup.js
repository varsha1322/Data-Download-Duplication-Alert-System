document.addEventListener('DOMContentLoaded', async function() {
    try {
      const result = await edge.storage.sync.get({ downloadLinksTable: {} });
      if (!result) {
        console.error('Error retrieving data from storage');
        return;
      }
      const downloadLinksTable = result.downloadLinksTable;
      const linkList = document.getElementById('downloadLinks');
      // Iterate over the hash table and display each link
      for (const downloadId in downloadLinksTable) {
        if (downloadLinksTable.hasOwnProperty(downloadId)) {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = downloadLinksTable[downloadId];
          a.textContent = `Download ${downloadId}: ${downloadLinksTable[downloadId]}`;
          a.target = "_blank"; // Open in a new tab
          li.appendChild(a);
          linkList.appendChild(li);
        }
      }
        // Clear all download links
    const clearAllBtn = document.getElementById('clearAll');
    clearAllBtn.addEventListener('click', function() {
      // Clear the storage
      edge.storage.sync.set({ downloadLinksTable: {} }, function() {
        console.log('Download links cleared.');
      });
      // Clear the list from the UI
      const linkList = document.getElementById('downloadLinks');
      while (linkList.firstChild) {
        linkList.removeChild(linkList.firstChild); // Remove each child element
      }
    });
  } catch (error) {
    console.error('Error:', error, 'Result:', result);
  }
});

  
