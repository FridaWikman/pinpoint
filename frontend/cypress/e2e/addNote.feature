Feature: Add note

There should be a button for 'add note'. When I click the button a modal should open. A form should exist in the modal with an input-field for title, a textfield for notes, a dropdown-meny for categories and an input-field for author name. There should also be a button for send form. I should be possible to type values in all fields and send the values on click at send-button. I will then check if my list of notes has increased ny one.

Scenario:
Given I am on the homepage and sees the button for add note
When I click on the button
Then The modal should be visible


Scenario:
Given I see the modal an the form
When I put values in all fields in the form. I click on send-button
Then The modal should close and the list of notes should have increased by one
