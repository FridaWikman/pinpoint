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
('Personligt', 'Anteckningar för privata tankar, mål och reflektioner.'), --1
('Arbete', 'Arbetsrelaterade anteckningar som mötesanteckningar, uppgifter eller deadlines.'), --2
('Shopping', 'Inköpslistor för mat, kläder eller andra saker att köpa.'), -- 3
('Ideér', 'Utkast eller tankar för projekt, uppfinningar eller kreativa projekt.'), --4
('Resor', 'Planering och packlistor för resor, eller anteckningar från dina äventyr.'), --5
('Hälsa och träning', 'Träningsscheman, kostplaner och hälsomål.'), --6
('Att göra', 'En allmän kategori för alla typer av att-göra-listor och uppgifter.'), --7
('Evenemang', 'Planering och idéer för kommande födelsedagar, fester eller andra evenemang.'); --8

INSERT INTO notes (note_title, note_content, note_category)
VALUES
('Mål för 2024',
 'Börja träna tre gånger i veckan.',
 1);

INSERT INTO notes (note_author,note_title, note_content, note_category)
VALUES
('Frida', 'Kom ihåg',
 'Ring doktorn och köp tandkräm',
 7);
