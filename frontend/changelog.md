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

Ons 24-12-11

- wrote a test DeleteNoteModal. Thinking about using it in an e2e test instead.

Tors 24-12-12

- wrote tests on DeleteNotemodal, using beforeEach. Added component test in NoteBoard. Testing component behaviour when list is empty. Created TDD-test. changes small stuff inn NoteBoard and AddNoteModal

Fre 24-12-13

- Created AddNoteModal and endpoint for post categories. i can now add a new category. I created toast as comfirmation message for when post i successful. added Tdd test.
- Endpoint and functionality for deleting a category. Made a category that is in use not able to delete

Mån 24-12-16

- Sat whit Gihub Actions all day. I also made an UML-diagram.

Tis 24-12-17

- Now using the same AddNoteModal for edit note as well. When i press edit-icon the values of the note is showing in input-fileds and title and button text is changed.

Changed diagram. Improved interfaces. Added props to AddCategoryModal test. Added invalid feedback on AddCategoryModal

Ons 24-12-18

- Put-endpiont for edit note is now working. Also made small improvements in index.ts. I added another scenario in addNotes test where the added note is also deleted. This because I didn't want my page full of the same test note

Changed name in some test files to mirror its content. Created E2e test addAndDeleteCategory

Added validation and button disabled

Made code covarege work

Tors 24-12-19

Changed sorting on notes, it's now sorting after date. Added validation on select element in AddNoteModal. Created ER diagram.

Added test for edit note.

Added README
