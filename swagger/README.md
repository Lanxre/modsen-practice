# Api
Open [api-doc](http://localhost:3000/api-doc/) and see swagger.

![image](https://user-images.githubusercontent.com/73068449/227377095-7efdd081-ba6e-4e0c-bb2b-aa41cc22e43e.png)

# doc

|    Path            |     Method     |      Params           |       Type            |         Required    | 
|    :---:           |     :---:      |      :---:            |     :---:             |         :---:       |
| api/meet-up        | POST /         |      body             |    object             |          ✅         |
| api/meet-up        | GET /          |      query            |    string, integer    |          ❌         |
| api/meet-up        | GET /:id       |      path             |    integer            |          ✅         |
| api/meet-up        | PUT /:id       |      body, path       |    object, integer    |          ✅         |
| api/meet-up        | DELETE /:id    |      path             |    integer            |          ✅         |
