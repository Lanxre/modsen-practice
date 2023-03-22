# modsen-practice
 Practice start 23.03.2023
 
## Requirements

* Node 16+
* Express
* PostgreSQL 14

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/Vittalius/modsen-practice.git
cd modsen-practice
```

```bash
npm install or npm i
```

## Steps for read-only access

To start the express server, run the following

```bash
npm run start:dev
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.

# database
Postgresql is used as a database with the following fields
|    Column            |     TYPE                   | 
|    :---:             |     :---:                  |
| id                   | integer                    |
| theme_meet           | character varying(50)      |
| description_meet     | character varying(50)      |
| tags                 | character varying(150)     |
| locate_meet          | character varying(50)      |

