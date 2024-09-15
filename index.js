const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let message = "Welcome to the Bookshelf Program 🖐️";

let books

const loadBooks = async () => {
  try {
    const data = await fs.readFile("books.json", "utf-8")
    books = JSON.parse(data)
  } catch (error) {
    books = []
  }
}

const saveBooks = async () => {
  await fs.writeFile("books.json", JSON.stringify(books, null, 2))
}

const addBook = async () => {

  const title = await input({ message: "Enter the book title:" });
  if (title.length == 0) {
    message = 'The title cannot be empty. 🫤';
    return;
  }


  const author = await input({ message: "Enter the author of the book:" });
  if (author.length == 0) {
    message = 'The author cannot be empty. 🫤';
    return;
  }


  const releaseDate = await input({ message: "Enter the release date of the book (e.g., YYYY-MM-DD):" });
  if (releaseDate.length == 0) {
    message = 'The release date cannot be empty. 🫤';
    return;
  }


  books.push({
    title: title,
    author: author,
    releaseDate: releaseDate,
    checkbox: false
  });

  message = "Book added successfully! 🤩";
}

const listBookshelf = async () => {
  if (books.length === 0) {
    message = "There are no books on the shelf! 🫤";
    return;
  }


  const responses = await checkbox({
    message: "⚠️ Use the arrows to navigate, space to mark/unmark as read, and Enter to finish.",
    choices: books.map((book) => ({
      name: `${book.title} by ${book.author}, Released on: ${book.releaseDate}`,
      value: book.title, // Usando o título como valor para identificar o livro
      checked: book.read, // Marcar checkbox se o livro estiver lido
    })),
    instructions: false,
  });


  books.forEach((book) => {
    book.read = false;
  });


  if (responses.length === 0) {
    message = "No books selected! 📕";
    return;
  }


  responses.forEach((response) => {
    const book = books.find((b) => b.title === response);
    if (book) {
      book.read = true;
    }
  });

  message = 'Book(s) marked as read successfully! 🤩';
}

const readList = async () => {
  if (books.length === 0) {
    message = "There are no books on the shelf!";
    return;
  }

  const readBooks = books.filter((book) => book.read);

  if (readBooks.length === 0) {
    message = 'No books have been read yet!';
    return;
  }

  await select({
    message: `Read Books: ${readBooks.length}`,
    choices: readBooks.map((book) => ({
      name: `${book.title} by ${book.author}, Released on: ${book.releaseDate}`,
      value: book.title
    }))
  });
}

const unreadList = async () => {
  if (books.length === 0) {
    message = "There are no books on the shelf!";
    return;
  }

  const unreadBooks = books.filter((book) => !book.read);

  if (unreadBooks.length === 0) {
    message = 'All books have been read!';
    return;
  }

  await select({
    message: `Unread Books: ${unreadBooks.length}`,
    choices: unreadBooks.map((book) => ({
      name: `${book.title} by ${book.author}, Released on: ${book.releaseDate}`,
      value: book.title
    }))
  });
}

const sortBookshelf = async () => {
  if (books.length === 0) {
    message = "There are no books on the shelf!";
    return;
  }
  for (let i = 0; i < books.length - 1; i++) {
    for (let j = 0; j < books.length - 1 - i; j++) {
      if (books[j].title.localeCompare(books[j + 1].title, undefined, { sensitivity: 'base' }) > 0) {
        let temp = books[j];
        books[j] = books[j + 1];
        books[j + 1] = temp;
      }
    }
  }
  await select({
    message: "📚 Books in alphabetical order:",
    choices: books.map((book) => ({
      name: `${book.title} by ${book.author}, Released on: ${book.releaseDate}`,
      value: book.title
    }))
  });
}

const deleteBook = async () => {
  if (books.length === 0) {
    message = "There are no books on the shelf!";
    return;
  }

  const booksToDelete = await checkbox({
    message: "🔥Select books to throw into the fire:",
    choices: books.map((book) => ({
      name: `${book.title} by ${book.author}, Released on: ${book.releaseDate}`,
      value: book.title
    })),
    instructions: false,
  });

  if (booksToDelete.length === 0) {
    message = "No books selected for deletion!";
    return;
  }

  // Filtrar os livros que não foram selecionados para remoção
  books = books.filter((book) => !booksToDelete.includes(book.title));

  message = "Book(s) deleted successfully!";
}

const showMensage = () => {
  console.clear();

  if (message != "") {
    console.log(message)
    console.log("")
    message = ""
  }

}

const start = async () => {
  await loadBooks()

  while (true) {
    showMensage()
    await saveBooks()

    const option = await select({
      message: "  - - - - Menu - - - -  ",
      choices: [
        {
          name: "⨀ Add book in the shelf",
          value: "add"
        },
        {
          name: "⨀ List books",
          value: "list"
        },
        {
          name: "⨀ List read books",
          value: "readList"
        },
        {
          name: "⨀ List unread books",
          value: "unreadList"
        },
        {
          name: "⨀ List books in alphabetical order",
          value: "sort"
        },
        {
          name: "⨀ Delete the book off the shelf",
          value: "delete"
        },
        {
          name: "⨀ Exit Program",
          value: "exit"
        },
      ]
    })
    switch (option) {
      case "add":
        await addBook()
        break
      case "list":
        await listBookshelf()
        break
      case "readList":
        await readList()
        break
      case "unreadList":
        await unreadList()
        break
      case "sort":
        await sortBookshelf()
        break
      case "delete":
        await deleteBook()
        break
      case "exit":
        console.clear()
        console.log('Goodbye, I hope see u soon !! 😉')
        return
    }
  }

}

start();