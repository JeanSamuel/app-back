## Database Migration 
#### Installation
Install Sequelize CLI for db migration
```
npm install --save sequelize-cli
```
#### Init sequelize cli folders
Create migration folders bootstrapping
```
npx sequelize-cli init
```

#### Usage

<pre>
Sequelize CLI [Node: 10.21.0, CLI: 6.0.0, ORM: 6.1.0]

sequelize <command>

Commands:
  sequelize db:migrate                        Run pending migrations
  sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
  sequelize db:migrate:status                 List the status of all migrations
  sequelize db:migrate:undo                   Reverts a migration
  sequelize db:migrate:undo:all               Revert all migrations ran
  sequelize db:seed                           Run specified seeder
  sequelize db:seed:undo                      Deletes data from the database
  sequelize db:seed:all                       Run every seeder
  sequelize db:seed:undo:all                  Deletes data from the database
  sequelize db:create                         Create database specified by configuration
  sequelize db:drop                           Drop database specified by configuration
  sequelize init                              Initializes project
  sequelize init:config                       Initializes configuration
  sequelize init:migrations                   Initializes migrations
  sequelize init:models                       Initializes models
  sequelize init:seeders                      Initializes seeders
  sequelize migration:generate                Generates a new migration file      [aliases: migration:create]
  sequelize model:generate                    Generates a model and its migration [aliases: model:create]
  sequelize seed:generate                     Generates a new seed file           [aliases: seed:create]
</pre>

This will create following folders
1. config, contains config file, which tells CLI how to connect with database
2. models, contains all models for your project
3. migrations, contains all migration files
4. seeders, contains all seed files

#### Database Configuration
config/config.js
<pre>{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}</pre>

##### Generate Model
```
npx sequelize-cli model:generate --name <model_of_name> --attributes <list_of_model_field>
```
##### Add fields to an existing sequelize Migration
```
npx sequelize-cli migration:create --name <file-name>
```

##### Create new seeder file
```
npx sequelize-cli seed:generate --name <seeder-file-name>
```
##### Run model migration 
```
npx sequelize-cli db:migrate
```

##### Run seeders 
```
npx sequelize-cli db:seed:all
```
### Associations
Sequelize supports the standard associations: One-To-One, One-To-Many and Many-To-Many.

To do this, Sequelize provides four types of associations that should be combined to create them:

1. The HasOne association
2. The BelongsTo association
3. The HasMany association
4. The BelongsToMany association
The guide will start explaining how to define these four types of associations, and then will follow up to explain how to combine those to define the three standard association types (One-To-One, One-To-Many and Many-To-Many).

##### Defining the Sequelize associations
The four association types are defined in a very similar way. Let's say we have two models, A and B. Telling Sequelize that you want an association between the two needs just a function call:

<pre>const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);

A.hasOne(B); // A HasOne B
A.belongsTo(B); // A BelongsTo B
A.hasMany(B); // A HasMany B
A.belongsToMany(B, { through: 'C' }); // A BelongsToMany B through the junction table C
</pre>
They all accept an options object as a second parameter (optional for the first three, mandatory for belongsToMany containing at least the through property):
<pre>
A.hasOne(B, { /* options */ });
A.belongsTo(B, { /* options */ });
A.hasMany(B, { /* options */ });
A.belongsToMany(B, { through: 'C', /* options */ });
</pre>

1. The A.hasOne(B) foreign key define in the source model (B).

2. The A.belongsTo(B) the foreign key being defined in the source model (A).

3. The A.hasMany(B) the foreign key being defined in the target model (B).

4. The A.belongsToMany(B, { through: 'C' })  using table C as junction table, which will have the foreign keys (aId and bId, for example).