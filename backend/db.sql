CREATE DATABASE pinpoint;

CREATE TABLE categories (
  category_id serial PRIMARY KEY,
  category_name TEXT NOT NULL UNIQUE,
  category_description TEXT
);

CREATE TABLE notes (
  note_id serial PRIMARY KEY,
  note_author TEXT,
  note_title TEXT,
  note_content TEXT NOT NULL,
  note_category INT NOT NULL,
  note_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  note_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (note_category) REFERENCES categories(category_id) ON DELETE CASCADE
);

INSERT INTO categories (category_name, category_description) VALUES
('Personligt', 'Anteckningar för privata tankar, mål och reflektioner.'),
('Arbete', 'Arbetsrelaterade anteckningar som mötesanteckningar, uppgifter eller deadlines.'),
('Shopping', 'Inköpslistor för mat, kläder eller andra saker att köpa.'),
('Ideér', 'Utkast eller tankar för projekt, uppfinningar eller kreativa projekt.'),
('Resor', 'Planering och packlistor för resor, eller anteckningar från dina äventyr.'),
('Hälsa och träning', 'Träningsscheman, kostplaner och hälsomål.'),
('Att göra', 'En allmän kategori för alla typer av att-göra-listor och uppgifter.'),
('Evenemang', 'Planering och idéer för kommande födelsedagar, fester eller andra evenemang.');

INSERT INTO notes (note_title, note_content, note_category)
VALUES
('Mål för 2024',
 'Börja träna tre gånger i veckan.',
 1);
