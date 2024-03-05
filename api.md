# API

## Authentification

```ts
const response = await fetch("localhost:3630/authenticate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "main@example.xyz",
    password: "super_secret",
  })
});

if (response.ok) {
  const { token } = await reponse.json();
  localStorage.setItem("token", token);
} else if (response.status == 401) {
  // Email ou mot de passe invalide
} else {
  // Gestion d'erreur
}
```

## Users

### List users `GET /users`

```ts
const response = await fetch("localhost:3630/users", {
  method: "GET",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

if (response.ok) {
  await response.json();
  // ["mail@example.xyz"]
} else {
  // Gestion d'erreur
}
```

### Create user `POST /user`

```ts
const response = await fetch("localhost:3630/user", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    first_name: "Louis",
    last_name: "Le Cam",
    email: "mail@exampler.xyz",
    password: "super_secret",
    phone_number: "0000000000",
    admin: true,
  }),
});

if (!response.ok) {
  // Gestion d'erreur  
}
```

### Get user `GET /user`

```ts
const response = await fetch("localhost:3630/user", {
  method: "GET",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "mail@exampler.xyz",
  }),
});

if (response.ok) {
  await response.json();
  // {
  //   first_name: "Louis",
  //   last_name: "Le Cam",
  //   phone_number: "0000000000",
  //   admin: true,
  // }
} else {
  // Gestion d'erreur
}
```

### Modify user `PUT /user`

```ts
const response = await fetch("localhost:3630/user", {
  method: "PUT",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "mail@example.xyz",
    first_name: "Louis",
    last_name: "Le Cam",
    new_email: "othermail@example.com",
    password: "super_secret",
    phone_number: "000000000",
    admin: false,
  }),
});

if (!response.ok) {
  // Gestion d'erreur
}
```

### Remove user `DELETE /user`

```ts
const response = await fetch("localhost:3630/user", {
  method: "DELETE",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "mail@example.xyz",
  }),
});

if (!response.ok) {
  // Gestion d'erreur
}
```

## Equipments

### List equipments `GET /equipments`

```ts
const response = await fetch("localhost:3630/equipments", {
  method: "GET",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

if (response.ok) {
  await response.json();
  // ["spa", "toboggan"]
} else {
  // Gestion d'erreur
}
```

### Create equipment `POST /equipment`

```ts
const response = await fetch("localhost:3630/equipment", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "toboggan",
  }),
});

if (!response.ok) {
  // Gestion d'erreur  
}
```

### Modify equipment `PUT /equipment`

```ts
const response = await fetch("localhost:3630/equipment", {
  method: "PUT",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "toboggan",
    new_name: "spa",
  }),
});

if (!response.ok) {
  // Gestion d'erreur
}
```

### Remove equipment `DELETE /equipment`

```ts
const response = await fetch("localhost:3630/equipment", {
  method: "DELETE",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "spa",
  }),
});

if (!response.ok) {
  // Gestion d'erreur
}
```
