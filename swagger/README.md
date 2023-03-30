# Api
Open [api-doc](http://localhost:3000/api-doc/) and see swagger.

![image](https://user-images.githubusercontent.com/73068449/228819033-5c427a3f-9109-4e4c-9b74-1c07e7f1968f.png)

# doc

|    Path            |     Method     |      Params           |       Type            |         Required    | 
|    :---:           |     :---:      |      :---:            |     :---:             |         :---:       |
| api/meet-up        | POST /         |      body             |    object             |          ✅         |
| api/meet-up        | GET /          |      query            |    string, integer    |          ❌         |
| api/meet-up        | GET /:id       |      path             |    integer            |          ✅         |
| api/meet-up        | PUT /:id       |      body, path       |    object, integer    |          ✅         |
| api/meet-up        | DELETE /:id    |      path             |    integer            |          ✅         |
