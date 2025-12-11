## Server state:

Home page:
1. Products (data) -> The fetched product list, this is server state, comes from the api.
2. isLoading -> The product list currently loading.
3. isError -> The error if something wrong with the query.
4. error -> The error object for the query, if an error was thrown.
5. refetch -> A function to manually refetch the query.
6. isFetched -> Will be true if the query has been fetched.

ProductData page:
1. ProductDetails (data) -> The fetched product, this is server state, comes from the api.
2. isLoading -> The product that currently loading.
3. isError -> The error if something wrong with the query.
4. error -> The error object for the query, if an error was thrown.


## Client/UI state:

Home page:
1. showList -> show the list of products when the user clicked.
2. showSpinner -> show the spinner when the data is fetching.


## --------------------------------------------------------------------------------------------------
All the API-related data (products, isLoading, is error, error, refetch, isFetched etc') are server state, they need to be managed by the TanStack Query only.
Other states like showList, showSpinner etc' are local UI state inside the component itself, and managed by the useState.











step 2:


I created a global **Filter Sidebar** that is opened using a button in the header.  
The sidebar appears on the **left side** as an overlay panel.

### Context State and Actions:
- `isOpen` (boolean): tracks if the sidebar is open.
- `open()`: opens the sidebar.
- `close()`: closes the sidebar.
- `toggle()`: toggles sidebar open/closed.

### Context Usage:
- The **Context Provider** wraps the entire `<App />`.
- The **Sidebar** reads `isOpen` to decide if it should be shown.
- The **Header Filter Button** uses `toggle()` to open/close the sidebar.

