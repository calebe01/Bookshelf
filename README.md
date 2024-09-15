# Bookshelf Program 📚

**Bookshelf Program** is an interactive command-line application that allows you to manage a bookshelf by adding, listing, marking as read, viewing by read status, sorting alphabetically, and deleting books.

## Features

- **Add Books:** Allows you to add new books to the shelf by specifying the title, author, and release date.
- **List Books:** Displays all books on the shelf.
- **Mark Books as Read:** Mark or unmark books as read.
- **List Read Books:** Displays a list of books that have been marked as read.
- **List Unread Books:** Displays a list of books that have not been read yet.
- **Sort Books:** Sorts books in alphabetical order by title, ignoring case.
- **Delete Books:** Allows you to select and delete books from the shelf.
- **Exit Program:** Safely exits the program.

## Code Structure

- index.js: Contains the main logic of the program, including all the listed functionalities.
- books.json: Stores book data persistently, allowing the program to maintain the list of books between sessions.
- node_modules/: Directory containing all the project dependencies managed by npm.
- .gitignore: Configured to ignore unnecessary files and folders in version control, including node_modules/ and specific files like biome.json.

## Requirements

Node.js: Ensure you have Node.js installed on your machine.
@inquirer/prompts: This package is used to create interactive prompts in the terminal. It should be installed as part of the dependencies.
