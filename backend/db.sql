CREATE DATABASE pinpoint;

CREATE TABLE categories (
  categoryId serial PRIMARY KEY,
  categoryName TEXT NOT NULL UNIQUE,
  categoryDescription TEXT
);

CREATE TABLE notes (
  noteId serial PRIMARY KEY,
  noteAuthor TEXT,
  noteTitle TEXT,
  noteContent TEXT NOT NULL,
  noteCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  noteUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  noteCategoryId INT NOT NULL,
  FOREIGN KEY (noteCategoryId) REFERENCES categories(categoryId) ON DELETE CASCADE
);

INSERT INTO categories (categoryName, categoryDescription) VALUES
('Personligt', 'Anteckningar för privata tankar, mål och reflektioner.'),
('Arbete', '	Arbetsrelaterade anteckningar som mötesanteckningar, uppgifter eller deadlines.'),
('Shopping', 'Inköpslistor för mat, kläder eller andra saker att köpa.'),
('Ideér', 'Utkast eller tankar för projekt, uppfinningar eller kreativa projekt.'),
('Resor', 'Planering och packlistor för resor, eller anteckningar från dina äventyr.'),
('Hälsa och träning', 'Träningsscheman, kostplaner och hälsomål.'),
('Att göra', '	En allmän kategori för alla typer av att-göra-listor och uppgifter.'),
('Evenemang', 'Planering och idéer för kommande födelsedagar, fester eller andra evenemang.');

INSERT INTO notes (noteTitle, noteContent, noteCategoryId)
VALUES
('Mål för 2024',
 'Börja träna tre gånger i veckan.',
 1);
