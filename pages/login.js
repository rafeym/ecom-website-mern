import React from 'react'
import catchErrors from '../utils/catchErrors'

import {Button, Form, Icon, Message, Segment} from 'semantic-ui-react'
import Link from 'next/link'

const INITIAL_USER = {
  email: '',
  password: ''
}

function Signup() {
  const [user, setUser] = React.useState(INITIAL_USER)
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  const handleChange = (event) => {
    const {name, value} = event.target
    setUser(prevState => ({...prevState, [name]: value}))
  }

  const handleSubmit = async () => {
    event.preventDefault()
    try{
      setLoading(true)
      setError('')
      console.log(user)
      // Make req to signup user
    } catch(error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }
  }

  return <>
    <Message
    attached
    icon="privacy"
    header="Welcome Back!"
    content="Log in with email and password"
    color="black"/>
    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
    <Message
      error
      header="Oops!"
      content={error}
    />
      <Segment>
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button 
          icon="sign in"
          type="submit"
          color="black"
          content="Login"
          disabled={disabled || loading}
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      New user?{" "}
      <Link href="/signup">
        <a>Sign up here</a>
      </Link>{" "}
    </Message>
  </>
}

export default Signup;
