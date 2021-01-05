
# API documentation

The documents the APIs that exist in the server.

Calls are made to the default route, `/`. Payloads are made with `Content-Type` `application/json` unless otherwise specified.

Right now, all of the pages are temporary and are used only to demonstrate usage of the APIs. The example client code is in `client/js`.



## Miscellaneous

* These endpoints return a 401 code if the user is not logged in.
* The user *should* be redirected to the login page if they are not logged in.



## User input

These are usually meant to be POST requests.

### Authentication stuff

**POST `/login`**

Logs the client in. Data should be a JSON object with a singular key `idToken` and its value should be a [Google sign-in ID token.](https://developers.google.com/identity/sign-in/web/backend-auth)

Example data:

```json
{
    "idToken": "eyJ...Vxw"
}
```



**POST `/logout`**

Logs the client out. No data to be sent, just removes authorization from the Google sign in thing and tells the server to delete the user's session.

### Tags

**POST `/add-tags`**

Adds the given tags to the user's list. Payload should be an array of tags.

Example input:

```json
[
    {
        "name": "freshman",
        "category": "grade"
    },
    {
        "name": "viola",
		"category": "instrument"
    }
]
```

Incorrectly formatted tags are ignored.



**POST `/remove-tags`**

Removes the given tags from the user's list. Input format is the same as `/add-tags`--a list of tags, each tag being an object with a `name` and a `category` key.

### Other

**POST `/edit-bio`**

Changes the user's pending bio. This will only change publicly displayed bio once approved. Payload looks like this:

```json
{
    "newBio": "Hello this is my awesome bio"
}
```



**POST `/talked-to?userID=<userID`**>

Tells the server that user claims they have talked to the user with the given id. Nothing to be sent with the request.

(Responds with 400 error if the other user is not found, 204 otherwise)

## Information stuff

### User information

This includes information about the user themselves.



**GET `/my-info`**

Returns a JSON object with information about the user themselves! Has `email`, `name`, and `picture` keys. This should probably be used in the dashboard.

`email` and `name` are pretty self-explanatory, and `picture` is a link to the user's Google profile picture.

Example response data:

```json
{
    "email": "williamf24@lakesideschool.org",
    "name": "William Feng",
    "picture": "https://lh3.googleusercontent.com/a-/AOh1..."
}
```



**GET `/my-bio`**

Returns the user's bio in the following format:

```json
{
    "bio": "Hello I like dogs"
}
```



**GET `/my-tags`**

Returns the user's tags as an array. Example:

```json
[
    {
        "name": "freshman",
        "category": "grade"
    },
    {
        "name": "viola",
		"category": "instrument"
    }
]
```

### Other user information

This includes information about other people.



**GET `/user-info?userID=<userID>`**

Gets the information of user with id `<userID>`. Data to send:

This might be used in a page like `/user/williamf24@lakesideschool.org`.

Users **cannot** request their own information with this endpoint. It will return a 400 code if a user tries to do so.

Returns something like this:

```json
{
    "userID": "williamf24@lakesideschool.org",
    "name": "William Feng",
    "email": "williamf24@lakesideschool.org",
    "picture": "https://lh3.googleusercontent.com/a-/AOh1...",
    "tags": [],
}
```



**GET `/user-bio?userID=<userID>`**

Gets the given user's bio.

Again, this **cannot** be used on the user themselves and will return a 400 code if the user tries to do that.

The reply is pretty simple:

```json
{
    "userID": "williamf24@lakesideschool.org",
    "bio": "My fantastic bio"
}
```



**GET `/did-talk-to?userID=<userID`**

Returns a **status** of the user's interaction status with the given other user. The response is one of these three options:

```json
{ "status": "yes" }
```
```json
{ "status": "pending" }
```
```json
{ "status": "no" }
```

1. `"yes"` means the the user and the other user have talked.
2. `"pending"` means the user has claimed that they talked to the other user.
3. `"no"` means the two users have not talked. (The other user can still have claimed to talked to this one, but this user won't know.)



**GET `/all-users`**

Returns an array containing information about all users. This should probably be used in the directory page.

Each element in the array looks like this:

```json
{
    "userID": "williamfeng1729@gmail.com",
    "name": "William Y. Feng",
    "picture": "https://lh3.googleusercontent.com/a-/AOh1...",
    "tags": []
}
```

`name` and `picture` are as they were in the dashboard.

`tags` is an array of strings (but I haven't implemented this yet!)

`userID` is the person's user ID, which for now is just their email but that might change.



## Admin

There are actions that only an admin can do. If a non-admin tries to access one of these endpoints, a 403 error is sent.

**POST `/approve-bio?userID=<userID>`** (syntax will change soon)

If the given user's pending bio exists, approves it. If the user doesn't have a pending bio, returns something like this:

```json
{
    "message": "Approved user does not have a pending bio."
}
```

along with a 400 error.



**GET `/pending-bios`**

Returns an array with all pending bios. Example:

```json
[
    {
        "userID": "williamf24@lakesideschool.org",
        "bio": "Hello my name is william"
    },
    {
        "userID": "williamfeng1729@gmail.com",
        "bio": "Hello my name is also william"
    }
]
```

