// You need js-yaml to parse YAML. Ensure it's included in your HTML:
// <script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>

async function render_table(url) {
    try {
      const response = await fetch(url);
      const yamlText = await response.text();
      const data = jsyaml.load(yamlText);
  
      if (!data || data.gadget !== 'table') {
        throw new Error('Invalid or missing table gadget');
      }
  
      const columns = data.columns || [];
      const rows = data.data || [];
      const tableAttrs = data.attributes || {}; // Optional table attributes from YAML
  
      const table = document.createElement('table');

      // Apply attributes to the table
      for (const [key, value] of Object.entries(tableAttrs)) {
       table.setAttribute(key, value);
      }
  
      // Header
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      for (const col of columns) {
        const th = document.createElement('th');
        th.textContent = col;
        th.style.border = '1px solid #ccc';
        //th.style.padding = '5px';
        headerRow.appendChild(th);
      }
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      // Body
      const tbody = document.createElement('tbody');
      for (const item of rows) {
        const tr = document.createElement('tr');
  
        // Apply extra properties to <tr>
        for (const [key, value] of Object.entries(item)) {
          if (key !== 'row') tr.setAttribute(key, value);
        }
  
        // Render columns
        for (const col of columns) {
          const td = document.createElement('td');
          const colEntry = item.row?.find(entry => Object.keys(entry)[0] === col);
          td.textContent = colEntry ? colEntry[col] : '';
          //td.style.border = '0px solid #ccc';
          //td.style.padding = '5px';
          tr.appendChild(td);
        }
  
        tbody.appendChild(tr);
      }
      table.appendChild(tbody);
  
      const container = document.getElementById('table-container');
      container.innerHTML = '';
      container.appendChild(table);
  
    } catch (error) {
      console.error('Error rendering table:', error);
    }
}