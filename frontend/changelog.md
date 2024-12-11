## Changelog

Tis 24-12-03

- Skapade github-repo och satte upp projektet. Skapade databas och en init.sql-fil. Shared-mapp och interfaces-filer för att samla alla interfaces och inte behöva ha dem i komponenterna.

Ons 24-12-04

- Gjorde endpoint för Get notes och Get categories. Skapade kommponent NoteBoard där jag började med att visa datan jag fetchat.

Tors 24-12-05

- Created e2e BDD-test that tests if its possible to open a modal and post a new note. The modal with form has not been created yet.

Fre 24-12-06

- Changed how to click on right element in dropdown menu in addNote.ts test.
- Created component for button and modal with add-note form. Bdd-test is now working and i can post a new note. Created endpoint for post note.

Mån 24-12-09

- Created baseUrl. Tried to create component test and remove errors for a while and got help from teatcher. Wrote a component test that controlls if there is any items in my list and that the element, in which note content is show, is not empty.

Tis 24-12-10

- Created modal component DeleteNote and used props to get note values. created funvtion for delete note and endpoint. Sent getNotes function as props to DeleteNote and AddNoteModal to be able to update list. Added and extended an interface.
- Moved Trash icon into DeleteNoteModal and changed so the modal is now opening and closing in the same way as AddNoteModal.
