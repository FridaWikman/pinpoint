Feature: Add note

There should be a button for 'add note'. When I click the button a modal should open. A form should exist in the modal with an input-field for title, a textfield for notes, a dropdown-meny for categories and an input-field for author name. There should also be a button for send form. I type values in all fields and send the values on click at send-button. I will then check if my list of notes has increased ny one. I then find the new note and click on delete-icon. A modal should open and I click on delete. The note should now not exist in list anymore.

Scenario: Open modal, fill in form and add new note
Given I am on the homepage and sees the button for add note
When I click on the button. I put values in all fields in the form. I click on send-button
Then The modal should close and the list of notes should have increased by one

Scenario: Find note, open modal, click on delete and verify note is gone
Given I am on the homepage and sees the note and trash-icon
When I click on trash-icon. I click on delete button
Then The modal should close and the note should not exist
