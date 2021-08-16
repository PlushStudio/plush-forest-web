import React from 'react'
import '@/index.scss'
import '@/index.css'
import Index from '@/pages/Index/Index'

import { Route, Switch } from '@/components/common/Router'

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Index} />
    </Switch>
  )
}

export default App
