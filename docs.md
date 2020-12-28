
## API documentation

The documents the APIs that exist in the server.

Calls are made to the default route, `/`.

Right now, all of the pages are temporary and are used only to demonstrate usage of the APIs. The example client code is in `client/js`.



### Authentication stuff

**POST `/login`**

Logs the client in. Data should be a JSON object with a singular key `idToken` and its value should be a [Google sign-in ID token.](https://developers.google.com/identity/sign-in/web/backend-auth)

Example data:

```json
{
    idToken: "eyJ...Vxw"
}
```

**POST `/logout`**

Logs the client out. No data to be sent, just removes authorization from the Google sign in thing and tells the server to delete the user's session.



### Information stuff

**GET `/my-info`**

Returns a JSON object with information about the user themselves! Has `email`, `name`, and `picture` keys. This should probably be used in the dashboard.

`email` and `name` are pretty self-explanatory, and `picture` is a link to the user's Google profile picture.

Example response data:

```json
{
    email: "williamf24@lakesideschool.org",
    name: "William Feng",
    picture: "https://lh3.googleusercontent.com/a-/AOh1..."
}
```

**GET `/all-users`**

Returns an array containing information about all users. This should probably be used in the directory page.

Each element in the array looks like this:

```json
{
    userID: "williamfeng1729@gmail.com",
    name: "William Y. Feng",
    picture: "https://lh3.googleusercontent.com/a-/AOh1...",
    tags: []
}
```

`name` and `picture` are as they were in the dashboard.

`tags` is an array of strings (but I haven't implemented this yet!)

`userID` is the person's user ID, which for now is just their email but that might change.

**GET `/user-info/<userID>`**

Gets the information of user with the given `userID`. No data to send in the request, it's all in the URL. This might be used in a page like `/user/williamf24@lakesideschool.org`.

Returns something like this:

```json
{
    userID: "williamf24@lakesideschool.org"
    name: "William Feng",
    email: "williamf24@lakesideschool.org",
    picture: "https://lh3.googleusercontent.com/a-/AOh1...",
    tags: [],
	badges: []
}
```

### Conclusion

And that's pretty much it! More stuff will get added here as more stuff is implemented.