# Labb 3. PinPoint - en anslagstavla

## Instruktioner för att starta projektet

1. Packa upp zip-filen

2. Ställ dig i frontend-mappen och kör npm install

3. Ställ dig i backend-mappen och kör npm install

4. Skapa en postgres-databas, tabeller och startdata finns i db.sql-filen i backend-mappen

5. Skapa en .env-fil i backend-mappen och lägg in:
   PGURI=postgres://ANVÄNDARNAMN:LÖSENORD@localhost/pinpoint
   där du ersätter användarnamn och lösenord mot dina egna. pinpoint är namnet du gav databasen när du skapa den med CREATE DATABASE pinpoint;

6. Kör npm run dev i terminalen i backend-mappen

7. Kör npm run dev i terminalen i frontend-mappen

8. Kör npx cypress open i en annan terminal i frontend för att köra tester

## Mål

- Mitt BDD-test är addAndDeleteNote.cy.tsx där jag skrev scenario 1 innan jag utvecklade komponenten. Jag lade till scenario två scenare för jag kom på att jag inte ville att testet bara skulle lägga till fler och fler notes utan istället även ta bort den.
  Jag gjorde ytterligare TDD-test i AddCategoryModal.cy.tsx

- Interfaces som delas med både frontend och backend finns i en mapp som heter shared. Jag har även en mapp i backend som heter interfaces för de interfaces som bara tillhör backend.

- Jag har skapat två UML-diagram, ett ER-diagram och ett sekvensdiagram. Dessa finns i mappen UML-diagram i frontend.

- Code coverage går att ta del av genom att först köra testerna i terminalen genom att skriva npx cypress run och npx cypress run --component
  Gå sedan in i coverage/Icov_output, högerklicka på index.html och välj 'Open with live server'.

- Github actions har implementerats och tester körs vid varje push. I github går det att se actions via fliken Actions. För detta har jag lagt upp datsbasen på Render och kopplat den till Github Actions genom att lägga in External Database URL från Render som secret på Github.
