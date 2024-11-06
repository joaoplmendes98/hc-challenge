## Project Setup

```sh
npm install
```

### To run the project

```sh
npm run dev
```

### Flow
The main page is the users page, all the actions (create, edit, delete) are available from the table.  

Once the user name, or the order icon, in a specific row is clicked, it takes you to the user orders page where the specific table and actions are available.  

### Features
An api helper was made in order to keep the code clean.  

A date converter helper was also made.  

Sorts, filters, and queries are implemented in the table content via code since the APIs don't have these features implemented.

Alerts for each action were also implemented.  

The table and modals were made dynamically so that everything can be controlled from the index page.

The table is responsive in a way that it calculates how many columns it can present from every width and shows the number of columns accordingly.

### Considerations
A function was made to convert all snake_case keys to camelCase since there was an inconsistency there.

Some paths and request bodies were not exactly as described on the exercise but were checked on the backend code and implemented accordingly so that everything is working.