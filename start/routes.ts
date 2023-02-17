/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})



Route.group(() => {
Route.post('/login','UsersController.login')
Route.get('/display','UsersController.getData')
Route.get('/find:id','UsersController.find')

Route.delete('/delete/:id','UsersController.delete')
Route.post('/store','UsersController.store')

Route.put('/UpdateId/:id','UsersController.update')

})
.where('id', 
    Route.matchers.number()
    )
.prefix('/Users')
Route.group(() => {
  Route.post('/login','PaymentsController.login')
  Route.get('/display','PaymentsController.getData')
  Route.get('/find:id','PaymentsController.find')
  
  Route.delete('/delete/:id','PaymentsController.delete')
  Route.post('/store','PaymentsController.store')
  
  Route.put('/UpdateId/:id','PaymentsController.update')
  
  })
  .where('id', 
      Route.matchers.number()
      )
  .prefix('/Payments')