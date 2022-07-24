import React from 'react'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { render } from 'react-dom'
import rootReducer from './redux/reducers'
import { sagaWatcher } from './redux/sagas'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

const saga = createSagaMiddleware()

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk, saga),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
	)
)

saga.run(sagaWatcher)

const app = (
	<Provider store={store}>
		<App />
	</Provider>
)

render(app, document.body.appendChild(document.createElement('div')))
