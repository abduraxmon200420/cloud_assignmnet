document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crud-form');
    const table = document.getElementById('crud-table').getElementsByTagName('tbody')[0];
    let editMode = false;
    let editRow = null;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = form.elements['name'].value;
        const description = form.elements['description'].value;

        if (editMode) {
            editRow.cells[0].textContent = name;
            editRow.cells[1].textContent = description;
            document.getElementById('form-title').textContent = 'Add New Item';
            document.getElementById('form-submit').textContent = 'Add Item';
            editMode = false;
        } else {
            const newRow = table.insertRow();
            newRow.insertCell(0).textContent = name;
            newRow.insertCell(1).textContent = description;
            const actionCell = newRow.insertCell(2);
            actionCell.innerHTML = `
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;

            actionCell.querySelector('.edit-button').addEventListener('click', function() {
                editMode = true;
                editRow = newRow;
                document.getElementById('form-title').textContent = 'Edit Item';
                document.getElementById('form-submit').textContent = 'Update Item';
                form.elements['name'].value = newRow.cells[0].textContent;
                form.elements['description'].value = newRow.cells[1].textContent;
            });

            actionCell.querySelector('.delete-button').addEventListener('click', function() {
                table.deleteRow(newRow.rowIndex - 1);
            });
        }

        form.reset();
    });
});
