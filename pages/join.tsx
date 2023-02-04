import { NextPage } from "next";
import { useMutation, gql } from "@apollo/client";
import { FormEvent, useEffect, useRef } from "react";

const SIGNUP = gql`
    mutation SignUp(
        $slug: String!,
        $password: String!,
    ) {
        signUp(slug: $slug, password: $password) {
            userErrors {
                message
            }
            token
        }
    }
`

const JoinPage: NextPage = () => {
  const [signUp, { data, loading }] = useMutation(SIGNUP)
  const slugRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const slug = slugRef.current?.value
    const password = passwordRef.current?.value

    if (slug && password) {
      signUp({
        variables: { slug, password }
      })
    }
  }

  useEffect(() => {
    if (data) {
      if (data.signUp.userErrors.length) {
        console.log(data.signUp.userErrors);
      }
      if (data.signUp.token) {
        localStorage.setItem("token", data.signUp.token);
      }
    }
  }, [data])

  return (
    <>
      <h1>Join</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Credentials</legend>

          <label>
            <input name="slug" required={true} ref={slugRef}/>
            <span>Login</span>
          </label>

          <label>
            <input type="password" name="password" required={true} ref={passwordRef}/>
            <span>Password</span>
          </label>

          <div>
            <button>Join</button>
          </div>
        </fieldset>
      </form>

      {loading && <p>Loading...</p>}
    </>
  )
}

export default JoinPage
