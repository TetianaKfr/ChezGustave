# API

## Authentication

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
  const { token } = await response.json();
  localStorage.setItem("token", token);
} else if (response.status == 401) {
  // Email ou mot de passe invalide
} else {
  // Gestion d'erreur
}
```

## Users (utilisateurs)

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

### Create user `POST /users`

```ts
const response = await fetch("localhost:3630/users", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    first_name: "Louis",
    last_name: "Le Cam",
    email: "mail@example.xyz",
    password: "super_secret",
    phone_number: "0000000000",
    admin: true,
  }),
});

if (!response.ok) {
  // Gestion d'erreur  
}
```

### Get user `POST /user`

```ts
const response = await fetch("localhost:3630/user", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "mail@example.xyz",
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

### Create equipment `POST /equipments`

```ts
const response = await fetch("localhost:3630/equipments", {
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

## Housings (logements)

### List housings `GET /housings`

```ts
const response = await fetch("localhost:3630/housings", {
  method: "GET",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

if (response.ok) {
  await response.json();
  // ["Maison des Rives"]
} else {
  // Gestion d'erreur
}
```

### Create housing `POST /housings`

```ts
let formData = new FormData();
formData.append("name", "Maison des Rives");
formData.append("area", "Sarlat");
formData.append("description", "Au coeur du périguord...");
formData.append("category", "Campagne");
formData.append("type", "Maison");
formData.append("images_urls", "[]");
formData.append("image_1", /* image file blob */);
formData.append("image_2", /* image file blob */);
formData.append("low_price", "2000");
formData.append("medium_price", "4000");
formData.append("high_price", "5000");
formData.append("surface", "540");
formData.append("bathroom_count", "3");

const response = await fetch("localhost:3630/housings", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: formData,
});

if (!response.ok) {
  // Gestion d'erreur  
}
```

### Get housing `POST /housing`

```ts
const response = await fetch("localhost:3630/housings", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Maison des Rives",
  }),
});

if (response.ok) {
  await response.json();
  // {
  //   images_urls: ["localhost:3630/uploads/1414ab8595035F42492.png"],
  //   area: "Sarlat",
  //   description: "Au coeur du périguord...",
  //   category: "Campagne",
  //   type: "Maison",
  //   low_price: 2000,
  //   medium_price: 4000,
  //   high_price: 5000,
  //   surface: 540,
  //   bathroom_count: 3,
  // }
} else {
  // Gestion d'erreur
}
```

### Modify housing `PUT /housing`

```ts
let formData = new FormData();
formData.append("name", "Maison des Rives");
formData.append("new_name", "Caillou nuageux");
formData.append("area", "Sarlat");
formData.append("description", "Au coeur du périguord...");
formData.append("category", "Campagne");
formData.append("type", "Maison");
formData.append("images_urls", "[]");
formData.append("image_1", /* image file blob */);
formData.append("image_2", /* image file blob */);
formData.append("low_price", "2000");
formData.append("medium_price", "4000");
formData.append("high_price", "5000");
formData.append("surface", "540");
formData.append("bathroom_count", "3");

const response = await fetch("localhost:3630/housing", {
  method: "PUT",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: formData,
});

if (!response.ok) {
  // Gestion d'erreur
}
```

### Remove housing `DELETE /housing`

```ts
const response = await fetch("localhost:3630/housing", {
  method: "DELETE",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Maison des Rives",
  }),
});

if (!response.ok) {
  // Gestion d'erreur
}
```

## Bookings (Réservations)


### List bookings `GET /bookings`

```ts
const response = await fetch("localhost:3630/bookings", {
  method: "GET",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

if (response.ok) {
  await response.json();
  // [12, 15]
} else {
  // Gestion d'erreur
}
```

### Create booking `POST /bookings`

```ts
const response = await fetch("localhost:3630/bookings", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    housing_name: "Maison des Rives",
    chef_available: true,
    start: new Date(14, 4, 2024).toDateString(),
    end: new Date(24, 4, 2024).toDateString(),
    visit_date: new Date(4, 4, 2024).toDateString(),
  }),
});

if (!response.ok) {
  // Gestion d'erreur  
}
```

### Get booking `POST /booking`

```ts
const response = await fetch("localhost:3630/booking", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: 13,
  }),
});

if (response.ok) {
  await response.json();
  // {
  //   start: "Sun May 14 2024",
  //   last_name: "Wed May 24 2024",
  //   phone_number: "Tue May 4 2024",
  //   chef_available: true,
  //   housing_name: "Maison des Rives",
  //   user_email: "mail@example.xyz"
  // }
} else {
  // Gestion d'erreur
}
```

### Modify booking `PUT /booking`

```ts
const response = await fetch("localhost:3630/booking", {
  method: "PUT",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: 13,
    housing_name: "Manoir de la montagne",
    chef_available: false,
    start: new Date(13, 4, 2024).toDateString(),
    end: new Date(23, 4, 2024).toDateString(),
    visit_date: new Date(3, 4, 2024).toDateString(),
  }),
});

if (!response.ok) {
  // Gestion d'erreur
}
```

### Remove booking `DELETE /booking`

```ts
const response = await fetch("localhost:3630/booking", {
  method: "DELETE",
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: 13,
  }),
});

if (!response.ok) {
  // Gestion d'erreur
}
```

